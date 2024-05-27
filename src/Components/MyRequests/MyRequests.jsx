import React, { useEffect, useState } from "react";
import KeyboardBackspaceIcon from "@mui/icons-material/KeyboardBackspace";
import { useNavigate, useParams } from "react-router-dom";
import RequestCard from "../HomeSection/RequestCard";
import Response from "../HomeSection/Response";
import Divider from "@mui/material/Divider";
import { useDispatch, useSelector } from "react-redux";
import { findRequestById, getUsersRequests } from "../../Store/Request/Action";
import { findUserById } from "../../Store/Auth/Action";
import { format } from "date-fns";
import { Button, Menu, MenuItem } from "@mui/material";
import DeleteOutlineIcon from '@mui/icons-material/DeleteOutline';
import MoreHorizIcon from "@mui/icons-material/MoreHoriz";


const MyRequests = () => {
  const navigate = useNavigate();
  const handleBack = () => navigate(-1);
  const { auth, request } = useSelector((store) => store);
  console.log("hhhhhhhhhhhhhhhhhhhhhhh", auth);
  console.log("hannnnii", auth?.finduser?.id);

  const dispatch = useDispatch();
  const { id } = useParams();

  useEffect(() => {
    dispatch(findUserById(id));
    dispatch(getUsersRequests(auth?.user?.id));
    console.log("the id of profile user", id);
  }, [id, dispatch, auth?.user?.id]);

  const handleRowClick = (requestId) => {
    navigate(`/request/${requestId}`);
  };
  const [anchorEl, setAnchorEl] = React.useState(null);
  const openCard = Boolean(anchorEl);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleDeleteRequest = (event, requestId) => {
    event.stopPropagation(); // Prevent the row click event from triggering
    console.log("Request has been deleted", requestId);
    // Dispatch the action to delete the request
    // dispatch(deleteRequestById(requestId)); // Uncomment and define this action
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
          {request.requests.map((req) => (
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
                  <div className="ml-3">
                    <p className=" whitespace-no-wrap">{req.content}</p>
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
                    <DeleteOutlineIcon/>
                  </Button>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};
export default MyRequests;
