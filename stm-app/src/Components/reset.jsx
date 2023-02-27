import React from "react";
import { Component } from "react";
import { useNavigate } from "react-router-dom";
import useMediaQuery from "@mui/material/useMediaQuery";
import { Box, TextField,Button } from "@mui/material";
import axios from "axios";
import { Formik } from "formik";
import * as yup from "yup";

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
            error: "",
        };
    }

    handleUpdate = (values) => {
        const { email } = values;
        axios.post("http://localhost:8000/reset_password", {
            email: email,
        })
            .then((res) => {
                if (res.status === 200) {
                    alert("Password reset link sent to your email");
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
        const { name, email, password, confirmPassword } = this.state;
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
                    <Formik
                        initialValues={{
                            name: name,
                            email: email,
                            password: password,
                            confirmPassword: confirmPassword,
                        }}
                        validationSchema={yup.object().shape({
                            email: yup.string().email().required("Email is required"),
                        })}
                        onSubmit={this.handleUpdate}
                    >
                        {(props) => {
                            const {
                                values,
                                touched,
                                errors,
                                handleChange,
                                handleBlur
                            } = props;
                            return (
                                <form onSubmit={props.handleSubmit}>
                                    <div>
                                        <p>Reset your password</p>
                                    </div>
                                    <Box m="15px 0">
                                        <TextField
                                            id="email"
                                            name="email"
                                            label="Email"
                                            variant="outlined"
                                            fullWidth
                                            value={values.email}
                                            onChange={handleChange}
                                            onBlur={handleBlur}
                                            error={errors.email && touched.email}
                                            helperText={errors.email && touched.email && errors.email}
                                        />
                                    </Box>
                                    <Box m="15px 0">
                                        <Button
                                            variant="contained"
                                            type="submit"
                                            color="primary"
                                        >
                                            Update
                                        </Button>
                                    </Box>
                                </form>
                            );
                        }}
                    </Formik>
                </Box>
            </Box>
        );
    }
}

export default Responsive(ResetPassword);
