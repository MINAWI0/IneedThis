import React, { useEffect, useRef, useState } from "react";
import Grid from "@mui/material/Grid";
import WestIcon from "@mui/icons-material/West";
import { Avatar, Backdrop, CircularProgress, IconButton } from "@mui/material";
import CallIcon from "@mui/icons-material/Call";
import MissedVideoCallIcon from "@mui/icons-material/MissedVideoCall";
import { Photo, VideoCall } from "@mui/icons-material";
import AddAPhotoIcon from "@mui/icons-material/AddAPhoto";
import ChatBubbleOutlineIcon from "@mui/icons-material/ChatBubbleOutline";
// import SearchUser from '../SearchUser/SearchUser';
// import UserChatCard from './UserChatCard';
import ChatMessages from "./ChatMessage";
import KeyboardBackspaceIcon from "@mui/icons-material/KeyboardBackspace";
import { useNavigate } from "react-router-dom";
import SearchUser from "../SearchUser/SearchUser";
import UserChatCard from "./UserChat";
import { useDispatch, useSelector } from "react-redux";
import { createMessage, getAllChats } from "../../Store/Message/Message.action";
import { uploadtoCloud } from "../CloudAPi/UploadToCloud";
import SockJS from "sockjs-client";
import Stom from "stompjs";
const Message = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { message, auth } = useSelector((store) => store);
  const [currentChat, setCurrentChat] = useState();
  const [messages, setMessages] = useState([]);
  const [selectedImage, setSelectedImage] = useState();
  const [loading, setLoading] = useState(false);
  const chatContainerRef = useRef(null)


  useEffect(() => {
      if(chatContainerRef.current){
        chatContainerRef.current.scrollTop = chatContainerRef.current.scrollHeight
      }
  }, [messages]);


  useEffect(() => {
    dispatch(getAllChats());
  }, []);

  const handelCreateMessage = (value) => {
    const message = {
      chatId: currentChat?.id,
      content: value,
      image: selectedImage,
    };
    dispatch(createMessage({message , sendMessageToServer}));
  };
  const handleSelectImage = async (e) => {
    setLoading(true);
    console.log("handle select image...");
    const imgUrl = await uploadtoCloud(e.target.files[0], "image");
    setSelectedImage(imgUrl);
    setLoading(false);
  };

  console.log("chats --------------", message?.chats);
  console.log("image --------------", currentChat);


  const handleBack = () => navigate(-1);

  useEffect(() => {
    setMessages([...messages, message.message]);
  }, [message.message]);

  const [stompClient, setstompClient] = useState(null);

  useEffect(() => {
    const sock =  new SockJS("http://localhost:8080/ws");
    const stomp = Stom.over(sock);
    setstompClient(stomp);
    stomp.connect({} , onConnect , onErr)

  },[]);

  const  onConnect = () =>{
    console.log("websocket is runiiiing")
  }
  const  onErr = (error) =>{
    console.log("websocket is errrrrrorororoor" , error)
  }

  useEffect(() => {
    if (chatContainerRef.current) {
        chatContainerRef.current.scrollTop = chatContainerRef.current.scrollHeight;
    }
}, [messages]);

  const onMessageRecv = (payload)=>{
    const recivedMessage = JSON.parse(payload.body)
    console.log("message recive from websock" , recivedMessage )
    setMessages([...messages , recivedMessage])
  }

  const sendMessageToServer = (newMessage) =>{
    if(stompClient && newMessage){
      stompClient.send(`/app/chat/${currentChat?.id.toString()}` ,{} , JSON.stringify(newMessage) )
    }
  }

  return (
    <div className="bg-slate-800 w-[100vw] z-30 ">
      <section className={"z-50 flex items-center sticky top-0  bg-gray-950"}>
        <KeyboardBackspaceIcon
          className="cursor-pointer"
          onClick={handleBack}
        />
        <h1 className="py-5 text-xl font-bold opacity-90 ml-5 ">
          <span className="text-[#7c3Aed]">chat</span>
        </h1>
      </section>
      <Grid container className="h-screen overflow-y-hidden">
        <Grid item xs={3} className="px-5 bg-zinc-500">
          <div className="flex h-full justify-between space-x-2">
            <div className="w-full">
              {/* <div className='flex space-x-4 items-center py-5'>
          <WestIcon />
          <h1 className='text-xl font-bold'>Chat Room</h1>
        </div> */}
              <div className="h-full flex flex-col">
                <div>
                  <SearchUser></SearchUser>
                </div>
                <div  ref={chatContainerRef}
                className="h-full space-y-4 mt-5 overflow-y-scroll hideScrollbar">
                  {message.chats.map((item) => {
                    return (
                      <div
                        onClick={() => {
                          setCurrentChat(item);
                          setMessages(item.messages);
                        }}
                      >
                        <UserChatCard chat={item} />
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>
          </div>
        </Grid>
        <Grid item xs={9} className="h-auto px-5">
          {currentChat ? (
            <div>
              <div className="flex justify-between items-start border-1 py-5 ">
                <div className="flex  items-center space-x-3">
                  <Avatar src={currentChat.users?.image} />
                  <p>
                    {console.log("waaa" , currentChat)}
                    {auth.user?.id === currentChat.users[0]?.id
                      ? currentChat.users[1].fullName
                      : currentChat.users[0].fullName}
                  </p>
                </div>
                <div className="flex  space-x-3">
                  <IconButton>
                    <CallIcon />
                  </IconButton>
                  <IconButton>
                    <VideoCall />
                  </IconButton>
                </div>
              </div>
              <div className="hidScrollbar overflow-y-scroll h-[400px] px-2">
                {messages.map((item) => (
                  <ChatMessages item={item} />
                ))}
              </div>
              <div className="sticky bottom-0 border-1">
              {selectedImage && (
                    <img
                      src={selectedImage}
                      alt="product chat"
                      className="w-[5rem] h-[auto] object-cover px-2"
                    />
                  )}
                <div className="py-5 flex items-center justify-center space-x-5">
                
                  <input
                    onKeyPress={(e) => {
                      if (e.key === "Enter" && e.target.value) {
                        handelCreateMessage(e.target.value);
                        setSelectedImage("");
                      }
                    }}
                    className="bg-transparent border border-[#3b40544] rounded-full w-[90%]  py-3 px-5  "
                    placeholder="type message ..."
                    type="text"
                  />
                  <input
                    type="file"
                    accept="images/*"
                    onChange={handleSelectImage}
                    className="hidden"
                    id="image-input"
                  />
                  <label htmlFor="image-input">
                    <Photo></Photo>
                  </label>
                </div>
              </div>
            </div>
          ) : (
            <div
              className="h-full space-y-5 flex flex-col justify-center
items-center"
            >
              <ChatBubbleOutlineIcon sx={{ fontSize: "15rem" }} />
              <p className="text-xl font-semibold">No Chat Selected</p>
            </div>
          )}
        </Grid>
      </Grid>
      <Backdrop
        I
        sx={{ color: "#fff", zIndex: (theme) => theme.zIndex.drawer + 1 }}
        open={loading}
      >
        <CircularProgress color="inherit" />
      </Backdrop>
    </div>
  );
};

export default Message;
