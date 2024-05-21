import React, { useEffect, useState } from "react";
import KeyboardBackspaceIcon from "@mui/icons-material/KeyboardBackspace";
import { useNavigate, useParams } from "react-router-dom";
import cover from "../../recources/istockphoto-1311966784-1024x1024.jpg";
import Avatar from "@mui/material/Avatar";
import profilePic from "../../recources/avatar.png";
import Button from "@mui/material/Button";
import FaceRetouchingNaturalIcon from '@mui/icons-material/FaceRetouchingNatural';
import InterestsIcon from '@mui/icons-material/Interests';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import VerifiedIcon from "@mui/icons-material/Verified";
import Tab from '@mui/material/Tab';
import Box from '@mui/material/Box';
import TabContext from '@mui/lab/TabContext';
import TabPanel from '@mui/lab/TabPanel';
import TabList from '@mui/lab/TabList';
import RequestCard from "../HomeSection/RequestCard";
import ProfileModel from "./ProfileModel";
import { useDispatch, useSelector } from "react-redux";
import { findUserById } from "../../Store/Auth/Action";
import { getUsersRequests } from "../../Store/Request/Action";
// import Modal from "@mui/material/Modal";




const Profile = () => {
  const [openProfileModel,setOpenProfileModel] = useState(false)
  const handelEdit = () => setOpenProfileModel(true);
  const handleClose = () => setOpenProfileModel(false);
  const navigate = useNavigate();
  const handleBack = () => navigate(-1);
  const {auth, request} = useSelector((store) => store);
  console.log("hhhhhhhhhhhhhhhhhhhhhhh",auth)
  console.log("hannnnii",auth?.finduser?.requser)
  
  const dispatch = useDispatch();
  const {id} = useParams();

  useEffect(()=>{
    dispatch(findUserById(id))
    dispatch(getUsersRequests(id))
  },[id])


  const handelFollow = () => {
    console.log("follow profile");
  };
  const [tableValue , setTableValue] = useState("1");
 const handleTabChange = (event, newValue) =>{
    setTableValue(newValue) 
    if(newValue === 4 ){
        console.log("tab4")
    }
    else if (newValue === 1){
        console.log("user Request")
    }

 }
  return (
    <div>
      <section className={"z-50 flex items-center sticky top-0 bg-opacity-100 bg-gray-950"}>
        <KeyboardBackspaceIcon
          className="cursor-pointer"
          onClick={handleBack}
        />
        <h1 className="py-5 text-xl font-bold opacity-90 ml-5 ">
          {console.log("profile name",auth?.finduser?.fullName)}
           {auth?.finduser?.fullName}
        </h1>
      </section>
      <section>
        <img
          className="w-[100%] h-[15rem] object-cover"
          src={cover}
          alt="cover"
        />
      </section>
      <section className="pl-6">
        <div className="flex justify-between items-start mt-5 h-[5rem]">
          <Avatar
            className=" transform -translate-y-24"
            alt="code with minaoui"
            src={auth?.finduser?.image}
            sx={{ width: "7rem", height: "7rem", border: "4px solid white" }}
          />
       {auth?.finduser?.req_user ? (
    <Button
      className="rounded-full"
      variant="contained"
      sx={{ borderRadius: "20px", backgroundColor: "#7c3aed", '&:hover': { bgcolor: "#3e1d76" } }}
      onClick={handelEdit}
    >
      Edit Profile
    </Button>
  ) : null}

        </div>
        <div className="-mt-5">
          <div className="flex items-center">
            <h1 className="font-bold text-lg">{auth?.finduser?.fullName}</h1>
          </div>
        </div>
        <div className="mt-2 space-y-3">
            <p>{auth?.finduser?.bio} .</p>
            <div className="py-1 flex space-x-5">
            <div className="flex items-center text-gray-500">
                <FaceRetouchingNaturalIcon/>
                <p className="ml-2">lorem</p>
            </div>
            <div className="flex items-center text-gray-500">
                <InterestsIcon/>
                <p className="ml-2">lorem</p>
            </div>
            <div className="flex items-center text-gray-500">
                <LocationOnIcon/>
                <p className="ml-2">{auth?.finduser?.location}</p>
            </div>
            </div>
            <div className="flex items-center space-x-5">
            <div className="flex items-center space-x-1 font-semibold">
                    <span>{auth?.finduser?.following?.length}</span>
                    <span className="text-gray-500">following</span>
                </div>
                <div className="flex items-center space-x-1 font-semibold">
                    <span>{auth?.finduser?.followers?.length}</span>
                    <span className="text-gray-500">Follower</span>
                </div>
            </div>

        </div>
      </section>
      <section className="pl-3 mt-5">
      <Box sx={{ width: '100%', typography: 'body1' }}>
      <TabContext value={tableValue}>
        <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
          <TabList onChange={handleTabChange} aria-label="lab API tabs example">
            <Tab label="Requests" value="1" />
            <Tab label="Likes" value="2" />
            <Tab label="Copies" value="3" />
            <Tab label="Transaction" value="4" />
          </TabList>
        </Box>
        <TabPanel value="1">{request.requests.map((item) => <RequestCard item={item}/>)}</TabPanel>
        <TabPanel value="2">Likes</TabPanel>
        <TabPanel value="3">Copies</TabPanel>
        <TabPanel value="4">Transaction</TabPanel>
      </TabContext>
    </Box>
      </section>
      <section>
        <ProfileModel handleClose={handleClose} open={openProfileModel}/>
      </section>
    </div>
  );
};
export default Profile;
