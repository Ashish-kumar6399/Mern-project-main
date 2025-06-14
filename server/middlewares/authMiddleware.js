import jwt from "jsonwebtoken";
import authModel from "../models/authModel.js";

const checkIsUserAuthenticated = async (req, res, next) => {
  try {
    const { authorization } = req.headers;
    console.log("Authorization Header:", authorization);

    if (!authorization || !authorization.startsWith("Bearer ")) {
      console.error("No token or invalid format");
      return res.status(401).json({ message: "Unauthorized Access (No token provided)" });
    }

    const token = authorization.split(" ")[1];
    console.log("Extracted Token:", token);

    const decoded = jwt.verify(token, "pleaseSubscribe");
    console.log("Decoded Token:", decoded);

    const user = await authModel.findById(decoded.userID).select("-password");
    if (!user) {
      console.error("User not found for token");
      return res.status(401).json({ message: "Unauthorized Access (Invalid user)" });
    }

    req.user = user;
    console.log("Authenticated User:", req.user);
    next();

  } catch (error) {
    console.error("Middleware Error:", error.message);
    res.status(401).json({ message: "Unauthorized Access (Token error)" });
  }
};

export default checkIsUserAuthenticated;
