import React from "react";
import {
  Button,
  Grid,
  InputLabel,
  TextField,
  Select,
  MenuItem,
  FormControl,
  FormLabel,
  RadioGroup,
  FormControlLabel,
  Radio,
} from "@mui/material";
import { useFormik } from "formik";
import * as Yup from "yup";
import { useDispatch } from "react-redux";
import { registerUser } from "../../Store/Auth/Action";

const validationSchema = Yup.object().shape({
  email: Yup.string().email("invalide email").required("email is required"),
  password: Yup.string().required("password is required"),
});

const currentYear = new Date().getFullYear();
const years = Array.from({ length: 50 }, (_, i) => currentYear - i);
const days = Array.from({ length: 31 }, (_, i) => i + 1);
const months = [
  { value: 1, label: "January" },
  { value: 2, label: "February" },
  { value: 3, label: "March" },
  { value: 4, label: "April" },
  { value: 5, label: "May" },
  { value: 6, label: "June" },
  { value: 7, label: "July" },
  { value: 8, label: "August" },
  { value: 9, label: "September" },
  { value: 10, label: "October" },
  { value: 11, label: "November" },
  { value: 12, label: "December" },
];

const SignUpForm = () => {
  const dispatch = useDispatch();
  const formik = useFormik({
    initialValues: {
      fullName: "",
      email: "",
      password: "",
      dateOfBirth : {
        day: "",
        month: "",
        year: "",
      },
      seller:""
    },
    validationSchema,
    onSubmit: (values) => {
      const { day, month, year } = values.dateOfBirth;
      const dateOfbirth = `${year}-${month}-${day}`;
      values.dateOfBirth = dateOfbirth;
      dispatch(registerUser(values))
      console.log("from values ::::::::::::::", values);
    },
  });
  const handleDateChange = (name) => (event) => {
    formik.setFieldValue("dateOfBirth", {
      ...formik.values.dateOfBirth,
      [name]: event.target.value,
    });
  };
  const handleChange = (event) => {
    setValue(event.target.value);
    const { value } = event.target;
    formik.setFieldValue("seller", value === "true"); // Update the seller field in formik
  };
  
  const [value, setValue] = React.useState('seller');

 



  return (
    <form onSubmit={formik.handleSubmit}>
      <Grid container spacing={2}>
        <h1 className="font-bold text-3xl  text-center m-auto">
          Create your account
        </h1>
        <Grid item xs={12}>
          <TextField
            fullWidth
            label="Full Name"
            name="fullName"
            variant="outlined"
            size="large"
            value={formik.values.fullName}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            error={formik.touched.fullName && Boolean(formik.errors.fullName)}
            helperText={formik.touched.fullName && formik.errors.fullName}
            InputProps={{
              style: { color: "white" }, 
              placeholder: "Enter your fullName",
              inputProps: { style: { color: "white" } }, 
            }}
            InputLabelProps={{
              style: { color: "white", borderColor: "white" }, // Style for label
            }}
            sx={{
              "& .MuiOutlinedInput-root": {
                "& fieldset": {
                  borderColor: "white", // Border color
                },
              },
              "&:hover fieldset": {
                borderColor: "#3e1d76", // Border color on hover
              },
              "& .Mui-focused": {
                "& .MuiOutlinedInput-notchedOutline": {
                  borderColor: "#3e1d76", // Initial border color when focused
                },
              },
            }}
          ></TextField>
        </Grid>
        <Grid item xs={12}>
          <TextField
            fullWidth
            label="Email"
            name="email"
            variant="outlined"
            size="large"
            value={formik.values.email}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            error={formik.touched.email && Boolean(formik.errors.email)}
            helperText={formik.touched.email && formik.errors.email}
            InputProps={{
              style: { color: "white" }, // Style for input text
              placeholder: "Enter your email", // Placeholder text
              inputProps: { style: { color: "white" } }, // Style for input (overrides style prop)
            }}
            InputLabelProps={{
              style: { color: "white", borderColor: "white" }, // Style for label
            }}
            sx={{
              "& .MuiOutlinedInput-root": {
                "& fieldset": {
                  borderColor: "white", // Border color
                },
              },
              "&:hover fieldset": {
                borderColor: "#3e1d76", // Border color on hover
              },
              "& .Mui-focused": {
                "& .MuiOutlinedInput-notchedOutline": {
                  borderColor: "#3e1d76", // Initial border color when focused
                },
              },
            }}
          ></TextField>
        </Grid>
        <Grid item xs={12}>
          <TextField
            fullWidth
            label="Password"
            name="password"
            type="password"
            variant="outlined"
            size="large"
            value={formik.values.password}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            error={formik.touched.password && Boolean(formik.errors.password)}
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
              "& .MuiOutlinedInput-root": {
                "& fieldset": {
                  borderColor: "white", // Border color
                },
              },
              "&:hover fieldset": {
                borderColor: "#3e1d76", // Border color on hover
              },
              "& .Mui-focused": {
                "& .MuiOutlinedInput-notchedOutline": {
                  borderColor: "#3e1d76", // Initial border color when focused
                },
              },
            }}
          ></TextField>
        </Grid>
        <Grid item xs={4}>
          <InputLabel sx ={{
                color : "#fff" 
          }}
          
          > Day </InputLabel>

          <Select 
          sx={{
            color : "#fff",
              "& .MuiOutlinedInput-notchedOutline": {
                borderColor: '#7c3Aed', // Change the border color
            },
            "& .MuiSvgIcon-root": {
                color: "white"
            },
                      
        }}
          name="day" 
          fullWidth
          onChange={handleDateChange("day")}
          onBlur={formik.handleBlur}
          value={formik.values.dateOfBirth.day}
          
          >
            {days.map((day) => (
              <MenuItem key={day} value={day}>
                {day}
              </MenuItem>
            ))}
            
          </Select>
        </Grid>
        <Grid item xs={4}>
          <InputLabel
            sx ={{
                color : "#fff" 
          }}
          
          > Month </InputLabel>

          <Select name="month" 
          fullWidth
          onChange={handleDateChange("month")}
          onBlur={formik.handleBlur}
          value={formik.values.dateOfBirth.month}
          sx={{
            color : "#fff",
            "& .MuiOutlinedInput-notchedOutline": {
              borderColor: '#7c3Aed', // Change the border color
          },
          "& .MuiSvgIcon-root": {
              color: "white"
          },
         
      }}
          
          
          >    
            
            {months.map((month) => (
              <MenuItem key={month.label} value={month.value}>
                {month.label}
                
              </MenuItem>
            ))}
            
          </Select>
        </Grid>
        <Grid item xs={4}>
          <InputLabel
             sx ={{
                color : "#fff" 
          }}
          
          > Year </InputLabel>

          <Select name="year" 
          fullWidth
          onChange={handleDateChange("year")}
          onBlur={formik.handleBlur}
          value={formik.values.dateOfBirth.year}
          sx={{
            color : "#fff",
            "& .MuiOutlinedInput-notchedOutline": {
              borderColor: '#7c3Aed', // Change the border color
          },
          "& .MuiSvgIcon-root": {
              color: "white"
          }
       
      }}
          
          >
            {years.map((year) => (
              <MenuItem key={year} value={year}>
                {year}
              </MenuItem>
            ))}
          </Select>
        </Grid>
        <Grid item xs={12}>
        <FormControl
        sx={{
          '& .MuiFormLabel-root': {
            color: 'white',
          },
          '& .MuiRadioGroup-root': {
            backgroundColor: 'white',
          },
          '& .MuiRadio-root': {
            // Styles for the Radio component
            color: '#7c3Aed',
          },
        }}>
        
  <FormLabel id="demo-controlled-radio-buttons-group">Type</FormLabel>
  <RadioGroup
    row
    aria-labelledby="demo-controlled-radio-buttons-group"
    name="controlled-radio-buttons-group"
    value={value}
    onChange={handleChange}
  >
    <FormControlLabel value="true" control={<Radio />} label="Seller" />
    <FormControlLabel value="false" control={<Radio />} label="Buyer" />
            
  </RadioGroup>
</FormControl>

        </Grid>

        <Grid className="mt-20" item xs={12}>
          <Button
            sx={{
              
              borderRadius: "4px",
              py: "7px",
              bgcolor: "#7c3Aed",
              "&:hover": {
                bgcolor: "#3e1d76", // Maintain the same background color on hover
              },
            }}
            type="submit"
            fullWidth
            variant="contained"
            size="large"
          >
            Signup
          </Button>
        </Grid>
      </Grid>
    </form>
  );
};

export default SignUpForm;
