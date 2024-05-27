import { api } from "../../Config/api"
import {GET_ALL_REQUESTS_FAILURE  , GET_USERS_REQUEST_FAILURE, USER_LIKE_REQUEST_FAILURE, USER_LIKE_REQUEST_SUCCESS, GET_USERS_REQUEST_SUCCESS, FIND_REQUEST_BY_ID_SUCCESS, FIND_REQUEST_BY_ID_FAILURE, REQUEST_CREATE_SUCCESS, REQUEST_CREATE_FAILURE, OFFRE_SUCCESS, OFFRE_FAILURE, REQUEST_COPY_SUCCESS, REQUEST_COPY_FAILURE, REQUEST_DELETE_FAILURE, REQUEST_DELETE_SUCCESS, GET_ALL_REQUESTS_SUCCESS, LIKE_REQUEST_SUCCESS, LIKE_REQUEST_FAILURE, CLOSE_REQUEST_SUCCESS, CLOSE_REQUEST_FAILURE} from "./ActionType"

export const getAllRequests=()=>async (dispatch) =>{
    try {
        const {data} = await api.get("/api/request/")
        console.log("get all request" , data)
        dispatch({type:GET_ALL_REQUESTS_SUCCESS,payload : data })
        
    } catch (error) {
        console.log("can't reach that ")
        dispatch({type:GET_ALL_REQUESTS_FAILURE , payload : error.message})
    }
}

export const getUsersRequests=(userId)=>async (dispatch) =>{
    try {
        const {data} = await api.get(`/api/request/Appuser/${userId}`)
        console.log("get user requests daba  daba daba" ,  userId)
        console.log("hna 5ess ikoun request ta3 user wa7ed",data)
        dispatch({type:GET_USERS_REQUEST_SUCCESS,payload : data })

        
    } catch (error) {
        console.log("catch error")
        dispatch({type:GET_USERS_REQUEST_FAILURE , payload : error.message})
    }
}
export const findRequestByLikeContaineUser=(userId)=>async (dispatch) =>{
    try {
        const {data} = await api.get(`/api/request/Appuser/${userId}/likes`)
        console.log("get user like requests")
        dispatch({type:USER_LIKE_REQUEST_SUCCESS,payload : data })
        
    } catch (error) {
        console.log("catch error")
        dispatch({type:USER_LIKE_REQUEST_FAILURE , payload : error.message})
    }
}
export const findRequestById=(requestId)=>async (dispatch) =>{
    try {
        console.log(requestId);
        const {data} = await api.get(`/api/request/get/${requestId}`)
        console.log("find request by id" , data)
        dispatch({type:FIND_REQUEST_BY_ID_SUCCESS,payload : data })
        
    } catch (error) {
        console.log(error)
        dispatch({type:FIND_REQUEST_BY_ID_FAILURE , payload : error.message})
    }
}
export const createRequest=(requestData)=>async (dispatch) =>{
    try {
        const {data} = await api.post(`/api/request/create_request` , requestData)
        console.log("created request")
        dispatch({type:REQUEST_CREATE_SUCCESS,payload : data })
        
    } catch (error) {
        console.log("")
        dispatch({type:REQUEST_CREATE_FAILURE , payload : error.message})
    }
}
export const createOffre=(offreData)=>async (dispatch) =>{
    try {
        console.log(offreData)
        const {data} = await api.post(`/api/request/reply_request` , offreData)
        console.log("created request")
        dispatch({type:OFFRE_SUCCESS,payload : data })
        
    } catch (error) {
        console.log("")
        dispatch({type:OFFRE_FAILURE , payload : error.message})
    }
}
export const copyRequest=(requestId)=>async (dispatch) =>{
    try {
        const {data} = await api.put(`/api/request/${requestId}/re_request`)
        console.log("copy request")
        dispatch({type:REQUEST_COPY_SUCCESS,payload : data })
        
    } catch (error) {
        console.log("")
        dispatch({type:REQUEST_COPY_FAILURE , payload : error.message})
    }
}
export const LikeRequest=(requestId)=>async (dispatch) =>{
    try {
        const {data} = await api.post(`/api/${requestId}/likes`)
        console.log("liked action request", data)
        dispatch({type:LIKE_REQUEST_SUCCESS,payload : data })
        
    } catch (error) {
        console.log("liked action request error")
        dispatch({type:LIKE_REQUEST_FAILURE , payload : error.message})
    }
}
export const deleteRequest=(requestId)=>async (dispatch) =>{
    try {
        const {data} = await api.post(`/api/request/${requestId}`)
        console.log("delete request")
        dispatch({type:REQUEST_DELETE_SUCCESS,payload : requestId })
        
    } catch (error) {
        console.log("")
        dispatch({type:REQUEST_DELETE_FAILURE , payload : error.message})
    }
}

export const closeRequest = (requestId) => async (dispatch) => {
    try {
      const response = await api.put(`/api/request/${requestId}/close`);
      console.log("Request closed successfully", response.data);
      dispatch({
        type: CLOSE_REQUEST_SUCCESS,
        payload: requestId,
      });
    } catch (error) {
      console.error("Error closing request", error);
      dispatch({
        type: CLOSE_REQUEST_FAILURE,
        payload: error.message,
      });
    }
  };