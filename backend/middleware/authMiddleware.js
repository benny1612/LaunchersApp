import { verifyToken } from "../utils/jwtUtils.js";

export const protect = (req, res, next) => {
  const token = req.headers.authorization;
  if (!token) {
    return res.status(401).json({ success: false, msg: "missing token " });
  }
  try {
    const decoded = verifyToken(token);
    req.user = decoded;
    next();
  } catch (error) {
    res.status(401).json({ success: false, msg: "Invalid token" });
  }
};

export const isAdmin = (req, res, next) => {
  if (req.user.user_type === "admin") {
    next();
  } else {
    res.status(403).json({ success: false, msg: "your not admin " });
  }
};

export const isIntelligence = (req, res, next) => {
  if (req.user.user_type === "Intelligence soldier" || req.user.user_type === "admin") {
    next();
  } else {
    res.status(403).json({ success: false, msg: "your not admin or Intelligence" });
  }
};

export const isAirForce = (req, res, next) => {
  if (req.user.user_type === "air force soldier" || req.user.user_type === "admin") {
    next();
  } else {
    res.status(403).json({ success: false, msg: "your not admin or air force or " });
  }
};
