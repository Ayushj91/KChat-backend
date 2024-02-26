import mongoose from 'mongoose';

const userSchema = new mongoose.Schema({
    userName :{
        type: String,
        required: true,
        unique: true
    },
    fullName: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true,
    },
    confirmPassword: {
        type: String
    },
    gender: {
        type: String,
        required: true,
        enum: ["male", "female"]
    },
    profilePic: {
        type: String
    }
})

export default mongoose.model("User", userSchema);