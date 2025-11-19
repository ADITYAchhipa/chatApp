import { createContext, useState } from "react";

import { useEffect } from "react";
// import axios from "axios";
import { useContext } from "react";
import { AxiosContext } from "./AxiosContext.jsx";
import toast from "react-hot-toast";
export const AuthContext = createContext();
import {io} from 'socket.io-client'
const backendUrl = import.meta.env.VITE_BACKEND_URL;

export const AuthProvider = ({children})=>{

    const {axios} = useContext(AxiosContext)
    const [onlineUser , setOnlineUsers] = useState([])
    const [socket,setSocket] = useState(null)
    const [authUser,setAuthUser] = useState(null)

    const checkAuth = async () =>{
        try{
            const {data} =await axios.get("/api/auth/me")
         

            if(data.success){
                    
                setAuthUser(data.user);
                connectSocket(data.user)
            }
        }catch(error){
            toast.error(error.message)
        }
    }





    const connectSocket = (userData)=>{
        // console.log(x);
        if(!userData || socket?.connected) {return;}
        const newSocket = io(backendUrl,{
            query:{
                userId:userData._id,
            }
        })
       
        setSocket(newSocket)
         newSocket.on("connect", () => {
      
          });
          newSocket.on("connect_error", (err) => {
        console.log("Socket connection error:", err.message);
     });

        newSocket.on("getOnlineUsers",(userIds)=>{
            // console.log("newSocket");
            setOnlineUsers(userIds)
        })
    }

    function handleLogin(data){
        setAuthUser(data.user)
        connectSocket(data.user)  
        toast.success(data.message)
    }
    function handleLogout(){
        setAuthUser(null)
        setOnlineUsers([])
        
        toast.success("logged out ")
    }
    useEffect(()=>{
        // console.log("auth check");
        checkAuth()
    },[])

    const value={
        authUser,
        onlineUser,
        socket,
        handleLogin,
        handleLogout ,
        axios,

    }
    return (
        <AuthContext.Provider value={value}>
            {children}
        </AuthContext.Provider>
    )
}