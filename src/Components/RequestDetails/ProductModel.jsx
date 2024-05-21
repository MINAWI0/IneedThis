import * as React from "react";
import Box from "@mui/material/Box";
import Modal from "@mui/material/Modal";
import "../Profil/ProfileModel.css";
import LaunchIcon from '@mui/icons-material/Launch';
import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Avatar,
  Badge,
  IconButton,
  Tab,
  Typography,
  styled,
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import { useState } from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import "../RequestDetails/ProductModel.css";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import { TabContext, TabList, TabPanel } from "@mui/lab";
import MapComponent from "../HomeSection/MapComponent";
import { useSelector } from "react-redux";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 1100,
  height: 600,
  border: "none",
  boxShadow: 24,
  p: 4,
  outline: "none",
  borderRadius: 1,
  overflow: "auto", // Add this line
};

export default function ProductModel({ open, handleClose , item , request}) {

  console.log( "testttiiinnnnngngnngn",request?.request);
  console.log("request hada" ,  request?.request?.user?.id)



  console.log("Modal Open Status:", open); // Debug log
  const [show, setShow] = useState(false);
  const [show2, setShow2] = useState(false);
  const [currentSlide, setCurrentSlide] = useState(0);
  const [value, setValue] = React.useState("1");
  const CustomPrevArrow = (props) => <></>;
  const CustomNextArrow = (props) => <></>;
  console.log(item , "helloooooooooo")
  const auth = useSelector((store) => store.auth);
  console.log("nta hada" ,  auth?.user?.id)


  const handleChange = (event, newValue) => {
    setValue(newValue);
  };
  const SmallAvatar = styled(Avatar)(({ theme }) => ({
    width: 22,
    height: 22,
    border: `2px solid ${theme.palette.background.paper}`,
  }));

  const settings = {
    dots: false,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    beforeChange: (oldIndex, newIndex) => setCurrentSlide(newIndex),
    prevArrow: <CustomPrevArrow />,
    nextArrow: <CustomNextArrow />,
  };


  const sliderRef = React.useRef(null);

  const handleThumbnailClick = (index) => {
    sliderRef.current.slickGoTo(index);
  };

  return (
    <div className="text-white">
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style} className="bg-slate-900 relative">
          <div className="flex items-center justify-between mb-3 sticky top-0 z-50 ">
            <div className="flex items-center space-x-3 bg-black bg-opacity-90 rounded-full ">
              <IconButton
                onClick={(event) => {
                  event && event.stopPropagation();
                  handleClose();
                }}
                aria-label="close"
              >
                <CloseIcon className="text-red-500 hover:text-red-700" />
              </IconButton>
            </div>
          </div>

          {/* :companent  */}
          <div className="flex items-start justify-center px-4 ">
            <div className="w-1/2  mr-8">
              <div className="w-full flex flex-col">
                <div className="flex justify-start flex-row mb-6">
                  <div
                    className="product-slider w-full h-full"
                  >
                    {
                      <div className="h-full">
                        <img
                          className="w-2/4 h-2/4 object-cover"
                          alt={`Product`}
                          src={item?.image}
                        />
                      </div>
                    }
                  </div>
                </div>
                <TabContext value={value}>
                  <Box sx={{ width: "100%" }}>
                    <TabList
                      onChange={handleChange}
                      aria-label="lab API tabs example"
                      sx={{
                        "& .MuiTab-root": {
                          color: "#7c3aed", // Set the text color
                        },
                        "& .MuiTabs-indicator": {
                          backgroundColor: "#7c3aed", // Set the indicator color
                        },
                      }}
                     
                    >
                      <Tab label="terms and conditions " value="1"   />

                      <Tab label="Contact information" value="2"  />
                    </TabList>
                  </Box>
                  <TabPanel value="1">terms and conditions</TabPanel>
                  <TabPanel value="2">
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                    Suspendisse malesuada lacus ex, sit amet blandit leo
                    lobortis eget.
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                    Suspendisse malesuada lacus ex, sit amet blandit leo
                    lobortis eget.
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                    Suspendisse malesuada lacus ex, sit amet blandit leo
                    lobortis eget.
                  </TabPanel>
                </TabContext>
              </div>
            </div>
            <div className="mt-6 w-1/2">
              <div className="border-b text-white border-gray-200 pb-6">
                <p className="text-sm leading-none ">Product title</p>
                <h1
                  className="
							lg:text-2xl
							text-xl
							font-semibold
							lg:leading-6
							leading-7
							mt-2
						"
                >
                  {item?.title}
                </h1>
              </div>
              <div className="py-4 border-b border-gray-200 flex items-center justify-between mb-4">
                <Accordion
                  sx={{
                    padding: 0, // Remove padding
                    boxShadow: "none",
                    bgcolor: "#1E293B",
                    width:"100%",
                    color:"#fff",
                    "&:before": {
                      display: "none",
                      padding: 0,
                    },
                    "&.Mui-expanded": {
                      margin: 0,
                    
                    },
                  }}
                >
                  <AccordionSummary
                    expandIcon={<ExpandMoreIcon sx={{ color: '#7c3aed' }}/>}
                    aria-controls="panel1-content"
                    id="panel1-header"
                  >
                    <Typography className="w-full">Product description</Typography>
                  </AccordionSummary>
                  <AccordionDetails> 
                    <p className="font-bold break-words">
                     {item?.content}
                    </p>
                  </AccordionDetails>
                </Accordion>
              </div>

              <div className="mb-4 text-white">
                <p className="text-base leading-4 mt-7">
                  Price : 33 $
                </p>
                <p className="text-base leading-4 mt-4 underline text-[#7c3aed] mb-4">
                  <a href={item?.link}>view more inforamtion about product <LaunchIcon className="text-[#7c3aed]"/> </a>
                </p>
                <div className="App">
                  <MapComponent 
                    latitude={item?.latitude} 
                    longitude={item?.longitude} 
                    latitude2={request?.request?.latitude} 
                    longitude2={request?.request?.longitude} 
                  />
              </div>
              </div>
     
            </div>
          </div>
          {(auth?.user?.id === request?.request?.user?.id) ? 
          (<div className="w-full flex px-4">
            <button
              className="
						text-base
						flex
						items-center
						justify-center
						leading-none
						text-white
						bg-slate-800
						w-1/2
                        mr-2
						py-4
						hover:bg-gray-700
					"
            >
              Start a conversation
            </button>
            <button
              className="
						
						text-base
						flex
						items-center
						justify-center
						leading-none
						text-white
						bg-slate-800
						w-1/2
						py-4
						hover:bg-gray-700
					"
            >
              Accept the offre 
            </button>
          
          </div>) : null}
        </Box>
      </Modal>
    </div>
  );
}
