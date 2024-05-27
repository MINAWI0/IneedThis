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
import ProModel from "./ProModel";
import { useDispatch, useSelector } from "react-redux";
import { findUserById } from "../../Store/Auth/Action";
import { getUsersRequests } from "../../Store/Request/Action";
import StoreIcon from '@mui/icons-material/Store';
// import Modal from "@mui/material/Modal";




const Profile = () => {
  const [openProfileModel,setOpenProfileModel] = useState(false)
  const [openProModel,setOpenProModel] = useState(false)
  const handelEdit = () => setOpenProfileModel(true);
  const handleClose = () => setOpenProfileModel(false);
  const handelEditPro = () => setOpenProModel(true);
  const handleClosePro = () => setOpenProModel(false);
  

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
    console.log("the id of profile user" ,  id)
  },[id], dispatch)



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
      <section className="relative">
      <div className="absolute bottom-2 right-2">
      <ul class="flex justify-center mt-5 space-x-5">
    <li>
        <a href={auth?.finduser?.facebook} target="_blank" rel="noopener noreferrer" class="text-gray-950 hover:text-gray-900 dark:hover:text-white dark:text-gray-400">
            <svg class="w-10 h-10" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                <path fill-rule="evenodd"
                    d="M22 12c0-5.523-4.477-10-10-10S2 6.477 2 12c0 4.991 3.657 9.128 8.438 9.878v-6.987h-2.54V12h2.54V9.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562V12h2.773l-.443 2.89h-2.33v6.988C18.343 21.128 22 16.991 22 12z"
                    clip-rule="evenodd"></path>
            </svg>
        </a>
    </li>

    <li>
        <a href={auth?.finduser?.twitter} target="_blank" rel="noopener noreferrer" class="text-gray-950 hover:text-gray-900 dark:hover:text-white dark:text-gray-400">
            <svg class="w-10 h-10" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                <path
                    d="M8.29 20.251c7.547 0 11.675-6.253 11.675-11.675 0-.178 0-.355-.012-.53A8.348 8.348 0 0022 5.92a8.19 8.19 0 01-2.357.646 4.118 4.118 0 001.804-2.27 8.224 8.224 0 01-2.605.996 4.107 4.107 0 00-6.993 3.743 11.65 11.65 0 01-8.457-4.287 4.106 4.106 0 001.27 5.477A4.072 4.072 0 012.8 9.713v.052a4.105 4.105 0 003.292 4.022 4.095 4.095 0 01-1.853.07 4.108 4.108 0 003.834 2.85A8.233 8.233 0 012 18.407a11.616 11.616 0 006.29 1.84">
                </path>
            </svg>
        </a>
    </li>
 
</ul>
      </div>
        <img
          className="w-[100%] h-[15rem] object-cover"
          src={"https://i.ibb.co/FWggPq1/banner.png"}
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
          <div className="flex flex-col space-y-2">
       {auth?.finduser?.id === auth?.user?.id   ?(
    <Button
      className="rounded-full"
      variant="contained"
      sx={{ borderRadius: "20px", backgroundColor: "#7c3aed", '&:hover': { bgcolor: "#3e1d76" } }}
      onClick={handelEdit}
    >
      edit Profile
    </Button>
  ) : null}
       {auth?.finduser?.id === auth?.user?.id && auth?.user?.seller   ?(
    <Button
      className="rounded-full"
      variant="contained"
      sx={{ borderRadius: "20px", backgroundColor: "red", '&:hover': { bgcolor: "#3e1d76" } }}
      onClick={handelEditPro}
    >
      edit Seller Profile
    </Button>
  ) : null}
  </div>

        </div>
        <div className="-mt-5">
          <div className="flex items-center space-x-5">
            <h1 className="font-bold text-lg">{auth?.finduser?.fullName} </h1>
  
            {auth?.finduser?.seller && auth?.finduser?.companyName ? (
  <a href={auth?.finduser?.instagram} target="_blank" rel="noopener noreferrer">
    <div className="text-purple-700 bg-slate-800 py-2 px-2 rounded-[4px]">
      {auth?.finduser?.companyName} <StoreIcon />
    </div>
  </a>
) : null}
          </div>
        </div>
        <div className="mt-2 space-y-3">
            <p>{auth?.finduser?.bio} .</p>
            <div className="py-1 flex space-x-5">
            {/* <div className="flex items-center text-gray-500">
                <FaceRetouchingNaturalIcon/>
                <p className="ml-2">lorem</p>
            </div>
            <div className="flex items-center text-gray-500">
                <InterestsIcon/>
                <p className="ml-2">lorem</p>
            </div> */}
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

      { !auth?.finduser?.seller && <section className="pl-3 mt-5">
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
      </section>}
      <section>
        <ProfileModel handleClose={handleClose} open={openProfileModel}/>
        <ProModel handleClose={handleClosePro} open={openProModel}/>
      </section>
    </div>
  );
};
export default Profile;
