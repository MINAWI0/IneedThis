import React, { useEffect, useState } from "react";
import KeyboardBackspaceIcon from "@mui/icons-material/KeyboardBackspace";
import { useNavigate, useParams } from "react-router-dom";
import RequestCard from "../HomeSection/RequestCard";
import Response from "../HomeSection/Response";
import Divider from "@mui/material/Divider";
import { useDispatch, useSelector } from "react-redux";
import {
  deleteRequest,
  findRequestById,
  getUsersRequests,
} from "../../Store/Request/Action";
import { findUserById } from "../../Store/Auth/Action";
import { format } from "date-fns";
import { Button, Menu, MenuItem } from "@mui/material";
import DeleteOutlineIcon from "@mui/icons-material/DeleteOutline";
import MoreHorizIcon from "@mui/icons-material/MoreHoriz";
import {
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
} from "@mui/material";

// ::::::::::::::::::::::::::::::::: imports

const MyRequests = () => {
  const navigate = useNavigate();
  const handleBack = () => navigate(-1);
  const { auth, request } = useSelector((store) => store);
  console.log("hhhhhhhhhhhhhhhhhhhhhhh", auth);
  console.log("hannnnii", auth?.finduser?.id);
  console.log("list of request" , request.requests)

  const dispatch = useDispatch();
  const { id } = useParams();

  useEffect(() => {
    if (auth?.user?.id) {
      dispatch(findUserById(auth?.user?.id));
      dispatch(getUsersRequests(auth.user.id));
      console.log("the id of profile user", id);
    }
  }, [id, dispatch, auth?.user?.id]);

  const handleRowClick = (requestId) => {
    navigate(`/request/${requestId}`);
  };

  const [anchorEl, setAnchorEl] = React.useState(null);
  const openCard = Boolean(anchorEl);

  const handleDeleteRequest = (event, requestId) => {
    event.stopPropagation(); // Prevent the row click event from triggering
    console.log("Request has been deleted", requestId);
    handleClickOpenDialog(event, requestId);

    // Dispatch the action to delete the request
    // dispatch(deleteRequestById(requestId)); // Uncomment and define this action
  };

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

  return (
    <div className="text-white">
      <section className={"z-50 flex items-center sticky top-0  bg-gray-950"}>
        <KeyboardBackspaceIcon
          className="cursor-pointer"
          onClick={handleBack}
        />
        <h1 className="py-5 text-xl font-bold opacity-90 ml-5 ">
          Your requests
        </h1>
      </section>

      <table className="w-full my-10 rounded-s">
        <thead className="bg-cyan-500">
          <tr>
            <th className="px-5 py-3 border-b-2 border-gray-200 bg-slate-900 text-left text-xs font-semibold text-white uppercase tracking-wider">
              Request
            </th>
            <th className="px-5 py-3 border-b-2 border-gray-200 bg-slate-900 text-left text-xs font-semibold text-white uppercase tracking-wider">
              Created At
            </th>
            <th className="px-5 py-3 border-b-2 border-gray-200 bg-slate-900 text-left text-xs font-semibold text-white uppercase tracking-wider">
              Status
            </th>
            <th className="px-5 py-3 border-b-2 border-gray-200 bg-slate-900 text-left text-xs font-semibold text-white uppercase tracking-wider"></th>
          </tr>
        </thead>
        <tbody>
          {request.requests
          .filter((req) => req.closed)
          .map((req) => (
            <tr
              key={req.id}
              onClick={() => handleRowClick(req.id)}
              className="cursor-pointer z-10"
            >
              <td className="px-5 py-5 border-b border-gray-200 bg-slate-800 text-sm">
                <div className="flex items-center">
                  <div className="flex-shrink-0 w-10 h-10">
                    <img
                      className="w-full h-full rounded-full"
                      src={req.image || "https://via.placeholder.com/40"}
                      alt="Request"
                    />
                  </div>
                  <div className="ml-3 w-full">
                    <p
                      className="w-full break-words whitespace-normal"
                      style={{ maxWidth: "300px" }}
                    >
                      {req.content}
                    </p>
                  </div>
                </div>
              </td>

              <td className="px-5 py-5 border-b border-gray-200 bg-slate-800 text-sm">
                <p className=" whitespace-no-wrap">
                  {format(new Date(req.createdAt), "EEE, d LLL yyyy")}
                </p>
              </td>
              <td className="px-5 py-5 border-b border-gray-200 bg-slate-800 text-sm">
                <span
                  className={`relative inline-block px-3 py-1 font-semibold leading-tight ${
                    !req.closed ? "text-green-900" : "text-red-900"
                  }`}
                >
                  <span
                    aria-hidden
                    className={`absolute inset-0 ${
                      !req.closed
                        ? "bg-green-200 opacity-50"
                        : "bg-red-200 opacity-50"
                    } rounded-full`}
                  ></span>
                  <span className="relative">
                    {!req.closed ? "Active" : "closed"}
                  </span>
                </span>
              </td>
              <td className="px-5 py-5 border-b border-gray-200 bg-slate-800 text-sm">
                <div className="z-40">
                  <Button
                    id="basic-button"
                    aria-controls={openCard ? "basic-menu" : undefined}
                    aria-haspopup="true"
                    aria-expanded={openCard ? "true" : undefined}
                    onClick={(event) => handleDeleteRequest(event, req.id)}
                    sx={{
                      color: "#7c3aed",
                      // Change the text color of the button
                    }}
                  >
                    <DeleteOutlineIcon />
                  </Button>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <Dialog
        open={openDialog}
        onClose={handleCloseDialog}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">{"Delete Request"}</DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            Are you sure you want to delete this request? This action cannot be
            undone.
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
  {   request.requests
          .filter((req) => req.closed)
          .map((req) =>( <section className="">
  <div class="container">
    <div class=" text-center flex flex-col">
      <div className="flex flex-row justify-between">
      <div class="flex items-center p-4">
        <img
          class="object-cover w-32 h-32 rounded-lg"
          src={req?.image}
          alt=""
        />
        </div>
      <div class="inline-block  my-auto">
        <svg width="54" height="54" viewbox="0 0 54 54" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M26.9999 0.333374C12.3066 0.333374 0.333252 12.3067 0.333252 27C0.333252 41.6934 12.3066 53.6667 26.9999 53.6667C41.6933 53.6667 53.6666 41.6934 53.6666 27C53.6666 12.3067 41.6933 0.333374 26.9999 0.333374ZM39.7466 20.8667L24.6266 35.9867C24.2532 36.36 23.7466 36.5734 23.2133 36.5734C22.6799 36.5734 22.1733 36.36 21.7999 35.9867L14.2533 28.44C13.4799 27.6667 13.4799 26.3867 14.2533 25.6134C15.0266 24.84 16.3066 24.84 17.0799 25.6134L23.2133 31.7467L36.9199 18.04C37.6933 17.2667 38.9733 17.2667 39.7466 18.04C40.5199 18.8134 40.5199 20.0667 39.7466 20.8667Z" fill="#AFFF0F"></path>
        </svg>
      </div>
      <div class="flex flex-col items-center p-4">
        <img
          class="object-cover w-32 h-32 rounded-lg"
          src={req?.closedBy?.image}
          alt=""
        />
        {req?.closedBy?.fullName}
        </div>
      </div>
   
      <span class="block z-30 -mt-8 mb-4  text-[1.4rem]  text-purple-700 ">Closed</span>
      <a class="group relative inline-block h-12 w-full xs:w-60 bg-blueGray-900 rounded-md" href="k">
        <div class="absolute top-0 left-0 transform -translate-y-1 -translate-x-1 w-full h-full transition duration-300">
          <div class="flex h-full w-1/2 mx-auto items-center justify-center bg-purple-700 border-2 border-black rounded-md">
            <span class="text-base font-black text-black">Continue to your request</span>
          </div>
        </div>
      </a>
    </div>
  </div>
</section>))}
    </div>

  );
};
export default MyRequests;
