// create update password page and add it to the router
import React from "react";
import { Component } from "react";
import { useNavigate } from "react-router-dom";
import useMediaQuery from "@mui/material/useMediaQuery";
import { Box,
    FormControl,
    InputLabel,
    OutlinedInput,
    InputAdornment,
    IconButton,
    FormHelperText,
    useTheme
 } from "@mui/material";
 import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import axios from "axios";
// import { tokens } from "../theme";

function Responsive(Component) {
    return function WrappedComp(props) {
        const navigate = useNavigate();
        if (localStorage.length === 0){
          navigate("/login");
        }
        const theme = useTheme();
        const isNonMobile = useMediaQuery("(min-width: 400px)");
        return <Component {...props} navigate={navigate} isNonMobile={isNonMobile} theme={theme} />;
    };
    }

class UpdatePassword extends Component {
    constructor(props) {
        super(props);
        this.state = {
            password: "",
            confirmPassword: "",
            showPassword: false,
            showConfirmPassword: false,
            error: "",
        };
    }

    handleUpdate = (values) => {
        values.preventDefault();
        const { password, confirmPassword } = this.state;
        if (password !== confirmPassword) {
            alert("Passwords do not match");
            return;
        }
        axios.post("http://localhost:8000/update_user", {
            email: localStorage.getItem("email"),
            password: password,
        })
            .then((res) => {
                if (res.status === 200) {
                    alert("Password updated successfully");
                    this.props.navigate("/login");
                }
            }
            )
            .catch((err) => {
                if (err.response.status === 401) {
                    alert("User not found");
                }
                else {
                    alert("Error in updating password");
                }
            }
            );

    };

    render() {
        const { isNonMobile } = this.props;
        // const { colors } = tokens(this.props.theme.palette.mode);
        return (
            <Box
                m="20px"
                display="flex"
                flexDirection={isNonMobile ? "row" : "column"}
                alignItems="center"
                justifyContent="center"
                mt="70px"
                minHeight="70vh"
            >
                <Box paddingRight={isNonMobile ? "100px" : "0"}>
                    <img
                        src="logo512.png"
                        height="300px"
                        alt="profile-pic"
                    />
                </Box>
                <Box>
                <form
              className="login__create-container__form-container__form"
              onSubmit={this.handleUpdate}
            >
              <FormControl sx={{ width: "min(270px, 90vw)" }} variant="outlined">
                <InputLabel htmlFor="outlined-password-signup">Password</InputLabel>
                <OutlinedInput
                  id="outlined-password-signup"
                  className="login__create-container__form-container__form--password"
                  type={this.state.showPassword ? "text" : "password"}
                  autoComplete="current-password"
                  endAdornment={
                    <InputAdornment position="end">
                      <IconButton
                        onClick={() =>
                          this.setState({
                            showPassword: !this.state.showPassword,
                          })
                        }
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
                  value={this.state.password}
                  onChange={(e) =>
                    this.setState({
                      name: this.state.name,
                      email: this.state.email,
                      password: e.target.value,
                    })
                  }
                  required
                />
              </FormControl>
                <FormControl sx={{ width: "min(270px, 90vw)" }} variant="outlined">
                <InputLabel htmlFor="outlined-password-signup">Confirm Password</InputLabel>
                <OutlinedInput
                    id="outlined-password-signup"
                    className="login__create-container__form-container__form--password"
                    type={this.state.showConfirmPassword ? "text" : "password"}
                    autoComplete="current-password"
                    endAdornment={
                    <InputAdornment position="end">
                        <IconButton
                        onClick={() =>
                            this.setState({
                            showConfirmPassword: !this.state.showConfirmPassword,
                            })
                        }
                        edge="end"
                        >
                        {this.state.showConfirmPassword ? (
                            <VisibilityOff />
                        ) : (
                            <Visibility />
                        )}
                        </IconButton>
                    </InputAdornment>
                    }
                    label="Confirm Password"
                    value={this.state.confirmPassword}
                    onChange={(e) =>
                    this.setState({
                        name: this.state.name,
                        email: this.state.email,
                        confirmPassword: e.target.value,
                    })
                    } 
                    required
                />
                <FormHelperText style={{fontSize:"0.8rem"}}>Password should contain atleast 6 characters</FormHelperText>
            </FormControl>
              <button className="login__create-container__form-container__form--submit">
                Sign Up
              </button>
            </form>
                </Box>
            </Box>
        );
    }
}

export default Responsive(UpdatePassword);
