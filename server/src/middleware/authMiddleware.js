const jwt = require("jsonwebtoken");
const User = require("../model/userModel");
const { rtnRes, log } = require("../utils/helper");

exports.protect = async (req, res, next) => {
  try {
    // 1) Getting token and check of it's there
    let token;
    if (
      req.headers.authorization &&
      req.headers.authorization.startsWith("Bearer")
    ) {
      token = req.headers.authorization.split(" ")[1];
    }

    if (!token) {
      return rtnRes(res, 401, "You are not logged in! Please log in to get access.");
    }

    // 2) Verification token
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    // 3) Check if user still exists
    const currentUser = await User.findById(decoded.id);
    if (!currentUser) {
      return rtnRes(res, 401, "The user belonging to this token does no longer exist.");
    }

    // 4) Check if user changed password after the token was issued
    // (Optional implementation if schema had passwordChangedAt)

    // GRANT ACCESS TO PROTECTED ROUTE
    req.user = currentUser;
    next();

  } catch (error) {
    log("Auth Middleware Error", "error", error);
    if(error.name === 'JsonWebTokenError') return rtnRes(res, 401, "Invalid token. Please log in again.");
    if(error.name === 'TokenExpiredError') return rtnRes(res, 401, "Your token has expired! Please log in again.");
    rtnRes(res, 500, "Authentication failed.");
  }
};

exports.admin = (req, res, next) => {
  if (req.user && (req.user.role === "admin" || req.user.role === "super_admin")) {
    next();
  } else {
    return rtnRes(res, 403, "Not authorized as an admin.");
  }
};
