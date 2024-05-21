import React, { useState, useEffect } from "react";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Modal from "@mui/material/Modal";
import CloudDownloadIcon from "@mui/icons-material/CloudDownload";
import RestartAltIcon from "@mui/icons-material/RestartAlt";
import HighlightOffIcon from "@mui/icons-material/HighlightOff";
import * as Yup from "yup";

import {
  FormControl,
  InputAdornment,
  InputLabel,
  OutlinedInput,
  TextField,
} from "@mui/material";
import { useFormik } from "formik";
import { useDispatch } from "react-redux";
import { createOffre } from "../../Store/Request/Action";
import { uploadtoCloud } from "../CloudAPi/UploadToCloud";
import { useNavigate } from "react-router-dom";
import MapComponent from "./MapComponent";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 1200,
  bgcolor: "#111827",
  border: "none",
  boxShadow: 24,
  p: 4,
  outline: "none",
  borderRadius: "4px",
};

export default function ResponseModel({ handleClose, open, item }) {
  console.log("rak hna ", item?.id)
  const validationSchema = Yup.object().shape({
    content: Yup.string().required('Content is required'),
    image: Yup.string().required('Image for a product is required'),
    price: Yup.number().required('Price is required'),
    link: Yup.string().url('Invalid URL').required('Link is required'),
    title: Yup.string().required('Title is required'),
    latitude: Yup.number().required('Latitude is required').nullable(),
    longitude: Yup.number().required('Longitude is required').nullable(),
  });

  const handleSubmit = (values) => {
    handleClose();
    dispatch(createOffre(values));
    console.log("handel Response", values);
  };
  const [uploadingImage, setUploadingImage] = useState(false);
  const [selectImage, setSelectedImage] = useState("");
  const [latitude, setLatitude] = useState(null);
const [longitude, setLongitude] = useState(null);


  const dispatch = useDispatch();
  const navigate = useNavigate();
  const formik = useFormik({
    initialValues: {
      content: "",
      image: "",
      price: null,
      link : "",
      title :"",
      latitude: null,
      longitude: null,
      requestId: item?.id,
      requestType: false,
    },
    onSubmit: handleSubmit,
    validationSchema,
  });

  const handleSelectImage = async (event) => {
    setUploadingImage(true);
    const imgUrl = await uploadtoCloud(event.target.files[0]);
    formik.setFieldValue("image", imgUrl);
    setSelectedImage(imgUrl);
    setUploadingImage(false);
  };
  useEffect(() => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(handleSuccess, handleError, {
        enableHighAccuracy: true,
      });
    } else {
      console.log("Geolocation is not supported by your browser");
    }
  }, []);
  const handleSuccess = (position) => {
    const { latitude, longitude } = position.coords;
    setLatitude(latitude);
    setLongitude(longitude);
    formik.setFieldValue("latitude", latitude);
    formik.setFieldValue("longitude", longitude);
    console.log("Latitude:", latitude, "Longitude:", longitude);
  };
  
  const handleError = (error) => {
    console.error("Error retrieving location:", error.message);
  };
  



 

  return (
    <div>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
        className="bg-opacity-70 bg-black"
      >
        <Box sx={style}>
          <form onSubmit={formik.handleSubmit} className="h-full">
            <div className="grid sm:px-10 lg:grid-cols-2">
              <div className="px-4">
              <div className="container mx-auto">
      <div className="card  rounded-lg shadow w-full">
        <div className="flex">
          <div className="border-2 border-solid border-purple-950 bg-slate-950 rounded">
            <img src={item?.image} alt="Card " className="w-24 h-24 " />
          </div>
          <div className="card-description ml-5 bg-slate-950 w-3/4 px-2 bg-opacity-45 rounded">
            <h3 className="text-2xl font-bold mb-1 text-gray-50">request summary</h3>
            <p className="text-gray-100">{item?.content}</p>
          </div>
        </div>
      </div>
    </div>
                <div className="mt-5 grid gap-6">
                  <div className="flex  justify-start w-full">
                    <div className="flex flex-row justify-start mt-4">
                      <label className="flex flex-col items-center justify-start w-64 h-64 border-[1px] border-[#7c3aed] rounded-s cursor-pointer p-3">
                        <div className="flex flex-col items-center justify-center pt-5 pb-6 relative w-full h-full">
                          {!uploadingImage ? (
                            <CloudDownloadIcon className="text-[#7c3aed]" />
                          ) : null}
                          {uploadingImage ? (
                            <RestartAltIcon className="text-[#7c3aed] animate-spin" />
                          ) : (
                            <img
                              src={selectImage}
                              alt=""
                              className="w-3/4 rounded-sm mt-4 absolute"
                            />
                          )}
                          <input
                            type="file"
                            name="image file"
                            className="hidden"
                            onChange={handleSelectImage}
                          />
                          {!uploadingImage ? (
                            <p className="mb-2 text-sm text-[#7c3aed]">
                              <span className="font-semibold">
                                Click to upload
                              </span>
                            </p>
                          ) : null}
                        </div>
                        {formik.touched.image && formik.errors.image && <div className="text-red-500">{formik.errors.image}</div>}
                      </label>
                      
                    </div>
                  </div>
                </div>
              </div>
              <div className="mt-10 px-4  lg:mt-0">
                <p className="text-xl font-medium mb-6 text-white">Offer Details</p>
                <div className="space-y-5">
                <div className="relative mb-2">
                    <TextField
                      id="outlined-basic"
                      label="Add title to your product"
                      variant="outlined"
                      name="title"
                      type="text"
                      style={{ width: "100%" }}
                      {...formik.getFieldProps("title")}
                      InputLabelProps={{
                        style: { color: "#fff" }, // Style for label
                      }}
                      sx={{
                        '& .MuiOutlinedInput-root': {
                          '& fieldset': {
                            borderColor: '#fff', // normal state
                          },
                          '&:hover fieldset': {
                            borderColor: '#fff', // hover state
                          },
                          '&.Mui-focused fieldset': {
                            borderColor: '#fff', // focused state
                          },
                        },
                      }}
                      InputProps={{
                        style: {
                          borderColor: '#fff', // border color
                          color: '#fff', // input text color
                        },
                        classes: {
                          notchedOutline: 'custom-outline', // custom class for the outline
                        },
                      }}
                    />
                          {formik.touched.title && formik.errors.title && <div className="text-red-500">{formik.errors.title}</div>}

                  </div>
                  <div className="relative mb-2">
                    <TextField
                      id="outlined-basic"
                      label="add discription"
                      variant="outlined"
                      name="content"
                      type="text"
                      multiline
                      rows={3}
                      style={{ width: "100%" }}
                      {...formik.getFieldProps("content")}
                      InputLabelProps={{
                        style: { color: "#fff" }, // Style for label
                      }}
                      sx={{
                        '& .MuiOutlinedInput-root': {
                          '& fieldset': {
                            borderColor: '#fff', // normal state
                          },
                          '&:hover fieldset': {
                            borderColor: '#fff', // hover state
                          },
                          '&.Mui-focused fieldset': {
                            borderColor: '#fff', // focused state
                          },
                        },
                      }}
                      InputProps={{
                        style: {
                          borderColor: '#fff', // border color
                          color: '#fff', // input text color
                        },
                        classes: {
                          notchedOutline: 'custom-outline', // custom class for the outline
                        },
                      }}
                    />
                          {formik.touched.content && formik.errors.content && <div className="text-red-500">{formik.errors.content}</div>}

                  </div>
                  <div className="relative mb-2">
                    <TextField
                      id="outlined-basic"
                      label="add external link to your product"
                      variant="outlined"
                      name="link"
                      type="text"
                      style={{ width: "100%"}}
                      InputProps={{
                        style: {
                          borderColor: '#fff', // border color
                          color: '#fff', // input text color
                        },
                        classes: {
                          notchedOutline: 'custom-outline', // custom class for the outline
                        },
                      }}
                      InputLabelProps={{
                        style: { color: "#fff" }, // Style for label
                      }}
                      sx={{
                        '& .MuiOutlinedInput-root': {
                          '& fieldset': {
                            borderColor: '#fff', // normal state
                          },
                          '&:hover fieldset': {
                            borderColor: '#fff', // hover state
                          },
                          '&.Mui-focused fieldset': {
                            borderColor: '#fff', // focused state
                          },
                        },
                      }}
                      {...formik.getFieldProps("link")}
                    />
                    {formik.touched.link && formik.errors.link && <div className="text-red-500">{formik.errors.link}</div>}

                  </div>

                  {/* :::::::::::::: */}
                  <div className="felx flex-row">
                  <div className="relative mb-2 w-1/3">
                    <FormControl fullWidth 
                    
                    sx={{
                      '& .MuiOutlinedInput-root': {
                        '& fieldset': {
                          borderColor: '#fff', // Normal state
                        },
                        '&:hover fieldset': {
                          borderColor: '#fff', // Hover state
                        },
                        '&.Mui-focused fieldset': {
                          borderColor: '#fff', // Focused state
                        },
                        '& input': {
                          color: '#fff', // Text color when typing
                        }
                      },
                      '& .MuiInputLabel-root': {
                        color: '#fff', // Normal label color
                      },
                      '& .MuiInputLabel-root.Mui-focused': {
                        color: '#fff', // Focused label color
                      }
                    }}>
                      <InputLabel htmlFor="outlined-adornment-amount">
                        price
                      </InputLabel>
                      <OutlinedInput
                        id="outlined-adornment-amount"
                        startAdornment={
                          <InputAdornment position="start"><span className="text-white">$</span></InputAdornment>
                        }
                        label="price"
                        name="price"
                        type="number"
                        {...formik.getFieldProps("price")}
                        
                      />
                    </FormControl>
                  </div>
                  </div>
                </div>
                <Button
                  sx={{
                    width: "100%",
                    borderRadius: "3px",
                    py: "5px",
                    bgcolor: "#7c3aed",
                    mt:"1rem"
                  }}
                  variant="contained"
                  type="submit"
                >
                  Provide
                </Button>
              </div>
            </div>
          </form>
          {/* location */}
                  {/* type her the location you retrive */}
                  <div>
  <p className="text-red-600">Latitude: {latitude}</p>
  <p className="text-red-600">Longitude: {longitude}</p>
</div>
    {/* end */}
        </Box>
      </Modal>
    </div>
  );
}

// import * as React from 'react';
// import  { useState } from "react";
// import Box from '@mui/material/Box';
// import Button from '@mui/material/Button';
// import Modal from '@mui/material/Modal';
// import { Avatar, colors } from '@mui/material';
// import VerifiedIcon from "@mui/icons-material/Verified";
// import AvatarImg from "../../recources/avatar.png"
// import { useNavigate } from 'react-router-dom';
// import { useFormik } from "formik";
// import AddPhotoAlternateIcon from "@mui/icons-material/AddPhotoAlternate";
// import AddLinkIcon from "@mui/icons-material/AddLink";
// import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';
// import avatar from "../../recources/avatar.png";
// import { useDispatch } from 'react-redux';
// import { createOffre } from '../../Store/Request/Action';
// import CloudDownloadIcon from "@mui/icons-material/CloudDownload";
// import RestartAltIcon from "@mui/icons-material/RestartAlt";
// import { uploadtoCloud } from '../CloudAPi/UploadToCloud';

// const style = {
//   position: 'absolute',
//   top: '50%',
//   left: '50%',
//   transform: 'translate(-50%, -50%)',
//   width: 600,
//   bgcolor: '#111827',
//   border: 'none',
//   boxShadow: 24,
//   p: 4,
//   outline:"none",
//   borderRadius: "4px",
// };

// export default function ResponseModel({handleClose,open , item}) {
//   const handleSubmit = (values) =>{
//     handleClose();
//     dispatch(createOffre(values))
//     console.log("handel Response",  values)
//   }
//   const [uploadingImage, setUploadingImage] = useState(false);
//   const [selectImage, setSelectedImage] = useState("");

//   const dispatch = useDispatch();

//   const navigate = useNavigate();
//   const formik = useFormik({
//     initialValues:{
//         content:"",
//         image :"",
//         price:0,
//         requestId:item?.id,
//         requestType : false

//     },
//     onSubmit : handleSubmit
//   })

//   const handleSelectImage = async (event) => {
//     setUploadingImage(true);
//     const imgUrl = await uploadtoCloud(event.target.files[0]);
//     formik.setFieldValue("image", imgUrl);
//     setSelectedImage(imgUrl);
//     setUploadingImage(false);
//   };

//   return (
//     <div>
//       <Modal
//         open={open}
//         onClose={handleClose}
//         aria-labelledby="modal-modal-title"
//         aria-describedby="modal-modal-description"
//         className='bg-opacity-70 bg-black'

//       >
//         <Box sx={style} >
//         <div className="flex space-x-5 ">
//         <Avatar
//           onClick={() => navigate(`/profile/${6}`)}
//           className="cursor-pointer"
//           alt="me"
//           src={AvatarImg}
//         />
//         <div className="w-full">
//           <div className="flex justify-between items-center">
//             <div className="flex cursor-pointer items-center space-x-2">
//               <span className="font-semibold">Minaoui Mohamed</span>
//               <span className="text-gray-600">Made a request .30m ago</span>
//               <VerifiedIcon className="ml-2 w-2 h-2 text-[#7c3aed]" />
//             </div>

//           </div>
//           <div  onClick={() =>navigate(`/Request/${3}`)} className="cursor-pointer">
//             <p className="mb-6 p-0">need this phone in red color</p>
//           </div>

//         </div>

//       </div>
//       <section className={"py-10"}>
//         <div className={"flex space-x-5"}>
//           <Avatar alt="username" src={avatar} />
//           <div className="w-full">
//             <form onSubmit={formik.handleSubmit}>
//               <div>
//                 <input
//                   type="text"
//                   name="content"
//                   placeholder="Provide for Minaoui's Request"
//                   className={" w-full border-none outline-none text-xl bg-transparent"}
//                   {...formik.getFieldProps("content")}
//                 />
//                 {formik.errors.content && formik.touched.content && (
//                   <span className={"text-red-500"}>
//                     {formik.errors.content}
//                   </span>
//                 )}
//                  <input
//                   type="number"
//                   name="price"
//                   placeholder="Provide for Minaoui's Request"
//                   className={" w-full border-none outline-none text-xl bg-transparent"}
//                   {...formik.getFieldProps("price")}
//                 />
//                 <div className="flex justify-between items-center mt-5">
//                   <div>
//                   <div className="flex items-center justify-center w-full ">
// <label className="flex flex-col items-center justify-center w-full h-64 border-[1px] border-[#7c3aed] rounded-s cursor-pointer p-3">
//   <div className="flex flex-col items-center justify-center pt-5 pb-6 relative w-full h-full">
//     {!uploadingImage ? (
//       <CloudDownloadIcon className="text-[#7c3aed]" />
//     ) : null}
//     {uploadingImage ? (
//       <RestartAltIcon className="text-[#7c3aed] animate-spin" />
//     ) : (
//       <img
//         src={selectImage}
//         alt=""
//         className="w-3/4 rounded-sm mt-4 absolute"
//       />
//     )}
//     <input
//       type="file"
//       name="image file"
//       className="hidden"
//       onChange={handleSelectImage}
//     />
//     {!uploadingImage ? (
//       <p className="mb-2 text-sm text-[#7c3aed]">
//         <span className="font-semibold">
//           Click to upload
//         </span>
//       </p>
//     ) : null}
//   </div>
// </label>
// </div>
// <Button
//   sx={{
//     width: "100%",
//     borderRadius: "3px",
//     py: "5px",
//     bgcolor: "#7c3aed",
//   }}
//   variant="contained"
//   endIcon={<AddCircleOutlineIcon />}
//   type="submit"
// >
//   Provide
// </Button>
//                   </div>
//                 </div>
//               </div>
//             </form>
//           </div>
//         </div>
//       </section>
//         </Box>
//       </Modal>
//     </div>
//   );
// }
