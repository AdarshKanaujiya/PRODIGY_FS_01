const jwt = require("jsonwebtoken");

const authMiddleware = (req, res, next) => {
    const token = req.header("Authorization");
    console.log("Received Token:", token);  // Debugging step

    if (!token) return res.status(401).json({ message: "Access Denied" });

    try {
        const tokenWithoutBearer = token.replace("Bearer ", "");
        console.log("Token without Bearer:", tokenWithoutBearer);

        const verified = jwt.verify(tokenWithoutBearer, process.env.JWT_SECRET);
        req.user = verified;
        next();
    } catch (err) {
        res.status(400).json({ message: "Invalid Token" });
    }
};

module.exports = authMiddleware;
