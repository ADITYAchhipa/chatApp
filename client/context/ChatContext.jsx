
import  { createContext, useContext } from 'react'
import { useState } from 'react'
import { AuthContext } from './AuthContex.jsx'
import toast from 'react-hot-toast'
export const ChatContext = createContext()
import { useEffect } from 'react'

export const ChatProvider = ({children}) => {
    const [messages, setMessages] = useState([])
    const [users,setUsers] = useState([])
    const [selectedUser, setSelectedUser] = useState(null)
    const [unseenMessages, setUnseenMessages] = useState({})
    const {socket ,axios} = useContext(AuthContext)
     const[info,setInfo]= useState(false);
    

    // function to get all users

    const getUsers = async()=>{
        try{
            const {data} = await axios.get("/api/messages/users")
            // console.log(data.success)
            if(data.success){
                setUsers(data.users)
                setUnseenMessages(data.unseenMessages)
            }
            
        }catch(error){
            console.log(error)
            toast.error(error.message)
        }
    }


    //  function to get messsages for selected user

    const getMessages = async (userId)=>{
        try{
            const {data} = await axios.get(`/api/messages/${userId}`);
            if(data.success){
                setMessages(data.messages)
            }
        }catch(error){
            console.log(error)
            toast.error(error.message)
        }
    }


    // function to send message

    const sendMessage = async (messageData)=>
    {
        try{
            const{data} = await  axios.post(`/api/messages/send/${selectedUser._id}`,messageData)
            if(data.success){
                setMessages((prevMessages)=>[...prevMessages,data.newMessage])
            }else{
                toast.error(data.message)
            }    
        }catch(error){
            console.log(error)
            toast.error(error.message)
        }
    }
    

    // fucnction to subscribe the messages

    const subscribeToMessages = ()=>{
        if(!socket) return;
        socket.on("newMessage",(newMessage)=>{
            if(selectedUser && newMessage.senderId === selectedUser._id){
                newMessage.seen=true
                setMessages((prevMessages)=>[...prevMessages,newMessage])
                axios.put(`/api/messages/mark/${newMessage._id}`)
            }else{
                setUnseenMessages((prevUnseenMessages)=>({
                    ...prevUnseenMessages,[newMessage.senderId]:(prevUnseenMessages[newMessage.senderId] || 0)+1
                }))
            }
        })
    }


    // unsubscribe
    const unsubscribeFromMessages = ()=>{
        if(socket) socket.off("newMessage")

    }


    useEffect(()=>{
        subscribeToMessages()
        return ()=>{
            unsubscribeFromMessages()
        }
    },[socket,selectedUser])




    const value={
        messages,
        users,
        selectedUser,
        unseenMessages,
        setSelectedUser,
        getMessages,
        getUsers,
        sendMessage,
        setMessages,
        setUnseenMessages,
        info,setInfo
        

    }
    return(
        <ChatContext.Provider value={value}>
            {children}
        </ChatContext.Provider>
    )
}

export default ChatContext