import * as React from "react";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Modal from "@mui/material/Modal";
import { useFormik } from "formik";
import { IconButton } from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import { TextField } from "@mui/material";
import Avatar from "@mui/material/Avatar";
import profilePic from "../../recources/avatar.png";
import "../Profil/ProfileModel.css";
import { useDispatch, useSelector } from "react-redux";
import { updateUserProfile } from "../../Store/Auth/Action";
import { uploadtoCloud } from "../CloudAPi/UploadToCloud";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 600,
  border: "none",
  boxShadow: 24,
  p: 4,
  outline: "none",
  borderRadius: 2.5,
};

export default function ProfileModel({ open, handleClose }) {
  const dispatch = useDispatch();
  const auth = useSelector((store) => store.auth);
  const [Uploading, setUploading] = React.useState(false);
  const [selectedImage, setselectedImage] = React.useState(auth?.user?.image || "");

  const formik = useFormik({
    initialValues: {
      fullName: auth?.user?.fullName || "",
      bio: auth?.user?.bio || "",
      location: auth?.user?.location || "",
      bgImage: auth?.user?.bgImage || "",
      image: auth?.user?.image || "",
    },
    onSubmit: async (values) => {
      console.log("yesss", values);
      dispatch(updateUserProfile(values));
      setselectedImage("");
      await new Promise(resolve => setTimeout(resolve, 1000)); // Wait for 1 second
      handleClose(); // Close the modal after 1 second
    },
  });

  const handelImageChange = async (event) => {
    setUploading(true);
    const { name } = event.target;
    const file = await uploadtoCloud(event.target.files[0]);
    formik.setFieldValue(name, file);
    setselectedImage(file);
    setUploading(false);
  };
  

  return (
    <div className="scrol">
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style} className="bg-gray-950 text-white">
          <form onSubmit={formik.handleSubmit}>
            <div className="flex items-center justify-between mb-3">
              <div className="flex items-center space-x-3">
                <IconButton onClick={handleClose} aria-label="close">
                  <CloseIcon className="text-red-500 hover:text-red-700" />
                </IconButton>
                <p className="text-sm">Edit Profile</p>
              </div>
              <Button
                type="submit"
                sx={{
                  color: "#7c3aed",
                  "&:hover": {
                    bgcolor: "transparent",
                  },
                }}
              >
                Save changes
              </Button>
            </div>
            <div className="overflow-y-scroll overflow-x-hidden h-[80vh] HideScrollBar">
              <React.Fragment>
                <div>
                  <div className="w-full">
                    <div className="relative">
                      <img
                        className="w-full h-[12rem] object-cover"
                        src="https://cdn.pixabay.com/photo/2024/03/04/16/44/barberry-8612696_640.jpg"
                        alt="wall"
                      />
                      <input
                        type="file"
                        className="absolute top-0 left-0 w-full h-full opacity-0 cursor-pointer"
                        name="bgImage"
                        onChange={handelImageChange}
                      />
                    </div>
                  </div>
                </div>
                <div className="w-full transform -translate-y-20 ml-4 h-[6rem]">
                  <div className="relative">
                    <Avatar
                      src={selectedImage || auth?.user?.image}
                      alt="profile"
                      sx={{
                        width: "10rem",
                        height: "10rem",
                        border: "4px solid #7c3aed",
                      }}
                    />
                    <input
                      type="file"
                      className="absolute top-0 left-0 w-[10rem] h-full opacity-0 cursor-pointer"
                      name="image"
                      onChange={handelImageChange}
                    />
                  </div>
                </div>
              </React.Fragment>
              <div className="space-y-3">
                <TextField
                  color="warning"
                  InputLabelProps={{
                    style: { color: "#fff" },
                  }}
                  className="bg-slate-800"
                  fullWidth
                  id="fullName"
                  name="fullName"
                  label={auth?.user?.fullName}
                  value={formik.values.fullName}
                  onChange={formik.handleChange}
                  disabled
                  error={
                    formik.touched.fullName && Boolean(formik.errors.fullName)
                  }
                  helperText={formik.touched.fullName && formik.errors.fullName}
                />

                <TextField
                  color="warning"
                  InputLabelProps={{
                    style: { color: "#fff" },
                  }}
                  className="bg-slate-800"
                  fullWidth
                  multiline
                  rows={4}
                  id="bio"
                  name="bio"
                  label="Bio"
                  value={formik.values.bio}
                  onChange={formik.handleChange}
                  error={formik.touched.bio && Boolean(formik.errors.bio)}
                  helperText={formik.touched.bio && formik.errors.bio}
                />
                <TextField
                  color="warning"
                  InputLabelProps={{
                    style: { color: "#fff" },
                  }}
                  className="bg-slate-800"
                  fullWidth
                  id="location"
                  name="location"
                  label="Location"
                  value={formik.values.location}
                  onChange={formik.handleChange}
                  error={
                    formik.touched.location && Boolean(formik.errors.location)
                  }
                  helperText={formik.touched.location && formik.errors.location}
                />
                <div className="my-3">
                  <p className="text-lg">Birth Day</p>
                  <p className="text-2xl">{auth?.user?.birthDate}</p>
                </div>
              </div>
            </div>
          </form>
        </Box>
      </Modal>
    </div>
  );
}
