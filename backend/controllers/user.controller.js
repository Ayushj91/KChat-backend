import User from "../models/user.model.js";

const getUsersForSidebar = async (req, res) => {
    const userId= req.user._id;
    try {
        const users = await User.find({_id: {$ne: userId}}).select("-password");
        res.status(200).json(users);
    } catch (error) {
        console.log("get users for sidebar causing error: ", error);
        res.status(500).json({
        message: "Internal server error"
        });
    }
    };

export default getUsersForSidebar;