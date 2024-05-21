import axios from "axios"
import { API_BASE_URL, api } from "../../Config/api"
import {FIND_USER_BY_ID_SUCCESS, FOLLOW_USER_FAILURE, FOLLOW_USER_SUCCESS, GET_USER_PROFILE_FAILURE, GET_USER_PROFILE_SUCCESS, LOGIN_USER_FAILURE, LOGIN_USER_SUCCESS , LOGOUT_USER_FAILURE, LOGOUT_USER_SUCCESS, REGISTER_USER_FAILURE, REGISTER_USER_SUCCESS, UPDATE_USER_PROFILE_FAILURE, UPDATE_USER_PROFILE_SUCCESS} from "./ActionType"
import { FIND_REQUEST_BY_ID_FAILURE } from "../Request/ActionType"


export const loginUser=(loginData) => async(disaptch) =>{
    try {
        const {data} = await axios.post(`${API_BASE_URL}/auth/signin` , loginData)
        console.log("login User" , data)
        if(data.jwt){
            localStorage.setItem("jwt" , data.jwt);
        }
        disaptch({type:LOGIN_USER_SUCCESS , payload : data})
    } catch (error) {
        console.log("error" , error)
        disaptch({type : LOGIN_USER_FAILURE , payload : error.message })
        
    }
}
export const registerUser=(registerData) => async(disaptch) =>{
    try {
        const {data} = await axios.post(`${API_BASE_URL}/auth/signup` , registerData)
        console.log("register User" , data)
        if(data.jwt){
            localStorage.setItem("jwt" , data.jwt);
        }
        disaptch({type:REGISTER_USER_SUCCESS , payload : data.jwt})
    } catch (error) {

        console.log("error" , error)
        disaptch({type : REGISTER_USER_FAILURE , payload : error.message })
        
    }
}
export const getUserProfile=(jwt) => async(disaptch) =>{
    try {
        const {data} = await axios.get(`${API_BASE_URL}/api/appUser/profile` , {
            headers:{
                "Authorization" : `Bearer ${jwt}`
            }
        }

    )
        disaptch({type:GET_USER_PROFILE_SUCCESS , payload : data})
    } catch (error) {

        console.log("error" , error)
        disaptch({type : GET_USER_PROFILE_FAILURE , payload : error.message })
        
    }
}

export const logoutUser = () => async (dispatch) => {
    try {
      // Clear JWT token from local storage
      localStorage.removeItem("jwt");
  
      dispatch({ type: LOGOUT_USER_SUCCESS , payload:null });
    } catch (error) {
      console.log("error", error);
      dispatch({ type: LOGOUT_USER_FAILURE, payload: error.message });
    }
  };


  export const findUserById=(userId) => async(disaptch) =>{
    try {
        
        const {data} = await api.get(`${API_BASE_URL}/api/appUser/${userId}`)
        console.log("fidn user by id" , data)
        disaptch({type:FIND_USER_BY_ID_SUCCESS, payload : data})
    } catch (error) {

        console.log("error" , error)
        disaptch({type : FIND_REQUEST_BY_ID_FAILURE, payload : error.message })
        
    }
}

export const updateUserProfile=(reqData) => async(disaptch) =>{
    console.log("raniiiiii f updateUserProfile")
    try {
        const {data} = await api.put(`${API_BASE_URL}/api/appUser/update`, reqData)
        console.log("update user" , data)
        disaptch({type:UPDATE_USER_PROFILE_SUCCESS, payload : data})
    } catch (error) {

        console.log("error" , error)
        disaptch({type : UPDATE_USER_PROFILE_FAILURE, payload : error.message })
        
    }
}
export const FollowUser=(userId) => async(disaptch) =>{
    try {
        const {data} = await api.put(`${API_BASE_URL}/api/appUser/${userId}/follow`)
        console .log("follow user" , data)
        disaptch({type:FOLLOW_USER_SUCCESS, payload : data})
    } catch (error) {

        console.log("error" , error)
        disaptch({type :FOLLOW_USER_FAILURE, payload : error.message })
        
    }
}