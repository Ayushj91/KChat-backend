import mongoose from "mongoose";

const userConversationsSchema = new mongoose.Schema({
   participants: [
         {
              type: mongoose.Schema.Types.ObjectId,
                ref: "User"

         }
    ],
    messages: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: "UserMessages",
            default: []
        }
    ]
}, {timestamps: true});

export default mongoose.model("UserConversations", userConversationsSchema);
