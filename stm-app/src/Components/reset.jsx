import React from "react";
import { Component } from "react";
import { useNavigate } from "react-router-dom";
import useMediaQuery from "@mui/material/useMediaQuery";
import { Box, TextField } from "@mui/material";
import axios from "axios";

function Responsive(Component) {
    return function WrappedComp(props) {
        const navigate = useNavigate();
        const isNonMobile = useMediaQuery("(min-width: 400px)");
        return <Component {...props} {...{ navigate }} isNonMobile={isNonMobile} />;
    };
    }

class ResetPassword extends Component {
    constructor(props) {
        super(props);
        this.state = {
            email: "",
            isAlert: false,
            alertCont: "",
            alertType: ""
        };
        this.handleReset = this.handleReset.bind(this);
    }

    handleReset = (e) => {
        e.preventDefault();

        const { email } = this.state;
        // eslint-disable-next-line
        if(!(/^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/.test(this.state.email))) {
            this.setState({
              alertCont: "Invalid Email!!",
              alertType: "danger",
              isAlert: true
            });
            setTimeout(() => {
                this.setState({
                  alertCont: "",
                  alertType: "",
                  isAlert: false
                })
            }, 2000);
            return;
        }

        axios.post("http://localhost:8000/reset_password", {
            email: email,
        })
            .then((res) => {
                if (res.status === 200) {
                    this.setState({
                        alertCont: "Password sent to your email!!",
                        alertType: "success",
                        isAlert: true
                      });
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
                        alertCont: "Error in updating password!!",
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
        return (
            <Box
                m="20px"
                display="flex"
                flexDirection={this.props.isNonMobile ? "row" : "column"}
                alignItems="center"
                justifyContent="center"
                mt="70px"
                mb="150px"
            >
                {this.state.isAlert && (
                    <div style={{position: "fixed", top: "0px", right: "0px"}}>
                        <div style={{position: "absolute", right: "10px", top: "80px", zIndex: 999, width: "max-content"}} className={`alert alert-${this.state.alertType}`}>
                            {this.state.alertCont}
                        </div>
                    </div>
                )}
                <Box paddingRight={this.props.isNonMobile ? "100px" : "0"}>
                    <img
                        src="stm-logo-circle.png"
                        height="300px"
                        alt="profile-pic"
                    />
                </Box>
                <Box>
                    <form onSubmit={this.handleReset} className="reset-form">
                        <div>
                            <p>Enter email to send the password</p>
                        </div>
                        <TextField
                            id="email"
                            name="email"
                            label="Email"
                            variant="outlined"
                            fullWidth
                            value={this.state.email}
                            onChange={(e) => this.setState({email: e.target.value})}
                            required
                        />
                        <button type="submit" className="login__create-container__form-container__form--submit">
                            Send
                        </button>
                    </form>
                </Box>
            </Box>
        );
    }
}

export default Responsive(ResetPassword);
