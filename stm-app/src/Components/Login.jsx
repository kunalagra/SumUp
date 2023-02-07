import {
  Box,
  TextField,
  Typography,
  FormControl,
  InputLabel,
  OutlinedInput,
  InputAdornment,
  IconButton,
  Button
} from "@mui/material";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import { Component } from "react";
import { Link } from "react-router-dom";
import useMediaQuery from "@mui/material/useMediaQuery";
import { Formik } from "formik";
import * as yup from "yup";

function Responsive(Component) {
  return function WrappedComp(props) {
    const isNonMobile = useMediaQuery("(min-width: 400px)");
    return <Component {...props} isNonMobile={isNonMobile} />;
  };
}

class Login extends Component {
  constructor(props) {
    super(props);
    this.state = {
      email: "",
      password: "",
      showPassword: false,
    };
    this.handleClickShowPassword = this.handleClickShowPassword.bind(this);
    this.handleMouseDownPassword = this.handleMouseDownPassword.bind(this);
    this.handleFormSubmit = this.handleFormSubmit.bind(this);
    this.checkoutSchema = yup.object().shape({
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
    console.log(values);
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
              <Typography variant="h3"> Login</Typography>
              <Box
                sx={{
                  "& .MuiTextField-root": { mt: "20px", width: "100%" },
                }}
              >
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
                  <InputLabel htmlFor="password">
                    Password
                  </InputLabel>
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
                  // 
                >
                  Login
                </Button>
                <Link to="/signup" style={{ textDecoration: "none" }}>
                  <Typography variant="h5" color="secondary" ml="10px">
                    Create a new account?
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

export default Responsive(Login);