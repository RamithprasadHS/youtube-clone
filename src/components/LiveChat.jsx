import React, { useEffect, useState } from "react";
import ChatMessage from "./ChatMessage";
import { useDispatch, useSelector } from "react-redux";
import { addMessage } from "../utilites/chatsSlice";
import { generateRandomMessage, generateRandomNames } from "../utilites/helper";

const LiveChat = () => {
  const [chatMessage, setChatMessage] = useState("");
  const dispatch = useDispatch();
  const chats = useSelector((state) => state.chats.messages);
  useEffect(() => {
    let i = setInterval(() => {
    //  console.log("API POLLING");
      dispatch(
        addMessage({
          name: generateRandomNames(),
          message: generateRandomMessage(25),
        })
      );
    }, 1500);

    return () => {
      clearInterval(i);
    };
  }, []);


  const chatFormSubmitHandler = (e) => {
     e.preventDefault();
     dispatch(addMessage({
        name:"Ramith Prasad",
        message:chatMessage,
    }),
    setChatMessage("")
    )
  }
  return (
    <>
      <div className="w-full h-[600px] ml-2 p-2 border border-black bg-slate-100 rounded-lg overflow-auto flex flex-col-reverse">
        {chats.map((chat, index) => (
          <ChatMessage key={index} name={chat.name} message={chat.message} />
        ))}
      </div>
      <form className="w-full p-2 ml-2 border border-black" onSubmit={chatFormSubmitHandler}>
        <input 
        className="w-96 border border-purple px-2" 
        type="text" 
        value={chatMessage} 
        onChange={(e) => setChatMessage(e.target.value)}
        />
        <button className="px-2 mx-2 bg-green-100" >Send</button>
      </form>
    </>
  );
};

export default LiveChat;
