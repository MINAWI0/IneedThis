import React, { useEffect } from 'react'
import KeyboardBackspaceIcon from "@mui/icons-material/KeyboardBackspace";
import { useNavigate, useParams } from "react-router-dom";
import RequestCard from '../HomeSection/RequestCard';
import Response from '../HomeSection/Response';
import Divider from '@mui/material/Divider';
import { useDispatch, useSelector } from 'react-redux';
import { findRequestById } from '../../Store/Request/Action';




const RequestDetails = ()=>{
    const navigate = useNavigate();
    const handleBack = () => navigate(-1);
    const dispatch = useDispatch();
    const  {id} = useParams();
    const request =  useSelector(store => store.request)
    console.log("request from details ------> " , request)
  


    useEffect(() => {
      if(id){
        dispatch(findRequestById(id))
        console.log( 'you are here',id)
      }
    },[request.like])
    return (
        <React.Fragment>
             <section className={"z-50 flex items-center sticky top-0  bg-gray-950" }>
        <KeyboardBackspaceIcon
          className="cursor-pointer"
          onClick={handleBack}
        />
        <h1 className="py-5 text-xl font-bold opacity-90 ml-5 ">
          A request from <span className='text-[#7c3Aed]'>{request?.request?.user?.fullName}</span> 
        </h1>
      </section>
      <RequestCard item={request.request}/>
      <Divider sx={{margin:"2rem 0rem"}}><span className='text-[#1e88e5] w-6'>Responses</span> </Divider>

      {request.request?.replyRequests?.map((item) => <Response item={item} request={request}/> )}
      {/* {request.request?.replyRequests?.map((item) => <RequestCard item={item}/>)} */}

        </React.Fragment>
    )
}
export default RequestDetails;
