import React from 'react'
import { useSelector } from 'react-redux';

const ChatMessages = ({item}) => {
  const { auth } = useSelector((store) => store);
const isReqUserMessage = auth.user?.id===item.user?.id
console.log(item?.image)
  return (
    <div className={`flex mt-11 ${!isReqUserMessage? "justify-start":"justify-end"}`}>
        <div className={`p-1 ${item.image? "rounded-md": "px-5 rounded-full"} bg-[#191c29] `}>
          {item.image && <img  className="w-[12rem] h-auto object-cover rounded-md" src={item?.image}/>}
            <p className={`${true? "py-2":"py-1"}`}>{item?.content}</p>
        </div>
    </div>
  )
}
export default ChatMessages