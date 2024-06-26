const jwt = require("jsonwebtoken");
const User = require("../models/userModel");
const requireAdminAuth = async (req, res, next) => {
    const Authorization = req.headers["authorization"];
    if (!Authorization) {
        return res.status(500).json({"mssg": "An admin must be logged in"});
    }
    const token = Authorization.split(" ")[1];

    try {
        const decoded = jwt.verify(token, process.env.SECRET);
        req.user = decoded;
        const user = await User.findById(req.user._id);

        if (!user) {
            return res.status(500).json({"mssg": "No user found with this token"});
        }

        if (user.role !== "admin") {
            return res.status(500).json({"mssg": "This user is not an admin"});
        }
        req.user = user;
        next();
    } catch (error) {
        return res.status(500).json({"mssg": "Error verifying token or finding user", "error": error});
    }
}



module.exports = requireAdminAuth;