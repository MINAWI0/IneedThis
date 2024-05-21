import React from "react";
import logo from "../../recources/valorant.svg";
import avatar from "../../recources/avatar.png";
import { navigationMenu } from "./NavigationMenu";
import { navigationMenuSeller } from "./NavigationMenuSeller";
import { useNavigate } from "react-router-dom";
import Button from "@mui/material/Button";
import AddCircleOutlineIcon from "@mui/icons-material/AddCircleOutline";
import Avatar from "@mui/material/Avatar";
import MoreHorizIcon from "@mui/icons-material/MoreHoriz";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import { useDispatch, useSelector } from 'react-redux';
import { logoutUser } from "../../Store/Auth/Action";
// :::::::::::::::::::::::::::::::::::::::::::::::::::
const Navigation = () => {
  const [anchorEl, setAnchorEl] = React.useState(null);
  const auth = useSelector(store => store.auth)
  const dispatch  = useDispatch();
  console.log(auth.user?.fullName)
  const open = Boolean(anchorEl);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleLogout = () => {
    console.log("logOut");
    dispatch(logoutUser())
    handleClose();
  };
  const navigate = useNavigate();
  return (
    <div className="max-h-screen sticky top-0 ">
      <div className="py-5">
        <img src={logo} alt="image1" height="60px" width="60px" />
      </div>
      {(auth?.user?.seller) ? (<div className="space-y-3">
        {navigationMenuSeller.map((item) => (
          <div
            className="cursor-pointer flex space-x-3 items-center"
            onClick={() =>
              item.title === "Profile"
                ? navigate(`/profile/${auth?.user.id}`)
                : navigate(item.path)
            }
          >
            {item.icon}
            <p className="text-xl">{item.title}</p>
          </div>
        ))}
      </div>) : (<div className="space-y-3">
        {navigationMenu.map((item) => (
          <div
            className="cursor-pointer flex space-x-3 items-center"
            onClick={() =>
              item.title === "Profile"
                ? navigate(`/profile/${auth?.user.id}`)
                : navigate(item.path)
            }
          >
            {item.icon}
            <p className="text-xl">{item.title}</p>
          </div>
        ))}
      </div>)}
      
      <div className="py-5">
       
      </div>
      <div className="flex  items-center justify-between">
        <div className="flex items-center space-x-3">
        <Avatar alt="username" src={auth.user?.image} />
          <div className="flex-col items-center " >
            <div>{auth.user?.fullName}</div>
            {auth.user.seller?(<div>Seller</div>):(<div>Buyer</div>)}
          </div>
  

          <Button
            id="basic-button"
            aria-controls={open ? "basic-menu" : undefined}
            aria-haspopup="true"
            aria-expanded={open ? "true" : undefined}
            onClick={handleClick}
            sx={{
                color: "#7c3aed ", // Change the text color of the button
            }}

          >
            <MoreHorizIcon />
          </Button>
          <Menu
            id="basic-menu"
            anchorEl={anchorEl}
            open={open}
            onClose={handleClose}
            MenuListProps={{
              "aria-labelledby": "basic-button",
            }}
            
          >
            <MenuItem onClick={handleLogout}>Logout</MenuItem>
          </Menu>
        </div>
      </div>
    </div>
  );
};
export default Navigation;
