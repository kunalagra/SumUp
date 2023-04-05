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
    useTheme,
    TextField,
    Select,
    MenuItem
 } from "@mui/material";
 import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import axios from "axios";

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
            isAlert: false,
            alertCont: "",
            alertType: "",
            name: localStorage.getItem('name'),
            age: "",
            company: "",
            role: "",
            gender: "male"
        };
    }

    handleUpdate = (values) => {
        values.preventDefault();
        const { password, confirmPassword, name } = this.state;
        if(!(/^.{6,}$/.test(password))) {
          this.setState({
            alertCont: "Password should contain atleast 6 characters!!",
            alertType: "danger",
            isAlert: true
          })

          setTimeout(() => {
            this.setState({
              alertCont: "",
              alertType: "",
              isAlert: false
            })
          }, 2000);
          return ;
        }

        if (password !== confirmPassword) {
            this.setState({
            alertCont: "Passwords do not match!!",
            alertType: "danger",
            isAlert: true
          })

          setTimeout(() => {
            this.setState({
              alertCont: "",
              alertType: "",
              isAlert: false
            })
          }, 2000);
          return ;
        }
        axios.post("http://localhost:8000/update_user", {
            email: localStorage.getItem("email"),
            password: password,
            name: name
        })
            .then((res) => {
                if (res.status === 200) {
                    this.setState({
                      alertCont: "Profile Updated!!",
                      alertType: "success",
                      isAlert: true
                    })

                    setTimeout(() => {
                      this.setState({
                        alertCont: "",
                        alertType: "",
                        isAlert: false
                      })
                    }, 2000);
                    
                    setTimeout(() => {
                      this.props.navigate("/login");
                    }, 2000);

                }
            }
            )
            .catch((err) => {
                if (err.response.status === 401) {
                    this.setState({
                      alertCont: "User not found!!",
                      alertType: "danger",
                      isAlert: true
                    })
                  }
                  else {
                    this.setState({
                      alertCont: "Error in updating profile!!",
                      alertType: "danger",
                      isAlert: true
                    })
                }

                setTimeout(() => {
                  this.setState({
                    alertCont: "",
                    alertType: "",
                    isAlert: false
                  })
                }, 2000);
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
                mb="150px"
                minHeight="70vh"
            >
              {this.state.isAlert && (
                <div style={{position: "fixed", top: "0px", right: "0px"}}>
                    <div style={{position: "absolute", right: "10px", top: "80px", zIndex: 999, width: "max-content"}} className={`alert alert-${this.state.alertType}`}>
                        {this.state.alertCont}
                    </div>
                </div>
              )}
                <Box paddingRight={isNonMobile ? "100px" : "0"}>
                    <img
                        src="stm-logo-circle.png"
                        height="300px"
                        alt="profile-pic"
                    />
                </Box>
                <Box>
                <form
              className="login__create-container__form-container__form update-form"
              onSubmit={this.handleUpdate}
            >
              <TextField id="outlined-username" label="Username" variant="outlined" sx={{ width: "min(270px, 90vw)" }} 
                value={this.state.name}
                onChange={(e) =>
                  this.setState({
                    name: e.target.value,
                    email: this.state.email,
                    password: this.state.password,
                  })
                }
                required
              />
              <TextField id="outlined-age" label="Age" variant="outlined" sx={{ width: "min(270px, 90vw)" }} 
                value={this.state.age}
                onChange={(e) =>
                  this.setState({
                    ...this.state,
                    age: e.target.value
                  })
                }
                required
              />
              <FormControl fullWidth>
                <InputLabel id="outlined-gender">Gender</InputLabel>
                <Select
                  labelId="outlined-gender"
                  id="outlined-gender-select"
                  value={this.state.gender}
                  label="Gender"
                  onChange={(e) => this.setState({
                    ...this.state,
                    gender: e.target.value
                  })}
                >
                  <MenuItem value="male">Male</MenuItem>
                  <MenuItem value="female">Female</MenuItem>
                  <MenuItem value="trans">Trans</MenuItem>
                </Select>
              </FormControl>
              <TextField id="outlined-company" label="Compnay" variant="outlined" sx={{ width: "min(270px, 90vw)" }} 
                value={this.state.company}
                onChange={(e) =>
                  this.setState({
                    ...this.state,
                    company: e.target.value
                  })
                }
                required
              />
              <TextField id="outlined-role" label="Role" variant="outlined" sx={{ width: "min(270px, 90vw)" }} 
                value={this.state.role}
                onChange={(e) =>
                  this.setState({
                    ...this.state,
                    role: e.target.value
                  })
                }
                required
              />
              <FormControl sx={{ width: "min(270px, 90vw)" }} variant="outlined">
                <InputLabel htmlFor="outlined-password-signup">Password</InputLabel>
                <OutlinedInput
                  id="outlined-password-signup"
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
                <InputLabel htmlFor="outlined-conf-password-signup">Confirm Password</InputLabel>
                <OutlinedInput
                    id="outlined-conf-password-signup"
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
                Update
              </button>
            </form>
                </Box>
            </Box>
        );
    }
}

export default Responsive(UpdatePassword);
