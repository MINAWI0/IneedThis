import React from "react";
import RepeatIcon from "@mui/icons-material/Repeat";
import { Avatar, Button, Menu, MenuItem } from "@mui/material";
import AvatarImg from "../../recources/avatar.png";
import { useLocation, useNavigate } from "react-router-dom";
import MoreHorizIcon from "@mui/icons-material/MoreHoriz";
import AddCommentIcon from "@mui/icons-material/AddComment";
import ResponseModel from "./ResponseModel";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import FavoriteIcon from "@mui/icons-material/Favorite";
import ReplayIcon from "@mui/icons-material/Replay";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { LikeRequest, copyRequest } from "../../Store/Request/Action";
import { formatDistanceToNow, parseISO } from "date-fns";

const RequestCard = ({ item }) => {
  const auth = useSelector((store) => store.auth);

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [anchorEl, setAnchorEl] = React.useState(null);
  const openCard = Boolean(anchorEl);

  const [openResponseModel, setOpenResponseModel] = useState(false);
  const handelOpenResponseModel = () => setOpenResponseModel(true);
  const handleCloseResponseModel = () => setOpenResponseModel(false);

  // const like = useSelector(state => state.like);

  const location = useLocation();

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };
  const handleDeleteRequest = () => {
    console.log("request has benn deleted");
    handleClose();
  };

  const handeCreatCopyRequest = () => {
    dispatch(copyRequest(item?.id));
  };
  const handelLikeRequest = () => {
    dispatch(LikeRequest(item?.id));
    console.log("request liked");
  };
  let timeAgo = ''
  if (item?.createdAt) {
    // Assuming item.createdAt is the date string "2024-05-10 20:14:33.947878"
    const parsedDate = parseISO(item.createdAt);
     timeAgo = formatDistanceToNow(parsedDate);
  } else {
    // Handle the case where item.createdAt is null
    console.error("item.createdAt is null");
  }
  const currentPath = location.pathname;
                // Construct the intended destination path
                const destinationPath = `/Request/${item?.id}`;

  return (
    <React.Fragment>
      <div className="">
        {/* <div className='flex items-center font-semibold text-gray-700 py-2'>
                <RepeatIcon/>
                <p>You retweet</p>
            </div> */}
        <div className="flex space-x-5">
          <Avatar
            onClick={() => navigate(`/profile/${item.user.id}`)}
            className="cursor-pointer"
            alt="me"
            src={item?.user?.image}
          />

          <div className="w-full">
            <div className="flex justify-between items-center mb-6">
              <div className="flex cursor-pointer items-center space-x-2">
                <span className="font-semibold text-lg">{item?.user?.fullName}</span>
                <span className="text-[#7c3Aed] "> {timeAgo} ago </span>
              </div>
             
                {(auth?.user?.id === item?.user?.id) ? ( 
                   <div>
                   <Button
                     id="basic-button"
                     aria-controls={openCard ? "basic-menu" : undefined}
                     aria-haspopup="true"
                     aria-expanded={openCard ? "true" : undefined}
                     onClick={handleClick}
                     sx={{
                       color: "#7c3aed", // Change the text color of the button
                     }}
                   >
                     <MoreHorizIcon />
                   </Button>
                <Menu
                  id="basic-menu"
                  anchorEl={anchorEl}
                  open={openCard}
                  onClose={handleClose}
                  MenuListProps={{
                    "aria-labelledby": "basic-button",
                  }}
                >
                  {
                    <MenuItem onClick={handleDeleteRequest}>
                    Delete Request
                  </MenuItem>
                  }
                  
                </Menu> </div>): null}
               
              
            </div>
            {/* <div  onClick={() =>navigate(`/Request/${item?.id}`)} className="cursor-pointer w-full"> */}
            <div
              onClick={() => {
                // Extract the path from the current location
                
                // Check if the current path is different from the destination path
                if (currentPath !== destinationPath) {
                  navigate(destinationPath);
                }
              }}
              className="cursor-pointer w-full"
            >
              <div className="flex flex-row-reverse h-full justify-between mb-3">
                <div className=" bg-slate-800 w-4/5 ml-4 bg-opacity-25">
                  <p className="p-4 block break-words text-lg">
                    {item?.content}
                  </p>
                </div>
                <img className="w-1/5" src={item?.image} alt="yes" />
              </div>
            </div>
            <div className="py-4 flex flex-wrap justify-start items-center">
              <div className=" flex pb-3 px-1 rounded-3xl">
              {auth.user.seller ? (
                <div className="space-x-3 p-2 flex  items-center text-gray-800 mr-2	">
                  <AddCommentIcon
                    className="cursor-pointer"
                    onClick={handelOpenResponseModel}
                  />
                  <p>{item?.totalReplies}</p>
                </div>
              ) : null} 

              <div
                className={`${
                  item?.liked ? "text-[#7c3Aed]" : "text-gray-800"
                } space-x-3 flex items-center mr-2`}
              >
                {item?.liked ? (
                  <FavoriteIcon
                    className="cursor-pointer"
                    onClick={handelLikeRequest}
                  />
                ) : (
                  <FavoriteBorderIcon
                    className="cursor-pointer"
                    onClick={handelLikeRequest}
                  />
                )}

                <p>{item?.totalLikes}</p>
              </div>
              {!auth.user.seller ? (
                <div
                  className={`${
                    item?.reRequest ? "text-[#7c3Aed]" : "text-gray-800"
                  } space-x-3 flex items-center mr-2`}
                >
                  <RepeatIcon
                    className="cursor-pointer"
                    onClick={handeCreatCopyRequest}
                  />
                  <p>{item?.totalReRequests}</p>
                </div>
              ) : null}
            </div>
            </div>
          </div>
        </div>
        <section>
          <ResponseModel
            open={openResponseModel}
            item={item}
            handleClose={handleCloseResponseModel}
          />
        </section>
      </div>
    </React.Fragment>
  );
};
export default RequestCard;