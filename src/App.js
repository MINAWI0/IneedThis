
import './App.css';
import {Route, Routes, useNavigate} from "react-router-dom";
import HomePage from "./Components/HomePage/HomePage";
import Authentification from "./Components/Authentification/Authentification";
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getUserProfile } from './Store/Auth/Action';
import "./global.css";
import 'leaflet/dist/leaflet.css';



function App() {
    const jwt = localStorage.getItem("jwt")
    const {auth} = useSelector(store => store)
    const dispatch = useDispatch()
    const navigate = useNavigate(); 

    useEffect(() =>{
        if(jwt){
          dispatch(getUserProfile(jwt))
          navigate("/")
        }


    },[auth.jwt])



  return (
    
      <Routes>
        <Route path="/*" element={auth.user?<HomePage/>:<Authentification/>}>

        </Route>
      </Routes>

  );
}

export default App;
// import './App.css';
// import { Route, Routes, useNavigate } from "react-router-dom";
// import HomePage from "./Components/HomePage/HomePage";
// import Authentification from "./Components/Authentification/Authentification";
// import { useEffect } from 'react';
// import { useDispatch, useSelector } from 'react-redux';
// import { getUserProfile } from './Store/Auth/Action';
// import "./global.css";
// import 'leaflet/dist/leaflet.css';

// function App() {
//     const jwt = localStorage.getItem("jwt");
//     const { auth } = useSelector(store => store);
//     const dispatch = useDispatch();
//     const navigate = useNavigate();

//     useEffect(() => {
//         if (jwt) {
//             dispatch(getUserProfile(jwt));
//         } else {
//             navigate("/home");
//         }
//     }, [dispatch, jwt, navigate]);

//     if (!auth.user && jwt) {
//         return null; // Render nothing until auth state is resolved
//     }

//     return (
//         <Routes>
//             <Route path="/*" element={auth.user ? <HomePage /> : <Authentification />} />
//         </Routes>
//     );
// }

// export default App;

