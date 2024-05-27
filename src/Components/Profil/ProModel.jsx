import * as React from "react";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Modal from "@mui/material/Modal";
import { useFormik, validateYupSchema } from "formik";
import { IconButton, InputAdornment } from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import { TextField } from "@mui/material";
import "../Profil/ProfileModel.css";
import { useDispatch, useSelector } from "react-redux";
import { updateUserPro, updateUserProfile } from "../../Store/Auth/Action";
import FacebookIcon from '@mui/icons-material/Facebook';
import TwitterIcon from '@mui/icons-material/Twitter';
import LanguageIcon from '@mui/icons-material/Language';

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 800,
  border: "none",
  boxShadow: 24,
  p: 4,
  outline: "none",
  borderRadius: 2.5,
};

export default function ProModel({ open, handleClose }) {
  const dispatch = useDispatch();
  const auth = useSelector((store) => store.auth);

  const formik = useFormik({
    initialValues: {
      facebook: auth?.user?.facebook || "",
      twitter: auth?.user?.twitter || "",
      instagram: auth?.user?.instagram || "",
      phoneNumber: auth?.user?.phoneNumber || "",
      professionalEmail: auth?.user?.professionalEmail || "",
      termsAndService: auth?.user?.termsAndService || "",
      companyName: auth?.user?.companyName || "",
      
    },
    onSubmit: async (values) => {
      console.log("yesss", values);
      dispatch(updateUserPro(values));
      await new Promise(resolve => setTimeout(resolve, 1000)); // Wait for 1 second
      handleClose(); // Close the modal after 1 second
    },
  });



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
                <p className="text-sm">Edit Professional Profile </p>
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
            {/* <div className="overflow-y-scroll overflow-x-hidden h-[80vh] HideScrollBar">
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
              </div> */}
              <div className="space-y-3">
                <div className="flex flex-row space-x-1">
                <TextField
                   InputProps={{
                    startAdornment: <InputAdornment position="start"><FacebookIcon style={{ color: "#3b5998" }}/></InputAdornment>,
                  }}
                  color="warning"
                  InputLabelProps={{
                    style: { color: "#fff" },
                  }}
                  className="bg-slate-800"
                  fullWidth
                  type="url"
                  id="facebook"
                  name="facebook"
                  label="Facebook"
                  value={formik.values.facebook}
                  onChange={formik.handleChange}
                  error={
                    formik.touched.facebook && Boolean(formik.errors.facebook)
                  }
                  helperText={formik.touched.facebook && formik.errors.facebook}
                />
                <TextField
                   InputProps={{
                    startAdornment: <InputAdornment position="start"><TwitterIcon style={{ color: "#3b5998" }}/></InputAdornment>,
                  }}
                  color="warning"
                  InputLabelProps={{
                    style: { color: "#fff" },
                  }}
                  className="bg-slate-800"
                  fullWidth
                  type="url"
                  id="twitter"
                  name="twitter"
                  label="Twitter"
                  value={formik.values.twitter}
                  onChange={formik.handleChange}
                  error={
                    formik.touched.twitter && Boolean(formik.errors.twitter)
                  }
                  helperText={formik.touched.twitter && formik.errors.twitter}
                />
                </div>
                
                <TextField
                 InputProps={{
                  startAdornment: <InputAdornment position="start"><LanguageIcon style={{ color: "#3b5998" }}/></InputAdornment>,
                }}
                  color="warning"
                  InputLabelProps={{
                    style: { color: "#fff" },
                  }}
                  className="bg-slate-800"
                  fullWidth
                  type="url"
                  id="instagram"
                  name="instagram"
                  label="web site"
                  value={formik.values.instagram}
                  onChange={formik.handleChange}
                  error={
                    formik.touched.instagram && Boolean(formik.errors.instagram)
                  }
                  helperText={
                    formik.touched.instagram && formik.errors.instagram
                  }
                />
                <TextField
                  color="warning"
                  InputLabelProps={{
                    style: { color: "#fff" },
                  }}
                  className="bg-slate-800"
                  fullWidth
                  type="number"
                  id="phoneNumber"
                  name="phoneNumber"
                  label="Phone Number"
                  value={formik.values.phoneNumber}
                  onChange={formik.handleChange}
                  error={
                    formik.touched.phoneNumber && Boolean(formik.errors.phoneNumber)
                  }
                  helperText={
                    formik.touched.phoneNumber && formik.errors.phoneNumber
                  }
                />
                <TextField
                  color="warning"
                  InputLabelProps={{
                    style: { color: "#fff" },
                  }}
                  className="bg-slate-800"
                  fullWidth
                  id="professionalEmail"
                  name="professionalEmail"
                  label="Professional Email"
                  value={formik.values.professionalEmail}
                  onChange={formik.handleChange}
                  error={formik.touched.professionalEmail && Boolean(formik.errors.professionalEmail)
                  }
                  helperText={
                    formik.touched.professionalEmail && formik.errors.professionalEmail
                  }
                />
                <TextField
                  color="warning"
                  InputLabelProps={{
                    style: { color: "#fff" },
                  }}
                  className="bg-slate-800"
                  fullWidth
                  multiline
                  rows={3}
                  id="termsAndService"
                  name="termsAndService"
                  label="Terms and Service"
                  value={formik.values.termsAndService}
                  onChange={formik.handleChange}
                  error={
                    formik.touched.termsAndService && Boolean(formik.errors.termsAndService)
                  }
                  helperText={
                    formik.touched.termsAndService && formik.errors.termsAndService
                  }
                />
                <TextField
                  color="warning"
                  InputLabelProps={{
                    style: { color: "#fff" },
                  }}
                  className="bg-slate-800"
                  fullWidth
                  id="companyName"
                  name="companyName"
                  label="Company Name"
                  value={formik.values.companyName}
                  onChange={formik.handleChange}
                  error={
                    formik.touched.companyName && Boolean(formik.errors.companyName)
                  }
                  helperText={
                    formik.touched.companyName && formik.errors.companyName
                  }
                />
              </div>
            </form>
          </Box>
        </Modal>
      </div>
    );
  }