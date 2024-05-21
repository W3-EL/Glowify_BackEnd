const jwt = require("jsonwebtoken");
const User = require("../models/userModel");

const requireAuth = async (req, res, next) => {
    const Authorization = req.headers['authorization'];
    if (!Authorization) {
        return res.status(401).json({error: 'Authorization token required'})
    }

    const token = Authorization.split(' ')[1]
    try {
        const decoded = jwt.verify(token, process.env.SECRET);

        // Access the user attributes from the decoded token
        req.user = await User.findById(decoded._id);

        if (!req.user) {
            return res.status(401).json({ error: 'Request is not authorized' });
        }
        next()

    } catch (error) {
        console.log(error)
        res.status(401).json({error: 'Request is not authorized'})
    }
}


module.exports = requireAuth;