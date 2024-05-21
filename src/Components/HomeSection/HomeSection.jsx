import React, { useEffect, useState } from "react";
import Avatar from "@mui/material/Avatar";
import avatar from "../../recources/avatar.png";
import { useFormik } from "formik";
import AddPhotoAlternateIcon from "@mui/icons-material/AddPhotoAlternate";
import * as Yup from "yup";
import AddLinkIcon from "@mui/icons-material/AddLink";
import Button from "@mui/material/Button";
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';
import RequestCard from "./RequestCard";
import { useDispatch, useSelector } from "react-redux";
import {createRequest, getAllRequests} from "../../Store/Request/Action"
import { uploadtoCloud } from "../CloudAPi/UploadToCloud";
import ResponseModel from "./ResponseModel";
import RequestModel from "./RequestModel";


// ::::::::::::::::::::::::::::::::::::::::::::::::::::::::::

const validationSchema = Yup.object().shape({
  content: Yup.string()
  .test('maxCharacters', 'Maximum character limit reached', function (value) {
    if (value && value.length === 150) { // Adjust the number 200 to your desired maximum character limit
      return false; // Return false if validation fails
    }
    return true; // Return true if validation passes
  }),
});

const HomeSection = () => {
  const auth = useSelector(store => store.auth);
  
  const [uploadingImage, SetUploadingImage] = useState(false);
  const [selectImage, setSelectedImage] = useState("");
  const dispatch = useDispatch();
  const {request} = useSelector(store => store);
  const [openResponseModel,setOpenResponseModel] = useState(false)
  const handelOpenResponseModel = () => setOpenResponseModel(true);
  const handleCloseResponseModel = () => setOpenResponseModel(false);


  console.log("request" , request)
  console.log("user ::::::::::" , auth?.user)



  const handleSubmit = (values , actions) => {
    dispatch(createRequest(values))
    actions.resetForm()
    console.log("values", values);
    setSelectedImage(null)
  };
  
// const handleSelectImage = async (event) => {
//     SetUploadingImage(true);
//     const imgUrl = await uploadtoCloud(event.target.files[0])
//     formik.setFieldValue("image", imgUrl);
//     setSelectedImage(imgUrl);
//     SetUploadingImage(false);
// };

  useEffect(()=>{
    dispatch(getAllRequests())
  },[request.like , request.copyRequest])


// ::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::
  return (
    <div className="space-y-5">
      <section>
        <h1 className="py-5 text-xl font-bold opacity-90">Home</h1>
      </section>
      {!auth.user.seller?(<section className={" bg-gray-900 rounded-[4px] px-7 py-4"}>
        <div className={"flex space-x-5"}>
          <Avatar alt="username" src={auth.user?.image} />
          <div className="w-full ">
          
              <div>
                <textarea
                  onClick={handelOpenResponseModel}
                  type="text"
                  name="content"
                  rows="1"
                  cols="10" 
                  wrap="soft"
                  placeholder="&nbsp;&nbsp;&nbsp;click to create a request"
                  maxLength={150}
                  className={"border-none outline-none text-xl bg-slate-950 bg-opacity-25 w-full resize-none rounded-sm p-2"}
                
                />
                          
              
              </div>
          </div>
        </div>
      </section>) : null}
      <section>

      {request.requests.slice().reverse().map((item) => <RequestCard item={item}/> )}

      <section>
        {/* <ResponseModel open={openResponseModel}  handleClose={handleCloseResponseModel} /> */}
        <RequestModel open={openResponseModel}  handleClose={handleCloseResponseModel} />
      </section> 
            
      </section>
    </div>
  );
};

export default HomeSection;
