const User = require("../models/userModel");
const asyncHandler = require("../utils/asyncHandler");
const ApiError = require("../utils/ApiError");
const ApiResponse = require("../utils/ApiResponse");

const registerUser = asyncHandler(async (req, res) => {
  const { username, email, password, role } = req.body;

  if ([username, email, password].some((field) => field?.trim() === "")) {
    throw new ApiError(400, "All fields are required");
  }

  const existedUser = await User.findOne({
    $or: [{ username }, { email }],
  });

  if (existedUser) {
    throw new ApiError(409, "User with email or username already exists");
  }

  const user = await User.create({
    username,
    email,
    password,
    role: role || "USER",
  });

  const createdUser = await User.findById(user._id).select("-password");

  if (!createdUser) {
    throw new ApiError(500, "Something went wrong while registering the user");
  }

  return res
    .status(201)
    .json(new ApiResponse(201, createdUser, "User registered successfully"));
});

const loginUser = asyncHandler(async (req, res) => {
  const { email, username, password } = req.body;

  if (!username && !email) {
    throw new ApiError(400, "Username or email is required");
  }

  const user = await User.findOne({
    $or: [{ username }, { email }],
  });

  if (!user) {
    throw new ApiError(404, "User does not exist");
  }

  const isPasswordValid = await user.isPasswordCorrect(password);

  if (!isPasswordValid) {
    throw new ApiError(401, "Invalid user credentials");
  }

  const accessToken = user.generateAccessToken();

  const loggedInUser = await User.findById(user._id).select("-password ");

  return res.status(200).json(
    new ApiResponse(
      200,
      {
        user: loggedInUser,
        accessToken,
      },
      "User logged in successfully"
    )
  );
});

const logoutUser = asyncHandler(async (req, res) => {
  // Logic to invalidate token on server-side would go here if using a whitelist
  return res
    .status(200)
    .json(new ApiResponse(200, {}, "User logged out successfully"));
});

const getCurrentUser = asyncHandler(async (req, res) => {
  return res
    .status(200)
    .json(new ApiResponse(200, req.user, "User profile fetched successfully"));
});

const updateProfile = asyncHandler(async (req, res) => {
  const { username, email } = req.body;

  if (!username && !email) {
    throw new ApiError(400, "Nothing to update");
  }

  const user = await User.findByIdAndUpdate(
    req.user?._id,
    {
      $set: {
        username: username || req.user.username,
        email: email || req.user.email,
      },
    },
    { new: true }
  ).select("-password ");

  return res
    .status(200)
    .json(new ApiResponse(200, user, "Profile updated successfully"));
});

module.exports = {
  registerUser,
  loginUser,
  logoutUser,
  getCurrentUser,
  updateProfile,
};
