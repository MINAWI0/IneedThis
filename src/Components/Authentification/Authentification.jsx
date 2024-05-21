import { Button, Grid } from '@mui/material'
import React, { useState } from 'react'
import logo from "../../recources/valorant.svg";
import { GoogleLogin } from '@react-oauth/google';
import AuthModel from './AuthModel';

const Authentification = () => {
    const [openAuthModel , setOpenAuthModel] = useState(false);
    const [authType, setAuthType] = useState('signin');
    const handleOpenAuthModel= (type) => {
        setAuthType(type); // Add this line
        setOpenAuthModel(true);
    }
    const handelCloseAuthModel = () => setOpenAuthModel(false)

    return (
        <div className='bg-slate-950 text-neutral-50'>
            <Grid className='overflow-y-hidden container' container>

                <Grid className='hidden lg:block' item lg={6} xs={0}>
                    <img src="https://cdn.pixabay.com/photo/2017/02/27/19/22/texture-2104054_960_720.jpg" alt="" className='w-full h-screen' />
                    <div className='absolute top-[10px] left-[10px]'>
                        <img src={logo} alt="image1" height="60px" width="60px" />
                    </div>
                </Grid>
                <Grid className='px-10 align-middle py-5' lg={6} xs={12}>

                        <h1 className='font-bold text-6xl '>NeedThis <br/>Request & Supply in One Place .</h1>
                        <h1 className='font-bold text-3xl py-12'>Join the Community Now .</h1>
                        <div className='w-full'>
                            {/* <GoogleLogin className="bg-[#7c3Aed]"/> */}
                            {/* <p className='font-bold py-5 text-center'>OR</p> */}
                            <Button onClick={() => handleOpenAuthModel('signup')} fullWidth variant='contained' size="large"
                            sx={{
                                textTransform:'none',
                                borderRadius: "4px",
                                py : "7px",
                                bgcolor: "#7c3Aed",
                                '&:hover': {
                                    bgcolor: "#3e1d76" // Maintain the same background color on hover
                                }
                            }}>
                             Create Account   
                            </Button>
                            <p className=' font-bold py-5 text-center'>Already have Account ?</p>
                            <Button  onClick={() => handleOpenAuthModel('signin')} fullWidth variant='contained' size="large"
                            sx={{
                                textTransform:'none',
                                borderRadius: "4px",
                                py : "7px",
                                bgcolor: "#7c3Aed",
                                '&:hover': {
                                    bgcolor: "#3e1d76" // Maintain the same background color on hover
                                }
                            }}>
                                    Sign In
                            </Button>


                    
                        </div>


                    <div>

                    </div>

                </Grid>




            </Grid>
            <AuthModel open={openAuthModel} handleClose={handelCloseAuthModel} type={authType} />
        </div>
    )
}
export default Authentification