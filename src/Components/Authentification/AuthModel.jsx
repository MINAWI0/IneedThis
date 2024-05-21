  import * as React from 'react';
  import Box from '@mui/material/Box';
  import Button from '@mui/material/Button';
  import Typography from '@mui/material/Typography';
  import Modal from '@mui/material/Modal';
  import SignInForm from './SignInForm';
  import SignUpForm from './SignUpForm';
  import { useLocation, useNavigate } from 'react-router-dom';

  const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 600,
    boxShadow: 24,
    p: 4,
    borderRadius: "4px",
    outline :"none"
  };

  export default function AuthModel({open, handleClose , type}) {

      const location = useLocation();
      const navigate = useNavigate();
      

      const handleNavigate =()=>{
          const path = location.pathname==="/signup" ? "/signin":"/signup";
          navigate(path);
      }


      

    return (
      <div>
        <Modal
          open={open}
          onClose={handleClose}
          aria-labelledby="modal-modal-title"
          aria-describedby="modal-modal-description"
        >
  

          <Box sx={style} className="bg-gray-950  text-white">
            {location.pathname ==="/signup" || type === 'signup' ?<SignUpForm/>:<SignInForm/>}

            <h1 className='text-2xl m-5 text-center'>
                {location.pathname === "/signup"?"Already registerd ? Sign in ." : "Don't have have account ? Join us . "}
            </h1>

            <Button fullWidth variant='outlined' onClick={handleNavigate}
              sx={{borderRadius:"4px" , py:"15px" , textTransform:'lowercase'}}>
                  {location.pathname ==="/signin" || type === 'signup'? "signup": "signin"}
              </Button>
          
          </Box>
        </Modal>
      </div>
    );
  }
