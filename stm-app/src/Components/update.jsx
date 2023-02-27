// create update password page and add it to the router
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

class UpdatePassword extends Component {
    constructor(props) {
        super(props);
        this.state = {
            password: "",
            confirmPassword: "",
            error: "",
        };
    }

    handleUpdate = (values) => {
        const { password, confirmPassword } = values;
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
                            password: yup
                                .string()
                                .min(6, "Password must be at least 6 characters")
                                .required("Password is required"),
                            confirmPassword: yup
                                .string()
                                .oneOf([yup.ref("password"), null], "Passwords must match")
                                .required("Confirm Password is required"),
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
                                        <p>Update Password for current Username {localStorage.getItem('email')}</p>
                                    </div>
                                    <Box m="15px 0">
                                        <TextField
                                            id="password"
                                            label="Password"
                                            variant="outlined"
                                            type="password"
                                            value={values.password}
                                            onChange={handleChange}
                                            onBlur={handleBlur}
                                            helperText={errors.password && touched.password && errors.password}
                                            error={errors.password && touched.password}
                                        />
                                    </Box>
                                    <Box m="15px 0">
                                        <TextField
                                            id="confirmPassword"
                                            label="Confirm Password"
                                            variant="outlined"
                                            type="password"
                                            value={values.confirmPassword}
                                            onChange={handleChange}
                                            onBlur={handleBlur}
                                            helperText={errors.confirmPassword && touched.confirmPassword && errors.confirmPassword}
                                            error={errors.confirmPassword && touched.confirmPassword}
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

export default Responsive(UpdatePassword);
