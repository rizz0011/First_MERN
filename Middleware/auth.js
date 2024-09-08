const USERMODEL = require("../models/User")
const jwt = require('jsonwebtoken');

async function auth(req, res, next){
    try {
        const token = req.headers.authorization && req.headers.authorization.split(' ')[1];
        if (!token) {
            return res.status(401).json({ error: 'Auth failed: No token provided' });
        }
        const decoded = jwt.verify(token, 'rizz012345khan');  // Use the same secret key used for signing

        console.log(decoded, "decoded")

        if (!decoded) {
            return res.status(401).json({ error: 'Auth failed: User not found' });
        }
        next()
    } catch (error) {
        console.log(error)
        res.status(400).json({error: true,
            errorMessage:"Auth failed"
        })
    }

}

module.exports = {
    auth
}