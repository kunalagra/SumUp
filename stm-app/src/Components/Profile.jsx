import { Box, Typography, useTheme, IconButton } from "@mui/material";
import useMediaQuery from "@mui/material/useMediaQuery";
import { useNavigate } from "react-router-dom";
import { tokens } from "../theme";
import KeyboardDoubleArrowRightIcon from '@mui/icons-material/KeyboardDoubleArrowRight';
import PersonIcon from '@mui/icons-material/Person';
import EmailIcon from '@mui/icons-material/Email';
import CalendarMonthIcon from '@mui/icons-material/CalendarMonth';
import BusinessIcon from '@mui/icons-material/Business';
import TransgenderIcon from '@mui/icons-material/Transgender';
import PersonSearchIcon from '@mui/icons-material/PersonSearch';
import StreamIcon from '@mui/icons-material/Stream';
import RefreshIcon from '@mui/icons-material/Refresh';
import axios from "axios";
import { useState } from "react";

const Profile = () => {
    const theme = useTheme();
    const colors = tokens(theme.palette.mode);
    const isNonMobile = useMediaQuery("(min-width: 600px)");
    const navigate = useNavigate();
    if (localStorage.length === 0){
        navigate("/login");
    }
    const [extension, setExtension] = useState(localStorage.getItem('extension') ? localStorage.getItem('extension') : "__");

    return (
        <Box mb="100px" id="profile-page">
            <Box 
                m="20px"
                display="flex"
                flexDirection={isNonMobile? "row" : "column"}
                alignItems="center"
                justifyContent="center"
                mt="70px"
            >
                <Box paddingRight={isNonMobile? "100px": "0"}>
                    <img 
                    src="stm-logo.png"
                    height="300px"
                    alt="profile-pic"
                    style={{borderRadius: "50%"}}
                    />
                </Box>
                <Box className="person-details">
                    <Box m="25px 0 15px 0" className="person-detail">
                        <Typography variant="h4" style={{color: `${theme.palette.mode==="dark"? "rgba(255, 255, 255, 0.6)": "rgba(0, 0, 0, 0.7)"}`}}>
                            <PersonIcon style={{fontSize: "1.2em"}} /> Username: </Typography>
                        <Typography variant="h3" style={{marginLeft: "5px"}}>{localStorage.getItem('name')}</Typography>
                    </Box>
                    <Box m="15px 0" className="person-detail">
                        <Typography variant="h4" style={{color: `${theme.palette.mode==="dark"? "rgba(255, 255, 255, 0.6)": "rgba(0, 0, 0, 0.7)"}`}}>
                            <EmailIcon style={{fontSize: "1.1em"}} /> Mail ID: </Typography>
                        <Typography variant="h3" style={{marginLeft: "5px"}}>{localStorage.getItem('email')}</Typography>
                    </Box>
                    <Box m="15px 0" className="person-detail">
                        <Typography variant="h4" style={{color: `${theme.palette.mode==="dark"? "rgba(255, 255, 255, 0.6)": "rgba(0, 0, 0, 0.7)"}`}}>
                            <CalendarMonthIcon style={{fontSize: "1.1em"}} /> Age: </Typography>
                        <Typography variant="h3" style={{marginLeft: "5px"}}>{localStorage.getItem('age') ? localStorage.getItem('age') : "__"}</Typography>
                    </Box>
                    <Box m="15px 0" className="person-detail">
                        <Typography variant="h4" style={{color: `${theme.palette.mode==="dark"? "rgba(255, 255, 255, 0.6)": "rgba(0, 0, 0, 0.7)"}`}}>
                            <TransgenderIcon style={{fontSize: "1.1em"}} /> Gender: </Typography>
                        <Typography variant="h3" style={{marginLeft: "5px"}}>{localStorage.getItem('gender') ? localStorage.getItem('gender') : "__"}</Typography>
                    </Box>
                    <Box m="15px 0" className="person-detail">
                        <Typography variant="h4" style={{color: `${theme.palette.mode==="dark"? "rgba(255, 255, 255, 0.6)": "rgba(0, 0, 0, 0.7)"}`}}>
                            <BusinessIcon style={{fontSize: "1.1em"}} /> Company: </Typography>
                        <Typography variant="h3" style={{marginLeft: "5px"}}>{localStorage.getItem('company') ? localStorage.getItem('company') : "__"}</Typography>
                    </Box>
                    <Box m="15px 0" className="person-detail">
                        <Typography variant="h4" style={{color: `${theme.palette.mode==="dark"? "rgba(255, 255, 255, 0.6)": "rgba(0, 0, 0, 0.7)"}`}}>
                            <PersonSearchIcon style={{fontSize: "1.1em"}} /> Role: </Typography>
                        <Typography variant="h3" style={{marginLeft: "5px"}}>{localStorage.getItem('role') ? localStorage.getItem('role') : "__"}</Typography>
                    </Box>
                    <Box m="15px 0" className="person-detail">
                        <Typography variant="h4" style={{color: `${theme.palette.mode==="dark"? "rgba(255, 255, 255, 0.6)": "rgba(0, 0, 0, 0.7)"}`}}>
                            <StreamIcon style={{fontSize: "1.1em"}} /> Extension Status: </Typography> 
                        <Typography variant="h3" style={{marginLeft: "5px"}}>{extension}</Typography>
                        <IconButton onClick={() => {axios.post("http://127.0.0.1:8000/get_extension", 
                          {
                            username: localStorage.getItem('email')
                          }
                        ).then((res) => {
                            setExtension(res.data ? "Connected" : "Not Connected");
                            localStorage.setItem('extension', res.data ? "Connected" : "Not Connected");
                            // window.location.reload();
                        }).catch((err) => {
                            setExtension("Not Connected");
                            localStorage.setItem('extension', "Not Connected");
                            // window.location.reload();
                        })}}
                        style={{
                            marginLeft: "10px",
                        }}
                        >
                            <RefreshIcon style={{
                                fontSize: "1em",
                            }}/>
                        </IconButton>
                    </Box>
                    <Box m="15px 0">
                        <button  className="login__create-container__form-container__form--submit"
                            onClick={()=>{
                                navigate('/update')
                            }}
                            style={{
                                backgroundColor: colors.primary[400],
                                marginTop: 0,
                                width: "120px"
                            }}
                        >Update</button>
                    </Box>
                </Box>
            </Box>

            <Box className="view-recent-summaries" style={{color: colors.primary[400]}} onClick={() => {
                    navigate("/recent-summaries")
                }}>
                <div className="view-recent-summaries-div">
                    <h5>View Recent Summaries</h5>
                    <KeyboardDoubleArrowRightIcon className="double-right-icon"/>
                </div>
            </Box>

        </Box>
    )
}

export default Profile;