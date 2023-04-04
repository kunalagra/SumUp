import { Box, Typography, useTheme } from "@mui/material";
import useMediaQuery from "@mui/material/useMediaQuery";
import { useNavigate } from "react-router-dom";
import { tokens } from "../theme";
import KeyboardDoubleArrowRightIcon from '@mui/icons-material/KeyboardDoubleArrowRight';
import PersonIcon from '@mui/icons-material/Person';
import EmailIcon from '@mui/icons-material/Email';

const Profile = () => {
    const theme = useTheme();
    const colors = tokens(theme.palette.mode);
    const isNonMobile = useMediaQuery("(min-width: 600px)");
    const navigate = useNavigate();
    if (localStorage.length === 0){
        navigate("/login");
    }

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
                <Box>
                    <Box m="15px 0">
                        <Typography variant="h4" style={{color: `${theme.palette.mode==="dark"? "rgba(255, 255, 255, 0.6)": "rgba(0, 0, 0, 0.7)"}`}}>
                            <PersonIcon style={{fontSize: "1.2em"}} /> Username</Typography>
                        <Typography variant="h3">{localStorage.getItem('name')}</Typography>
                    </Box>
                    <Box m="15px 0">
                        <Typography variant="h4" style={{color: `${theme.palette.mode==="dark"? "rgba(255, 255, 255, 0.6)": "rgba(0, 0, 0, 0.7)"}`}}>
                            <EmailIcon style={{fontSize: "1.1em"}} /> Mail ID</Typography>
                        <Typography variant="h3">{localStorage.getItem('email')}</Typography>
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