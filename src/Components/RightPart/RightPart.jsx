import React from "react";
import SearchIcon from "@mui/icons-material/Search";
import Brightness4Icon from "@mui/icons-material/Brightness4";
import { Button } from "@mui/material";

const RightPart = () => {
  const handelChangetheme = () => {
    console.log("change theme");
  };
  return (
    <div className="max-h-screen sticky top-0 py-6">
      <div className="sticky flex items-center">
        <input
          type="text"
          className="py-3 rounded-s bg-transparent w-full pl-12 "
        />
        <div className="absolute top-0 left-0 pl-3 pt-3">
          <SearchIcon className="text-[#7c3aed]" />
        </div>
      </div>
      <section className="my-5 py-8">
        <h1 className="text-xl font-bold ">Your message</h1>
        <h1 className="my-2 font-bold ">Get in youche width your seller</h1>
        {/* <Button

          variant="contained"
          sx={{ padding: "10px", paddingX: "20px", borderRadius: "25px",
          bgcolor: "#7c3aed",
          '&:hover': {
            bgcolor: "#7c3Aed" // Maintain the same background color on hover
        }
        }}

        >
          Get in touche
        </Button> */}
     
      </section>
    </div>
  );
};
export default RightPart;
