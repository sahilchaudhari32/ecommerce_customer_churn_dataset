const jwt = require("jsonwebtoken");
const ApiError = require("../utils/ApiError");
const asyncHandler = require("../utils/asyncHandler");
const User = require("../models/userModel");

const verifyJWT = asyncHandler(async (req, res, next) => {
  try {
    let token = req.headers.authorization || req.headers["x-access-token"] || req.headers["token"] || req.body?.token || req.body?.authorization || req.query?.token || req.query?.authorization;

    if (typeof token === "string") {
      if (token.toLowerCase().startsWith("bearer ")) {
        token = token.slice(7).trim();
      }
    }

    if (!token) {
      console.error("[AUTH] Missing token. Sources:", {
        authorization: req.headers.authorization,
        xAccessToken: req.headers["x-access-token"],
        tokenHeader: req.headers.token,
        bodyToken: req.body?.token,
        bodyAuthorization: req.body?.authorization,
        queryToken: req.query?.token,
        queryAuthorization: req.query?.authorization,
      });
      throw new ApiError(
        401,
        "Unauthorized request. Attach a valid JWT in Authorization: Bearer <token> or x-access-token header."
      );
    }

    if (!process.env.ACCESS_TOKEN_SECRET) {
      console.error("[AUTH] Missing ACCESS_TOKEN_SECRET environment variable.");
      throw new ApiError(500, "Server configuration error: ACCESS_TOKEN_SECRET is not set.");
    }

    const decodedToken = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET);

    const user = await User.findById(decodedToken?._id).select("-password");

    if (!user) {
      throw new ApiError(401, "Invalid Access Token");
    }

    req.user = user;
    next();
  } catch (error) {
    if (error instanceof ApiError) {
      throw error;
    }
    throw new ApiError(401, error?.message || "Invalid access token");
  }
});

const isAdmin = (req, res, next) => {
  if (req.user?.role !== "ADMIN") {
    throw new ApiError(403, "Access denied. Admins only.");
  }
  next();
};

module.exports = {
  verifyJWT,
  isAdmin,
};
