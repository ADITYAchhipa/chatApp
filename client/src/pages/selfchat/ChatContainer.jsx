import  {  useContext, useEffect, useState } from 'react'
import assets from '../../assets/assets.js'
import { FormatMessageTime } from '../../lib/utils.js';
import { useRef } from 'react';
import { ChatContext } from '../../../context/ChatContext.jsx';
import toast from 'react-hot-toast';
import { AuthContext } from '../../../context/AuthContex.jsx';
import InputBar from '../selfchat/ui/InputBar.jsx';
const ChatContainer = () => {
    const { selectedUser,messages  ,setSelectedUser , sendMessage , getMessages ,setInfo,info} = useContext(ChatContext)
    const scrollEnd = useRef();
    const {authUser , onlineUser } = useContext(AuthContext)
    const [input,setInput] = useState('')


    const handleSendMessage = async (e) =>{
        e.preventDefault();
        if(input.trim() ==="") return null;
        await sendMessage({
            text:input.trim(),
        });
        setInput("");

    }
    // console.log(authUser)

    const handleSendImage = async(e)=>{
      const file = e.target.files[0];
      if(!file || !file.type.startsWith("image/")) toast.error("select an image");
      const reader = new FileReader();
      reader.onloadend = async()=>{
        await sendMessage({
            image:reader.result,
        });
        e.target.value = "";
      };
      reader.readAsDataURL(file);

    }



    useEffect(()=>{
      if(selectedUser){
        getMessages(selectedUser._id);
        console.log(selectedUser._id);
      }
    },[selectedUser])
    useEffect(() => {
        if(scrollEnd.current && messages){
            scrollEnd.current.scrollIntoView({behavior:"smooth"})
        }
    },[messages]);
    console.log(messages);
  
    return selectedUser ? (
  <div className="h-full overflow-scroll relative backdrop-blur-lg">
    <div className="flex items-center gap-3 py-3 mx-4 border-b border-stone-500">
      <img  src={selectedUser.profilePic || assets.avatar_icon} alt="" className="w-8 rounded-full" />
      <p className="flex-1 text-lg text-white flex items-center gap-2">
        {selectedUser.fullName}
        {onlineUser.includes(selectedUser._id)}<span className="w-2 h-2 rounded-full bg-green-500"></span>
      </p>
      <img onClick={() => setSelectedUser(null)} src={assets.arrow_icon} alt="" className="md:hidden max-w-7" />
      <img onClick={()=>{setInfo(!info)}} src={assets.help_icon} alt="" className="max-md:hidden max-w-5" />
    </div>


    {/* {chat area} */}


    <div className='flex flex-col h-[calc(100%-120px)] overflow-y-scroll p-3 pb-6'>
  {messages.map((msg, index) => (
    <div 
      key={index}
      className={`flex items-end gap-2 justify-end ${
        msg.senderId !== authUser._id && 'flex-row-reverse'
      }`}
    >
      {msg.image ? (
        <img 
         
          src={msg.image} 
          alt="" 
          className='max-w-[200px] border border-gray-700 rounded-lg overflow-hidden mb-8'
        />
      ) : (
        <p
          className={`p-2 max-w-[200px] md:text-sm font-light rounded-lg mb-8 break-all
            bg-violet-500/30 text-white ${
              msg.senderId === authUser._id
                ? 'rounded-br-none'
                : ''
            }`}
        >
          {msg.text}
        </p>
      )}
      {/* 26 */}
      <div className="text-center text-xs">
                    <img src={msg.senderId === authUser._id ? authUser?.profilePic || assets.
                        avatar_icon : selectedUser?.profilePic|| assets.profile_martin} alt="" className='w-7
                        rounded-full' />
                    <p className='text-gray-500'>{FormatMessageTime(msg.createdAt)}</p>
                </div>
           






    </div>
  ))}
  <div ref={scrollEnd}></div>

        {/* { Bottom area } */}

       <InputBar
  handleSendMessage={handleSendMessage}
  handleSendImage={handleSendImage}
  setInput={setInput}
  input={input}
/>



    {/* <div className='absolute bottom-0 left-0 right-0 flex items-center gap-3 p-3'>

    <div className='flex-1 flex items-center bg-gray-100/10 px-3 py-2 rounded-full'>

        <input onChange={(e)=>{setInput(e.target.value)}}
            value={input}
            onKeyDown={(e)=>e.key === "Enter"?handleSendMessage(e):"null"}
            type="text"
            placeholder="Send a message"
            className='flex-1 text-sm border-none outline-none bg-transparent 
                       text-white placeholder-gray-400'
        />

        <input onChange={handleSendImage} type="file" id="image" accept="image/png, image/jpeg" hidden />

        <label htmlFor="image" className="flex items-center cursor-pointer ml-2">
            <img
                src={assets.gallery_icon}
                alt=""
                className="w-5 h-5"
            />
        </label>

    </div>

    <img
    onClick={handleSendMessage}
        src={assets.send_button}
        alt=""
        className="w-7 cursor-pointer"
    />

</div> */}






</div>

</div>
) : (
    <div className="flex flex-col items-center justify-center gap-2 h-screen text-gray-500 bg-white/10 ">
  <img src={assets.logo_icon} className="max-w-16" alt="" />
  <p className="text-lg font-medium text-white">Chat anytime, anywhere</p>
</div>

);
}

export default ChatContainer