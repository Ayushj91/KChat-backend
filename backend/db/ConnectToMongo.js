import mongoose from "mongoose";

const connectToMongoDB= async() => {
    try {
        mongoose.connect(process.env.MongoDB_URI);
        console.log("Connected to Mongo");
    } catch (error) {
        console.log(error);
    }
}

export default connectToMongoDB;