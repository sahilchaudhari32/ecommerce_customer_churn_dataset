const User = require("../models/userModel");
const asyncHandler = require("../utils/asyncHandler");
const ApiError = require("../utils/ApiError");
const ApiResponse = require("../utils/ApiResponse");

const getAllUsers = asyncHandler(async (req, res) => {
  const { search, role, status, page = 1, limit = 10 } = req.query;
  
  const query = {};
  
  if (search) {
    query.$or = [
      { username: { $regex: search, $options: "i" } },
      { email: { $regex: search, $options: "i" } }
    ];
  }
  
  if (role && role !== "All Roles") {
    query.role = role.toUpperCase();
  }
  
  if (status && status !== "All Status") {
    query.isVerified = status === "Active";
  }

  const skip = (parseInt(page) - 1) * parseInt(limit);
  
  const users = await User.find(query)
    .select("-password")
    .skip(skip)
    .limit(parseInt(limit))
    .sort({ createdAt: -1 });

  const total = await User.countDocuments(query);

  // Map to match frontend format
  const formattedUsers = users.map(user => ({
    id: user._id,
    name: user.username,
    email: user.email,
    role: user.role.charAt(0) + user.role.slice(1).toLowerCase(),
    status: user.isVerified ? "Active" : "Inactive",
    createdDate: new Date(user.createdAt).toLocaleDateString("en-US", { 
      month: "short", day: "numeric", year: "numeric" 
    })
  }));

  return res.status(200).json({ 
    success: true,
    users: formattedUsers, 
    total,
    page: parseInt(page),
    totalPages: Math.ceil(total / limit)
  });
});

const createUser = asyncHandler(async (req, res) => {
  const { name, email, password, role } = req.body;
  
  const existedUser = await User.findOne({ email });
  if (existedUser) {
    throw new ApiError(409, "User already exists");
  }

  const user = await User.create({
    username: name,
    email,
    password,
    role: role.toUpperCase() || "USER",
    isVerified: true
  });

  const createdUser = await User.findById(user._id).select("-password");

  return res.status(201).json(new ApiResponse(201, {
    id: createdUser._id,
    name: createdUser.username,
    email: createdUser.email,
    role: createdUser.role.charAt(0) + createdUser.role.slice(1).toLowerCase(),
    status: "Active",
    createdDate: new Date(createdUser.createdAt).toLocaleDateString()
  }, "User created successfully"));
});

const updateUser = asyncHandler(async (req, res) => {
  const { id } = req.params;
  const { name, email, role, status } = req.body;

  const user = await User.findByIdAndUpdate(
    id,
    {
      $set: {
        username: name,
        email,
        role: role.toUpperCase(),
        isVerified: status === "Active"
      }
    },
    { new: true, runValidators: true }
  ).select("-password");

  if (!user) {
    throw new ApiError(404, "User not found");
  }

  return res.status(200).json(new ApiResponse(200, {
    id: user._id,
    name: user.username,
    email: user.email,
    role: user.role.charAt(0) + user.role.slice(1).toLowerCase(),
    status: user.isVerified ? "Active" : "Inactive",
    createdDate: new Date(user.createdAt).toLocaleDateString()
  }, "User updated successfully"));
});

const deleteUser = asyncHandler(async (req, res) => {
  const { id } = req.params;
  const user = await User.findByIdAndDelete(id);
  
  if (!user) {
    throw new ApiError(404, "User not found");
  }

  return res.status(200).json(new ApiResponse(200, id, "User deleted successfully"));
});

module.exports = {
  getAllUsers,
  createUser,
  updateUser,
  deleteUser
};
