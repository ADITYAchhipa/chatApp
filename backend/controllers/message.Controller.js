import Message from "../models/message.js";
import User from "../models/User.js";
import { userSocketMap } from "../server.js";
import cloudinary from "../lib/cloudinary.js";
import { io } from "../server.js";
export async function  markMessageAsSeen(req,res){
    try{
        const {id} = req.params;
        await Message.findByIdAndUpdate(id,{seen:true})
        res.json({success:true})
    }
    catch(error){
        console.log(error.message)
        res.json({success:false,message:error.message})
    }
} 

export async function getMessages(req,res){
    try{
        const{id:selectedUserId} = req.params
        const myId = req.user._id;
        const message = await Message.find({
            $or:[
                {senderId:myId,receiverId:selectedUserId},
                {senderId:selectedUserId,receiverId:myId},
            ]
        })

        await Message.updateMany({senderId:selectedUserId,receiverId:myId},{seen:true})

        res.json({success:true,messages:message});
    }catch(error){
        console.log(error.message)
        res.json({success:false,message:error.message});
    }
}

export async function getUserForSideBar(req,res){
   try{
     const userId = req.user._id;
    const filtereduser = await User.findById(req.user._id)
      .select("friends")
      .populate("friends", "_id fullName profilePic");

      const unseenMessages = {}
      const promise = filtereduser.friends.map(async (user)=>{
        const message = await Message.find({senderId:user._id,receiverId:userId,seen:false})
        if(message.length>0){
            unseenMessages[user._id] = message.length;
        }
      })
      await Promise.all(promise)
    //   console.log("x a ");
      res.json({success:true,users:filtereduser.friends,unseenMessages})


   }catch(error){
    console.log(error.message)
    res.json({success:false,message:error.message})
   }
}


export async function sendMessage (req,res){
    try{
        const{text,image}=req.body
        const receiverId = req.params.id
        const senderId = req.user._id
        let imageurl;
        if(image){
            const uploadResponse = await cloudinary.uploader.upload(image)
            imageurl = uploadResponse.secure_url;
        } 
        const newMessage = await Message.create({
            senderId,
            receiverId,
            text,
            image:imageurl
        })
        const receiverSocketId = userSocketMap[receiverId]
        if(receiverSocketId){
            io.to(receiverSocketId).emit("newMessage",newMessage)
        }

        res.json({success:true,newMessage})

    }catch(error){
    console.log(error.message)
    res.json({success:false,message:error.message})
   }
}




