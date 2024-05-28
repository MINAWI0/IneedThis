import React from "react";
import RepeatIcon from "@mui/icons-material/Repeat";
import { Avatar, Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, Menu, MenuItem } from "@mui/material";
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
import { LikeRequest, copyRequest, deleteRequest } from "../../Store/Request/Action";
import { formatDistanceToNow, parseISO } from "date-fns";
import CheckIcon from "@mui/icons-material/Check";
import PaidIcon from '@mui/icons-material/Paid';

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
  

  const handeCreatCopyRequest = () => {
    dispatch(copyRequest(item?.id));
  };
  const handelLikeRequest = () => {
    dispatch(LikeRequest(item?.id));
    console.log("request liked");
  };
  let timeAgo = "";
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
  // const handleDeleteRequest = () => {
  //   console.log("request has benn deleted");
  //   dispatch(deleteRequest(item?.id));
  //   handleClose();
  // };
  // dialoog
  const [openDialog, setOpenDialog] = useState(false);
const [requestIdToDelete, setRequestIdToDelete] = useState(null);

const handleClickOpenDialog = (event, requestId) => {
  event.stopPropagation();
  setRequestIdToDelete(requestId);
  setOpenDialog(true);
};

const handleCloseDialog = () => {
  setOpenDialog(false);
  setRequestIdToDelete(null);
};

const handleConfirmDelete = () => {
  dispatch(deleteRequest(requestIdToDelete));
  setOpenDialog(false);
};
const handleDeleteRequest = (event) => {
  event.stopPropagation();
  handleClickOpenDialog(event, item?.id);
};

  
  

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
                <span className="font-semibold text-lg">
                  {item?.user?.fullName}
                </span>
                <span className="text-[#7c3Aed] "> {timeAgo} ago </span>
              </div>

              {auth?.user?.id === item?.user?.id ? (
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
                  </Menu>{" "}
                </div>
              ) : null}
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
            {!(currentPath !== destinationPath) ? (
              <div>
                <div class="flex bg-blue-100 rounded-s p-4 mb-4">
                <PaidIcon className="text-blue-700" />
                  <p class="ml-3 text-sm text-blue-700">
                    <span class="font-medium"> Budget is : {item?.maxPrice}  $ </span> 
                  </p>
                </div>
              </div>
            ) : null}

            {!item?.closed ? (
              <div className="py-4 flex flex-wrap justify-start items-center">
                <div className=" flex pb-3 px-1 rounded-3xl ">
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
            ) : (
              <span class="inline-flex items-center my-2 px-3 py-1 bg-green-200 hover:bg-green-300 rounded-s text-sm font-semibold text-green-600 w-full">
                <CheckIcon />
                <span class="ml-1">request has been closed by the owner</span>
              </span>
            )}
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
      <Dialog
  open={openDialog}
  onClose={handleCloseDialog}
  aria-labelledby="alert-dialog-title"
  aria-describedby="alert-dialog-description"
>
  <DialogTitle id="alert-dialog-title">{"Delete Request"}</DialogTitle>
  <DialogContent>
    <DialogContentText id="alert-dialog-description">
      Are you sure you want to delete this request? This action cannot be undone.
    </DialogContentText>
  </DialogContent>
  <DialogActions>
    <Button onClick={handleCloseDialog} color="primary">
      Cancel
    </Button>
    <Button onClick={handleConfirmDelete} color="secondary" autoFocus>
      Delete
    </Button>
  </DialogActions>
</Dialog>
    </React.Fragment>
  );
};
export default RequestCard;
