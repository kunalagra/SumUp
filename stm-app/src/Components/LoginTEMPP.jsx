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

class LoginTEMPP extends Component {
  constructor(props) {
    super(props);
    this.state = {
      login: false,
      name: "",
      email: "",
      password: "",
      showPassword: false,
    };
    this.handleFormSubmit = this.handleFormSubmit.bind(this);
  }

  handleFormSubmit(e) {
    e.preventDefault();

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
          const { navigate } = this.props;
          navigate("/summarize");
        } else {
              alert("Invalid Credentials");
        }
      })
      .catch((err) => {
        console.log(err);
      });
    } 
    
    else {
      const { name, email, password } = this.state;
      // console.log(name, email, password);
      httpClient
      .post("/signup", {name, email, password})
      .then((res) => {
        if (res.data.message) {
          console.log(res.data);
        } else {
          alert("Invalid Credentials");
        }
      })
      .catch((err) => {
        console.log(err);
      });
    }
  }

  render() {
    return (
      <div className="login">
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
                    src="logo.png"
                    alt="Budwriter"
                    />
                    <h5>STM-Quad</h5>
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
          <div className="login__create-container__social-container">
            <img
              className="login__create-container__social-container--facebook-icon"
              src="facebook.svg"
              alt=""
            />
            <img
              className="login__create-container__social-container--google-icon"
              src="google.svg"
              alt=""
            />
            <img
              className="login__create-container__social-container--linkedin-icon"
              src="linkedin.svg"
              alt=""
            />
          </div>
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
                <InputLabel htmlFor="outlined-email">Email</InputLabel>
                <OutlinedInput
                  id="outlined-email"
                  className="login__create-container__form-container__form--email"
                  type="text"
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
                <InputLabel htmlFor="outlined-password">Password</InputLabel>
                <OutlinedInput
                  id="outlined-password"
                  className="login__create-container__form-container__form--password"
                  type={this.state.showPassword ? "text" : "password"}
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
                <FormHelperText style={{fontSize:"0.8rem"}}>Password should contain atleast 4 characters</FormHelperText>
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
              src="logo.png"
              alt="Budwriter"
            />
            STM-Quad
          </div>
          <div className="login__login-container__main-container">
            <div className="login__login-container__main-container__social-container">
              <img
                className="login__login-container__main-container__social-container--facebook-icon"
                src="facebook.svg"
                alt=""
              />
              <img
                className="login__login-container__main-container__social-container--google-icon"
                src="google.svg"
                alt=""
              />
              <img
                className="login__login-container__main-container__social-container--linkedin-icon"
                src="linkedin.svg"
                alt=""
              />
            </div>
            <span className="login__login-container__main-container--info-text">
              Use email for your login
            </span>
            <div className="login__login-container__main-container__form-container">
              <form
                className="login__login-container__main-container__form-container__form"
                onSubmit={this.handleFormSubmit}
              >
                <FormControl sx={{ width: "min(270px, 90vw)" }} variant="outlined">
                  <InputLabel htmlFor="outlined-email">Email</InputLabel>
                  <OutlinedInput
                    id="outlined-email"
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
                  <InputLabel htmlFor="outlined-password">Password</InputLabel>
                  <OutlinedInput
                    id="outlined-password"
                    className="login__login-container__main-container__form-container__form--password"
                    type={this.state.showPassword ? "text" : "password"}
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

export default Responsive(LoginTEMPP);
