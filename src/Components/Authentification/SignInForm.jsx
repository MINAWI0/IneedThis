import React from "react";
import { Button, Grid, TextField } from "@mui/material";
import { useFormik } from "formik";
import * as Yup from  'yup';
import { useDispatch } from "react-redux";
import { loginUser } from "../../Store/Auth/Action";





const validationSchema = Yup.object().shape({
    email:Yup.string().email("invalide email").required("email is required"),
    password:Yup.string().required("password is required")
})

const SignInForm = () =>{
    const dispath = useDispatch();


const formik = useFormik({
    initialValues :{
        email:"",
        password :"",
    },
    validationSchema,
    onSubmit : (values)=> {
        dispath(loginUser(values))
        console.log("from values" , values)
    }

})

    return (
        <form onSubmit={formik.handleSubmit}>
        <Grid container spacing={2} >
        <h1 className='font-bold text-3xl text-center '>Sign in to you account </h1>
            <Grid item xs={12}>
                
                   <TextField
            
            fullWidth
            label="Email"
            name = "email"
            variant="outlined"
            size="large"
            value={formik.values.email}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            error ={formik.touched.email && Boolean(formik.errors.email)}
            helperText={formik.touched.email && formik.errors.email}
            InputProps={{
                style: { color: "white" }, // Style for input text
                placeholder: "Enter your email", // Placeholder text
                inputProps: { style: { color: "white" } }, // Style for input (overrides style prop)
            }}
            InputLabelProps={{
                style: { color: "white"  , borderColor:"white"}, // Style for label

            }}
            sx={{
                '& .MuiOutlinedInput-root': {
                    '& fieldset': {
                        borderColor: 'white', // Border color
                    },
                },
                '&:hover fieldset': {
                    borderColor: '#3e1d76', // Border color on hover
                },
                '& .Mui-focused': {
                    '& .MuiOutlinedInput-notchedOutline': {
                        borderColor: '#3e1d76', // Initial border color when focused
                    },
                },
            }}
            
            ></TextField>
            </Grid>
            <Grid item xs={12}>
                   <TextField
            fullWidth
            label="Password"
            name = "password"
            variant="outlined"
            size="large"
            type="password"
            value={formik.values.password}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            error ={formik.touched.password && Boolean(formik.errors.password)}
            helperText={formik.touched.password && formik.errors.password}
            InputProps={{
                style: { color: "white" }, // Style for input text
                placeholder: "Enter your password", // Placeholder text
                inputProps: { style: { color: "white" } }, // Style for input (overrides style prop)
            }}
            InputLabelProps={{
                style: { color: "white" }, // Style for label
            }}
            sx={{
                '& .MuiOutlinedInput-root': {
                    '& fieldset': {
                        borderColor: 'white', // Border color
                    },
                },
                '&:hover fieldset': {
                    borderColor: '#3e1d76', // Border color on hover
                },
                '& .Mui-focused': {
                    '& .MuiOutlinedInput-notchedOutline': {
                        borderColor: '#3e1d76', // Initial border color when focused
                    },
                },
            }}
            
            
            ></TextField>
            </Grid>
            <Grid className="mt-20" item xs={12}>
                <Button sx={{borderRadius: "4px",py : "7px",bgcolor: "#7c3Aed",
                            '&:hover': {
                                    bgcolor: "#3e1d76" // Maintain the same background color on hover
                                }          
                            }} 
                type="submit" fullWidth variant="contained" size="large">Signin</Button>
            </Grid>
         
        </Grid>
        </form>

    )
}

export default SignInForm;