import {
  FormControl,
  InputLabel,
  OutlinedInput,
  InputAdornment,
  IconButton,
  FormHelperText,
} from "@mui/material";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import MailOutlineIcon from "@mui/icons-material/MailOutline";
import PersonOutlineOutlinedIcon from "@mui/icons-material/PersonOutlineOutlined";
import { Component } from "react";
import useMediaQuery from "@mui/material/useMediaQuery";
import httpClient from "../httpClient";
import { useNavigate } from "react-router-dom";
// import Cookies from "js-cookie";

function Responsive(Component) {
  return function WrappedComp(props) {
    const navigate = useNavigate();
    const isNonMobile = useMediaQuery("(min-width: 769px)");
    return <Component {...props} {...{ navigate }} isNonMobile={isNonMobile} />;
  };
}

class Login extends Component {
  constructor(props) {
    super(props);
    this.state = {
      login: false,
      name: "",
      email: "",
      password: "",
      showPassword: false,
      alertType: "",
      alertCont: "",
      isAlert: false
    };
    this.handleFormSubmit = this.handleFormSubmit.bind(this);
  }

  handleFormSubmit(e) {
    e.preventDefault();
    // eslint-disable-next-line
    if(!(/^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/.test(this.state.email))) {
      this.setState({
        alertCont: "Invalid Email!!",
        alertType: "danger",
        isAlert: true
      });
    }
    
    else if(!(/^.{6,}$/.test(this.state.password))) {
      this.setState({
        alertCont: this.state.login? "Password should contain at least 6 characters!!" : "Incorrect Password!!",
        alertType: "danger",
        isAlert: true
      });
    }

    else {
      // console.log(this.state);
      if (!this.state.login) {
        const { email, password } = this.state;
      //   console.log(email, password);
        httpClient
        .post("/login", { email, password })
        .then((res) => {
          if (res.data.message) {
            localStorage.setItem("name", res.data.name);
            localStorage.setItem("email", res.data.user);
            // console.log(Cookies.get("csrftoken"))

            this.setState({
              alertCont: "Login Successfull!!",
              alertType: "success",
              isAlert: true
            })

            setTimeout(() => {
              this.setState({
                alertCont: "",
                alertType: "",
                isAlert: false
              })
            }, 1500);

            setTimeout(() => {
              const { navigate } = this.props;
              navigate("/");
            }, 2000);
          } 
          else {
            this.setState({
              alertCont: "Invalid Credentials",
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
          }
        })
        .catch((err) => {
          // console.log(err);
          this.setState({
            alertCont: "Invalid Credentials",
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
        });
      } 
      
      else {
        const { name, email, password } = this.state;
        // console.log(name, email, password);
        httpClient
        .post("/signup", {name, email, password})
        .then((res) => {
          if (res.status===200) {
            this.setState({
              alertCont: "SignUp Successfull!! You can SignIn now!!",
              alertType: "success",
              isAlert: true
            })

            setTimeout(() => {
              this.setState({
                alertCont: "",
                alertType: "",
                isAlert: false,
                login: false
              })
            }, 2000);
          } 
          
          else {
            this.setState({
              alertCont: "User already exists!!",
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
          }
        })
        .catch((err) => {
          // console.log(err);
          this.setState({
            alertCont: "SignUp failed!!",
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
        });
      }
      
      return;
    }

    setTimeout(() => {
      this.setState({
        alertCont: "",
        alertType: "",
        isAlert: false
      })
    }, 2000);

  }

  render() {
    return (
      <div className="login" id="login-page">
        {this.state.isAlert && (
          <div style={{position: "absolute", top: "0px", right: "0px"}}>
              <div style={{position: "absolute", right: "10px", top: "10px", zIndex: 999, width: "max-content"}} className={`alert alert-${this.state.alertType}`}>
                  {this.state.alertCont}
              </div>
          </div>
        )}
        {/* Side Banner Left or Right */}
        {
            this.props.isNonMobile? (
                <div
                  className={`login__colored-container ${
                    this.state.login
                      ? "login__colored-container--left"
                      : "login__colored-container--right"
                  }`}
                ></div>
            ) : (
                <></>
            )
        }

        {/* Signin Side Banner */}
        {
            this.props.isNonMobile? (

                <div
                className={`login__welcome-back ${
                    this.state.login
                    ? "login__welcome-back--active"
                    : "login__welcome-back--inactive"
                }`}
                >
                <div className="login__welcome-back__logo-container">
                    <img
                    className="login__welcome-back__logo-container--image"
                    src="stm-logo-circle.png"
                    alt="Sum-Up"
                    />
                    <h5 style={{marginTop: "auto", marginLeft: "5px"}}>Sum-Up</h5>
                </div>
                <div className="login__welcome-back__main-container">
                    <div className="login__welcome-back__main-container__text-container">
                    <span className="login__welcome-back__main-container__text-container--title">
                        Welcome Back!
                    </span>
                    <span className="login__welcome-back__main-container__text-container--secondary">
                        To keep sharing your work with us, please log in.
                    </span>
                    </div>
                    <div
                    onClick={() => {
                        this.setState({
                        login: !this.state.login,
                        });
                    }}
                    className="login__welcome-back__main-container__button-container"
                    >
                    Sign In
                    </div>
                </div>
                </div>
            ) : (
                <></>
            )
        }

        {/* Sign Up Page */}
        <div
          className={`login__create-container ${
            this.state.login
              ? "login__create-container--active"
              : "login__create-container--inactive"
          }`}
        >
          Create an Account
          <span className="login__create-container--info-text">
            Use email for your registration
          </span>
          <div className="login__create-container__form-container">
            <form
              className="login__create-container__form-container__form"
              onSubmit={this.handleFormSubmit}
            >
              <FormControl sx={{ width: "min(270px, 90vw)" }} variant="outlined">
                <InputLabel htmlFor="outlined-name">Name</InputLabel>
                <OutlinedInput
                  id="outlined-name"
                  className="login__create-container__form-container__form--name"
                  type="text"
                  autoComplete="username"
                  endAdornment={
                    <InputAdornment position="end">
                      <PersonOutlineOutlinedIcon />
                    </InputAdornment>
                  }
                  label="Name"
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
              </FormControl>
              <FormControl sx={{ width: "min(270px, 90vw)" }} variant="outlined">
                <InputLabel htmlFor="outlined-email-signup">Email</InputLabel>
                <OutlinedInput
                  id="outlined-email-signup"
                  className="login__create-container__form-container__form--email"
                  type="text"
                  autoComplete="email"
                  endAdornment={
                    <InputAdornment position="end">
                      <MailOutlineIcon />
                    </InputAdornment>
                  }
                  label="Email"
                  value={this.state.email}
                  onChange={(e) =>
                    this.setState({
                      name: this.state.name,
                      email: e.target.value,
                      password: this.state.password,
                    })
                  }
                  required
                />
              </FormControl>
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
                <FormHelperText style={{fontSize:"0.8rem"}}>Password should contain atleast 6 characters</FormHelperText>
              </FormControl>
              <button className="login__create-container__form-container__form--submit">
                Sign Up
              </button>
            </form>
            {
                this.props.isNonMobile? (<></>) : (
                    <div 
                        className="login__create-container__form-container--toogle-page-div"
                        onClick={() => {
                            this.setState({
                                login: !this.state.login,
                            });
                        }}
                    ><p>Already had one? Sign In</p></div>
                )
            }
          </div>
        </div>

        {/* Sign In Page */}
        <div
          className={`login__login-container ${
            !this.state.login
              ? "login__login-container--active"
              : "login__login-container--inactive"
          }`}
        >
          <div className="login__login-container__logo-container">
            <img
              className="login__login-container__logo-container--image"
              src="stm-logo-circle.png"
              alt="Sum-Up"
              style={{marginRight: "10px"}}
            />
            Sum-Up
          </div>
          <div className="login__login-container__main-container">
            <span className="login__login-container__main-container--info-text">
              Use email for your login
            </span>
            <div className="login__login-container__main-container__form-container">
              <form
                className="login__login-container__main-container__form-container__form"
                onSubmit={this.handleFormSubmit}
              >
                <FormControl sx={{ width: "min(270px, 90vw)" }} variant="outlined">
                  <InputLabel htmlFor="outlined-email-signin">Email</InputLabel>
                  <OutlinedInput
                    id="outlined-email-signin"
                    className="login__login-container__main-container__form-container__form--email"
                    type="email"
                    value={this.state.email}
                    onChange={(e) =>
                      this.setState({
                        name: this.state.name,
                        email: e.target.value,
                        password: this.state.password,
                      })
                    }
                    autoComplete="email"
                    endAdornment={
                      <InputAdornment position="end">
                        <MailOutlineIcon />
                      </InputAdornment>
                    }
                    label="Email"
                    required
                  />
                </FormControl>
                <FormControl sx={{ width: "min(270px, 90vw)" }} variant="outlined">
                  <InputLabel htmlFor="outlined-password-signin">Password</InputLabel>
                  <OutlinedInput
                    id="outlined-password-signin"
                    className="login__login-container__main-container__form-container__form--password"
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
                <div
                  className="login__login-container__main-container__form-container__form--forgot-password"
                  onClick={() => {
                    this.props.navigate("/reset")
                  }}
                >
                  <p>Forgot Password?</p>
                </div>
                <button className="login__login-container__main-container__form-container__form--submit">
                  Sign In
                </button>
              </form>
              {
                this.props.isNonMobile? (<></>) : (
                    <div 
                        className="login__login-container__main-container__form-container__toogle-page-div"
                        onClick={() => {
                            this.setState({
                                login: !this.state.login,
                            });
                        }}
                    ><p>Create an account? Sign Up</p></div>
                )
              }
            </div>
          </div>
        </div>

        {/* ṢignUp Side Banner */}
        {
            this.props.isNonMobile? (

            <div
            className={`login__hello-container ${
                !this.state.login
                ? "login__hello-container--active"
                : "login__hello-container--inactive"
            }`}
            >
            <div className="login__welcome-back__main-container__text-container">
                <span className="login__welcome-back__main-container__text-container--title">
                Hello, stranger!
                </span>
                <span className="login__welcome-back__main-container__text-container--secondary">
                Enter your personal details and summarize your meets!
                </span>
            </div>
            <div
                onClick={() => {
                this.setState({
                    login: !this.state.login,
                });
                }}
                className="login__welcome-back__main-container__button-container"
            >
                Sign Up
            </div>
            </div>
            ) : (
                <></>
            )
        }
      </div>
    );
  }
}

export default Responsive(Login);
