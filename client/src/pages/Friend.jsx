import React, { useState } from 'react'
import Sidebar from './selfchat/Sidebar.jsx'
import ChatContainer from './selfchat/ChatContainer'
import RightSideBar from './selfchat/RightSideBar'
import { ChatContext } from '../../context/ChatContext.jsx';
import { useContext } from 'react';
const Friend = () => {

    const {selectedUser,info} = useContext(ChatContext);

   

  return (
    
      <div className="flex h-screen bg-gray-900 text-white">
      

    {/* ========== SIDEBAR ========== */}
    <div
      className={`
        border-r border-gray-700
        
        ${selectedUser  ? 'hidden ' : 'block'}
        ${!selectedUser || info ? 'sm:block' : 'sm:hidden'}
        w-full
          
          md:w-2/6
          md:block
          lg:w-2/6
         
      `}
    >
      <Sidebar      />
    </div>
   
    {/* ========== CHAT CONTAINER ========== */}
   <div className={`${info || !selectedUser ? 'hidden' : 'block'}  border-r  sm:block  border-gray-700 w-full `}>
      <ChatContainer/>
    </div>

    {/* ========== RIGHT SIDEBAR ========== */}
    <div
      className={`
         
        ${info ? 'block' : 'hidden'}
        lg:w-2/6 w-full

      `}
    >
      <RightSideBar       
      />
    </div>

  </div>
);

    
  
//    return (
//   <div className='border w-full h-screen sm:px-[15%] sm:py-[5%]'>
//     <div
//       className={`backdrop-blur-xl border-2 border-gray-600 rounded-2xl overflow-hidden h-[100%] grid grid-cols-1 relative ${
//         selectedUser
//           ? 'md:grid-cols-[1fr_1.5fr_1fr] xl:grid-cols-[1fr_2fr_1fr]'
//           : 'md:grid-cols-2'
//       }`}
//     >
//       <Sidebar
//         selectedUser={selectedUser}
//         setSelectedUser={setSelectedUser}
//       />

//       <ChatContainer
//         selectedUser={selectedUser}
//         setSelectedUser={setSelectedUser}
//       />

//       <RightSideBar
//         selectedUser={selectedUser}
//         setSelectedUser={setSelectedUser}
//       />
//     </div>
//   </div>
// );
}

export default Friend