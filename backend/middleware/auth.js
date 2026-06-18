const jwt = require("jsonwebtoken");

const verifyToken = (req, res, next) => {
    console.log("HEADERS:", req.headers);

    let token = req.headers.authorization;

    console.log("AUTH HEADER:", token);

    if (!token) {
        return res.status(400).json({
            message: "No token provided"
        });
    }

    const parts = token.split(" ");

    if (parts.length !== 2) {
        return res.status(400).json({
            message: "Invalid token format"
        });
    }

    token = parts[1];

    console.log("TOKEN:", token);

    jwt.verify(token, process.env.SECRET_KEY, (err, decoded) => {
        if (err) {
            console.log("JWT ERROR:", err.message);

            return res.status(400).json({
                message: "Invalid token"
            });
        }

        console.log("DECODED:", decoded);

        req.user = decoded;

        next();
    });
};

module.exports = verifyToken;