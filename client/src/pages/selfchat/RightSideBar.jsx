import React, { useEffect } from 'react';
import assets from '../../assets/assets.js';
import { imagesDummyData } from '../../assets/assets';
import { useContext } from 'react';
import { useState } from 'react';
import { ChatContext } from '../../../context/ChatContext.jsx';
import { AuthContext } from '../../../context/AuthContex.jsx';
import { CircleArrowLeft } from 'lucide-react';
const RightSideBar = () => {
  const {selectedUser,messages,setInfo,info} = useContext(ChatContext);
  const {onlineUser} = useContext(AuthContext);
  const [msgImages,setMsgImages]=useState([])


  useEffect(()=>{
   
      const images = messages.filter((msg)=>msg.image).map((msg)=>msg.image);
      setMsgImages(images);
   
  },[messages,selectedUser])



  return (
    info && (
      <div
        className={`bg-[#8185B2]/10 text-white w-full h-screen relative overflow-y-scroll 
        }`}
      >
        <CircleArrowLeft onClick={()=>{setInfo(false)}} className='mt-3 ml-3 size-50' />
        <div className="pt-16 flex flex-col items-center gap-2 text-xs font-light mx-auto">
          <img
            src={selectedUser?.profilePic || assets.avatar_icon}
            alt=""
            className="w-20 aspect-[1/1] rounded-full"
          />

          <h1 className="px-10 text-xl font-medium mx-auto flex items-center gap-2">
            {onlineUser.includes(selectedUser._id) && <p className="w-2 h-2 rounded-full bg-green-500"></p>}
            {selectedUser.fullName}
          </h1>

          <p className="px-10 mx-auto">{selectedUser.bio}</p>
        </div>

        <hr className="border-[#ffffff50] my-4" />

<div className="px-5  text-xs">
  <p>Media</p>

  <div className="mt-2 h-[400px] overflow-y-scroll grid grid-cols-2 gap-4 opacity-80">
    {msgImages.map((url, index) => (
      <div
        key={index}
        onClick={() => window.open(url)}
        className="cursor-pointer rounded"
      >
        <img src={url} alt="" className="h-full rounded-md" />
      </div>
    ))}
  </div>
</div>

  

      </div>
    )
  );
};



export default RightSideBar