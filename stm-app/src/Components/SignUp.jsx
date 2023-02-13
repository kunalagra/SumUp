import {
  Box,
  TextField,
  Typography,
  FormControl,
  InputLabel,
  OutlinedInput,
  InputAdornment,
  IconButton,
  Button,
  FormHelperText
} from "@mui/material";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import { Component } from "react";
import { Link } from "react-router-dom";
import useMediaQuery from "@mui/material/useMediaQuery";
import { Formik } from "formik";
import * as yup from "yup";
import httpClient from "../httpClient";

function Responsive(Component) {
  return function WrappedComp(props) {
    const isNonMobile = useMediaQuery("(min-width: 400px)");
    return <Component {...props} isNonMobile={isNonMobile} />;
  };
}

class SignUp extends Component {
  constructor(props) {
    super(props);
    this.state = {
      name: "",
      email: "",
      password: "",
      showPassword: false,
    };
    this.handleClickShowPassword = this.handleClickShowPassword.bind(this);
    this.handleMouseDownPassword = this.handleMouseDownPassword.bind(this);
    this.handleFormSubmit = this.handleFormSubmit.bind(this);
    this.checkoutSchema = yup.object().shape({
      name: yup.string().required("required"),
      email: yup.string().email("Invalid Email").required("required"),
      password: yup.string().required("required"),
    });
  }

  handleClickShowPassword() {
    this.setState({
      showPassword: !this.state.showPassword,
    });
  }

  handleMouseDownPassword(event) {
    event.preventDefault();
  }

  handleFormSubmit(values) {
    httpClient.post('/signup', values).then((res) => {
      if (res.data.message) {
        console.log(res.data);
      }
      else {
        alert("Invalid Credentials");
      }
  }).catch((err) => {
      console.log(err);
  });
  }

  render() {
    return (
      <Box
        m="20px"
        minHeight="70vh"
        display="flex"
        flexDirection="column"
        justifyContent="center"
        alignItems="center"
      >
        <Formik
          onSubmit={this.handleFormSubmit}
          initialValues={this.state}
          validationSchema={this.checkoutSchema}
        >
          {({
            values,
            errors,
            touched,
            handleBlur,
            handleChange,
            handleSubmit,
          }) => (
            <form
              onSubmit={handleSubmit}
              style={{
                width: `${this.props.isNonMobile ? "300px" : "90%"}`,
              }}
            >
              <Typography variant="h3" mb="10px">Sign Up</Typography>
              <Box
                sx={{
                  "& .MuiTextField-root": { mt: "10px", width: "100%" },
                }}
              >
                <TextField
                  id="name"
                  name="name"
                  label="Name"
                  onBlur={handleBlur}
                  onChange={handleChange}
                  placeholder="Full Name"
                  error={!!touched.name && !!errors.name}
                  helperText={touched.name && errors.name}
                  value={values.name}
                  autoComplete="name"
                  required
                />
                <TextField
                  id="email"
                  name="email"
                  label="Email"
                  onBlur={handleBlur}
                  onChange={handleChange}
                  placeholder="Email address"
                  error={!!touched.email && !!errors.email}
                  helperText={touched.email && errors.email}
                  value={values.email}
                  autoComplete="email"
                  required
                />
                <FormControl
                  sx={{ mt: "10px", width: "100%" }}
                  variant="outlined"
                >
                  <InputLabel htmlFor="password">Password</InputLabel>
                  <OutlinedInput
                    id="password"
                    name="password"
                    type={this.state.showPassword ? "text" : "password"}
                    placeholder="Password"
                    onBlur={handleBlur}
                    onChange={handleChange}
                    value={values.password}
                    error={!!touched.password && !!errors.password}
                    endAdornment={
                      <InputAdornment position="end">
                        <IconButton
                          aria-label="toggle password visibility"
                          onClick={this.handleClickShowPassword}
                          onMouseDown={this.handleMouseDownPassword}
                          edge="end"
                        >
                          {this.state.showPassword ? (
                            <VisibilityOff />
                          ) : (
                            <Visibility />
                          )}
                        </IconButton>
                      </InputAdornment>
                    }
                    label="Password"
                    autoComplete="current-password"
                    required
                  />
                  <FormHelperText>
                    Password should contain atleast 8 characters
                  </FormHelperText>
                </FormControl>
              </Box>
              <Box
                display="flex"
                justifyContent="start"
                mt="20px"
                alignItems="center"
              >
                <Button
                  type="submit"
                  variant="contained"
                  sx={{ fontWeight: "bold" }}
                >
                  Sign Up
                </Button>
                <Link to="/login" style={{ textDecoration: "none" }}>
                  <Typography variant="h5" color="secondary" ml="10px">
                    Already have an account? Login
                  </Typography>
                </Link>
              </Box>
            </form>
          )}
        </Formik>
      </Box>
    );
  }
}

export default Responsive(SignUp);
