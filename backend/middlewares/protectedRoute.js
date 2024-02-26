import jwt from 'jsonwebtoken';
import User from '../models/user.model.js';


const protectedRoute = async(req, res, next) => {
    try {
        // console.log("req : ",  req);
        console.log("req.cookie : ",  req.cookies);
        const token = req.cookies.jwt;
        
        if(!token){
            return res.status(401).json({message: "Unauthorized access"});
        }
        const verified = jwt.verify(token, process.env.JWT_SECRET);
        if(!verified){
            return res.status(402).json({message: "Unauthorized access"});
        }
console.log("verified : ", verified);
        const user = await User.findById(verified.id).select("-password");
        if(!user){
            return res.status(401).json({message: "Unauthorized access"});
        }
        req.user = user;
        
        next();

    } catch (error) {
        console.log("protected route causing error: ", error);
        res.status(500).json({message: "Internal server error"});
    }
}

export default protectedRoute;