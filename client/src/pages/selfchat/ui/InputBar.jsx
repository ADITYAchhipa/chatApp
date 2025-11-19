import React from 'react'
import assets from '../../../assets/assets.js';


const InputBar = (props) => {

  const {handleSendMessage,setInput,input,handleSendImage} = props;
  return (
            <div className='absolute bottom-0 left-0 right-0 flex items-center gap-3 p-3'>

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

</div>

  )
}

export default InputBar