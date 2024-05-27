import React from "react";
import { Grid } from "@mui/material";
import Navigation from "../Navigation/Navigation";
import HomeSection from "../HomeSection/HomeSection";
import RightPart from "../RightPart/RightPart";
import Profile from "../Profil/Profile";
import RequestDetails from "../RequestDetails/RequestDetails"
import { Routes, Route } from 'react-router-dom';
import MyRequests from "../MyRequests/MyRequests";
import Message from "../Message/Messages";


const HomePage = () => {
  return (
    <Grid container xs={12} className="px-5 min-h-screen lg:px-28 justify-between bg-gray-950 text-white">
      <Grid item xs={0} lg={3} className="lg:block w-full relative">
        <Navigation />
      </Grid>
      <Grid item xs={12} lg={9} className="px-5 lg:block w-full relative">
        <Routes>
            <Route path="/" element={<HomeSection/>}></Route>
            <Route path="/home" element={<HomeSection/>}></Route>
            <Route path="/Profile/:id" element={<Profile/>}></Route>
            <Route path="/Request/:id" element={<RequestDetails/>}></Route>
            <Route path="/messages" element={<Message/>}></Route>
            <Route path="/Requests"  element={<MyRequests/>}></Route>
            
            
        </Routes>
      </Grid>
      {/* <Grid item xs={0} lg={2} className="lg:block w-full relative pl-4">
        <RightPart />
      </Grid> */}
    </Grid>
  );
};
export default HomePage;
