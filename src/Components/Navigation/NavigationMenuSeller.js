import HomeIcon from "@mui/icons-material/Home"
import ExpoloreIcon from "@mui/icons-material/Explore"
import NotificationsIcon from '@mui/icons-material/Notifications';
import MessageIcon from '@mui/icons-material/Message';
import ListAltIcon from '@mui/icons-material/ListAlt';
import GroupIcon from '@mui/icons-material/Group';
import VerifiedIcon from '@mui/icons-material/Verified';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import PendingIcon from '@mui/icons-material/Pending';
import { useSelector } from "react-redux";



export const navigationMenuSeller = [
    {
        title:"Home",
        icon : <HomeIcon/>,
        path : "/home"
    },
    {
        title:"Notifications",
        icon : <NotificationsIcon/>,
        path : "/notifications"
    },
    {
        title:"Messages",
        icon : <MessageIcon/>,
        path : "/messages"
    },
    {
        title:"Your Offre",
        icon : <ListAltIcon/>,
        path : "/lists"
    },
    {
        title:"liked Requests",
        icon : <ListAltIcon/>,
        path : "/lists"
    },
    {
        title:"Pending Requests",
        icon : <ListAltIcon/>,
        path : "/lists"
    },
    {
        title:"Transaction",
        icon : <GroupIcon/>,
        path : "/transaction"
    },
    {
        title:"Profile",
        icon : <AccountCircleIcon/>,
        path : "/profile"
    }
]