import UserConversations from "../models/conversations.model.js";
import UserMessages from "../models/messages.model.js";
const sendMessageController = async (req, res) => {
  try {
    console.log("req.body : ", req.body);
    const { id } = req.params;
    const { message } = req.body;
    const sender = req.user._id;
    const receiver = id;
    let conversation = await UserConversations.findOne({
      participants: {
        $all: [sender, receiver],
      },
    });
    if (!conversation) {
      console.log("conversation not found");
      conversation = await UserConversations.create({
        participants: [sender, receiver],
      });
    }
      console.log("conversation : ", conversation);
      console.log(message);
      console.log(sender);
      console.log(receiver);
      const newMessage = new UserMessages({
        senderId: sender,
        receiverId: receiver,
        message: message,
      });
      if (newMessage) {
        conversation.messages.push(newMessage._id);
      }
      await conversation.save();
      await newMessage.save();
      res.status(200).json({ message: "Message sent" });
    
  } catch (error) {
    console.log("send message controller causing error: ", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

const getMessagesController = async (req, res) => {
    try {
        const { id } = req.params;
        const sender = req.user._id;
        const receiver = id;
        let conversation = await UserConversations.findOne({
        participants: {
            $all: [sender, receiver],
        },
        }).populate("messages");
        if (!conversation) {
        return res.status(200).json({ messages: [] });
        }
        res.status(200).json({ messages: conversation.messages });
    } catch (error) {
        console.log("get messages controller causing error: ", error);
        res.status(500).json({ message: "Internal server error" });
    }
    };

export { sendMessageController, getMessagesController };
