import jwt from "jsonwebtoken";
import Admin from "../models/Admin.js";

export const protectAdmin = async (req, res, next) => {
  try {
    let token;

    // 1️⃣ Token kaha se aata hai?
    // Header: Authorization: Bearer <token>
    if (
      req.headers.authorization &&
      req.headers.authorization.startsWith("Bearer")
    ) {
      token = req.headers.authorization.split(" ")[1];
    }

    // 2️⃣ Token nahi mila
    if (!token) {
      return res.status(401).json({
        success: false,
        message: "Not authorized, token missing",
      });
    }

    // 3️⃣ Token verify karo
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    // 4️⃣ Admin find karo
    const admin = await Admin.findById(decoded.id).select("-password");

    if (!admin) {
      return res.status(401).json({
        success: false,
        message: "Not authorized, admin not found",
      });
    }

    // 5️⃣ Request me admin attach karo
    req.admin = admin;

    // 6️⃣ Next middleware / controller ko jaane do
    next();
  } catch (error) {
    res.status(401).json({
      success: false,
      message: "Not authorized, invalid token",
    });
  }
};
