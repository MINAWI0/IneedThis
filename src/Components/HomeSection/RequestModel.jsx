import React, { useState } from "react";
import Box from "@mui/material/Box";
import Modal from "@mui/material/Modal";
import MyLocationIcon from "@mui/icons-material/MyLocation";
import CheckIcon from "@mui/icons-material/Check";
import {
  Avatar,
  Button,
  FormControl,
  FormHelperText,
  Input,
  InputAdornment,
  InputLabel,
  MenuItem,
  OutlinedInput,
  Select,
  TextField,
} from "@mui/material";
import AvatarImg from "../../recources/avatar.png";
import { useSelector, useDispatch } from "react-redux";
import { createRequest } from "../../Store/Request/Action";
import CloudDownloadIcon from "@mui/icons-material/CloudDownload";
import * as Yup from "yup";
import { uploadtoCloud } from "../CloudAPi/UploadToCloud";
import { useFormik } from "formik";
import RestartAltIcon from "@mui/icons-material/RestartAlt";

const categories = [
  { value: "electronics", label: "Electronics" },
  { value: "clothing", label: "Clothing & Apparel" },
  { value: "home_kitchen", label: "Home & Kitchen" },
  { value: "health_beauty", label: "Health & Beauty" },
  { value: "sports_outdoors", label: "Sports & Outdoors" },
  { value: "toys_games", label: "Toys & Games" },
  { value: "books_literature", label: "Books & Literature" },
  { value: "automotive", label: "Automotive" },
  { value: "food_beverage", label: "Food & Beverage" },
  { value: "furniture_decor", label: "Furniture & Decor" },
  { value: "tools_hardware", label: "Tools & Hardware" },
  { value: "pet_supplies", label: "Pet Supplies" },
  { value: "office_supplies", label: "Office Supplies" },
  { value: "jewelry_accessories", label: "Jewelry & Accessories" },
  { value: "arts_crafts", label: "Arts & Crafts" },
];

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 900,
  bgcolor: "#111827",
  border: "none",
  boxShadow: 24,
  p: 4,
  height: "90vh",
  outline: "none",
  borderRadius: "4px",
};

const validationSchema = Yup.object().shape({
  content: Yup.string()
    .required("Please provide product description")
    .max(150, "Maximum character limit reached"),
  latitude: Yup.number()
    .required("Please allow location access to get your location")
    .test(
      "isValid",
      "Invalid latitude value",
      (value) => value !== null && value >= -90 && value <= 90
    ),
  longitude: Yup.number()
    .required("Please allow location access to get your location")
    .test(
      "isValid",
      "Invalid longitude value",
      (value) => value !== null && value >= -180 && value <= 180
    ),
});
// ::::::::::::::::::::::::::::::::::::
export default function RequestModel({ handleClose, open, item }) {
  const handleCloseModal = () => {
    handleClose();
    formik.resetForm(); // Reset the form values
    setSelectedImage(""); // Reset the selected image
    setChecked(false); // Reset the location checkbox
    setLatitude(null); // Reset the latitude
    setLongitude(null); // Reset the longitude
  };

  const [check, setChecked] = useState(false);

  // for category
  const [selectedCategory, setSelectedCategory] = useState("");
  const handleChange = (event) => {
    const selectedValue = event.target.value;
    setSelectedCategory(selectedValue);
    formik.setFieldValue("category", selectedValue);
  };

  // for location
  const [latitude, setLatitude] = useState(null);
  const [longitude, setLongitude] = useState(null);
  const handleButtonClick = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(handleSuccess, handleError, {
        enableHighAccuracy: true,
      });
    } else {
      console.log("Geolocation is not supported by your browser");
    }
  };
  const handleSuccess = (position) => {
    setChecked(true);
    const { latitude, longitude } = position.coords;
    setLatitude(latitude);
    setLongitude(longitude);
    formik.setFieldValue("latitude", latitude);
    formik.setFieldValue("longitude", longitude);
    console.log(latitude, longitude);
  };

  const handleError = (error) => {
    console.error("Error:", error.message);
  };

  const auth = useSelector((store) => store.auth);
  const [uploadingImage, setUploadingImage] = useState(false);
  const [selectImage, setSelectedImage] = useState("");
  const dispatch = useDispatch();
  const { request } = useSelector((store) => store);

  const handleSubmit = async (values, actions) => {
    const submitValues = {
      ...values,
      latitude,
      longitude,
    };
    dispatch(createRequest(submitValues));
    actions.resetForm();
    console.log("values of formmmmmmmmmmmm", submitValues);
    setSelectedImage(null);
  };

  const formik = useFormik({
    initialValues: {
      content: "",
      image: "",
      location: "",
      category: "",
      maxPrice: "",
      latitude: null,
      longitude: null,
      requestType: true,
    },
    onSubmit: handleSubmit,
    validationSchema,
    validateOnChange: false, // Add this line
    validateOnBlur: false, // Add this line
  });

  const handleSelectImage = async (event) => {
    setUploadingImage(true);
    const imgUrl = await uploadtoCloud(event.target.files[0]);
    formik.setFieldValue("image", imgUrl);
    setSelectedImage(imgUrl);
    setUploadingImage(false);
  };

  return (
    <div>
      <Modal
        open={open}
        onClose={handleCloseModal}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
        className="bg-opacity-80 bg-black text-white"
      >
        <Box sx={style}>
          <div className="flex space-x-5 mb-2">
            <Avatar className="cursor-pointer" alt="me" src={AvatarImg} />
            <div className="w-full flex items-center">
              <div className="flex justify-between items-center">
                <div className="flex cursor-pointer items-center space-x-2 ">
                  <div className="font-semibold">{auth.user?.fullName}</div>
                </div>
              </div>
            </div>
          </div>
          <section className="py-2 h-[90%]">
            <form onSubmit={formik.handleSubmit} className="h-full">
              <div className="flex space-x-5 h-full ">
                <div className="w-full flex justify-between h-full">
                  <div className="w-2/3 mr-2 flex flex-col p-2">
                    <div className="mb-2">
                      <textarea
                        type="text"
                        name="content"
                        rows="3"
                        cols="10"
                        wrap="soft"
                        placeholder="Request description"
                        maxLength={150}
                        className="border-none outline-none text-xl bg-slate-950 w-full resize-none rounded-sm p-2"
                        {...formik.getFieldProps("content")}
                      />
                    </div>
                    <div className="flex justify-between mb-3">
                      <TextField
                        label="location"
                        variant="outlined"
                        name="location"
                        placeholder="Location"
                        className="border-none outline-none text-xl bg-slate-950 w-1/2 resize-none rounded-sm p-2"
                        {...formik.getFieldProps("location")}
                        InputProps={{
                          style: { color: "white" },
                        }}
                        InputLabelProps={{
                          style: { color: "white" },
                        }}
                        sx={{
                          "& .MuiOutlinedInput-root": {
                            "& fieldset": {
                              borderColor: "#3e1d76",
                            },
                          },
                          "&:hover fieldset": {
                            borderColor: "#3e1d76",
                          },
                          "& .Mui-focused": {
                            "& .MuiOutlinedInput-notchedOutline": {
                              borderColor: "#3e1d76",
                            },
                          },
                        }}
                      />
                      <Select
                        labelId="category-select-label"
                        id="category-select"
                        label="category"
                        value={selectedCategory}
                        onChange={handleChange}
                        className="bg-slate-950 w-2/5"
                        name="category"
                        sx={{
                          color: "white",
                          "& .MuiOutlinedInput-notchedOutline": {
                            borderColor: "#7c3Aed",
                          },
                          "& .MuiSvgIcon-root": {
                            color: "#7c3Aed",
                          },
                          "& .MuiList-root": {
                            backgroundColor: "#000",
                          },
                          "& .MuiListItem-root, .MuiListItem-root.Mui-selected":
                            {
                              color: "#fff",
                            },
                        }}
                      >
                        {categories.map((category) => (
                          <MenuItem key={category.value} value={category.value}>
                            {category.label}
                          </MenuItem>
                        ))}
                      </Select>
                    </div>
                    <div className="flex justify-between">
                      <div className="flex justify-between w-1/2">
                        <TextField
                          type="number"
                          label="Max price ($)"
                          variant="outlined"
                          name="maxPrice"
                          placeholder="Max price"
                          className="border-none outline-none text-xl bg-slate-950 w-full resize-none rounded-sm p-2"
                          {...formik.getFieldProps("maxPrice")}
                          InputProps={{
                            style: { color: "white" },
                          }}
                          InputLabelProps={{
                            style: { color: "white" },
                          }}
                          sx={{
                            "& .MuiOutlinedInput-root": {
                              "& fieldset": {
                                borderColor: "#3e1d76",
                              },
                            },
                            "&:hover fieldset": {
                              borderColor: "#3e1d76",
                            },
                            "& .Mui-focused": {
                              "& .MuiOutlinedInput-notchedOutline": {
                                borderColor: "#3e1d76",
                              },
                            },
                          }}
                        />
                      </div>
                    </div>
                  </div>

                  <div className="w-1/3 flex flex-col justify-between  h-full">
                    <div className="flex items-center justify-center w-full ">
                      <label className="flex flex-col items-center justify-center w-full h-64 border-[1px] border-[#7c3aed] rounded-s cursor-pointer p-3">
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
                      </label>
                    </div>
                    <div className="flex flex-col space-y-4">
                      {(formik.errors.latitude || formik.errors.longitude) && (
                        <span className="text-red-500">
                          {formik.errors.latitude || formik.errors.longitude}
                        </span>
                      )}
                      <Button
                        variant="outlined"
                        startIcon={check ? <CheckIcon /> : <MyLocationIcon />}
                        className="w-full"
                        onClick={handleButtonClick}
                      >
                        get your Location
                      </Button>
                      <Button
                        sx={{
                          width: "100%",
                          borderRadius: "4px",
                          py: "5px",
                          bgcolor: "#7c3aed",
                          "&:hover": {
                            bgcolor: "#7c3Aed",
                          },
                        }}
                        variant="contained"
                        type="submit"
                      >
                        Request Product
                      </Button>
                    </div>
                  </div>
                </div>
              </div>
            </form>
          </section>
        </Box>
      </Modal>
    </div>
  );
}
