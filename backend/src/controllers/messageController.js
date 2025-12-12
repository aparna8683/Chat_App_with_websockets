import cloudinary from "../lib/cloudinary.js"
import Message from "../models/message.model.js"
import User from "../models/user.model.js"
// import messageRouter from "../routes/message.route.js"

export  const getUsersForSidebar=async (req,res)=>{
try{
    const loggedInUserId=req.user._id
    const filteredUsers=await User.find({_id:{$ne:loggedInUserId}}).select("-password")
    res.status(200).json(filteredUsers)

}catch(error){
    console.log("Errors In getUsersSideBar", error.message)
    res.status(500).json({message:error.message})
}
} 
export const getMessages= async (req, res)=>{
    try{
        const {id:userToChatId}= req.params
        const senderId=req.user._id;
        if (!senderId) {
    return res.status(401).json({ message: "Unauthorized: User not logged in" });
}
        const messages=await Message.find({$or:[
            {senderId:senderId, receiverId:userToChatId},
            {senderId:userToChatId, receiverId:senderId}
        ]

        })
        res.status(200).json(messages)
    }
    catch(error){
            console.log("Error in getMessages:", error.message);

        res.status(400).json("Internal server error")

    }


}
export const sentMessage=async (req, res)=>{
    try {
            const {id:receiverId}=req.params
                const senderId = req.user?._id; 

            const {text, image}=req.body;
            let imageUrl;
            if(image){
                //upload base64 into cloudinary
                const uploadResponse= await cloudinary.uploader.upload(image)
                imageUrl=(uploadResponse).secure_url
            }
            const newMessage=new Message({
                receiverId, senderId, image:imageUrl, text
            })
            await newMessage.save();
            // relatime functionality goes here
            res.status(201).json(newMessage)



        
    } catch (error) {
        res.status(500).json("internal server error")
        
    }


}
  