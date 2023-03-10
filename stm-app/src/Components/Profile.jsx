import { Box, Typography, useTheme } from "@mui/material";
import useMediaQuery from "@mui/material/useMediaQuery";
import { useNavigate } from "react-router-dom";
import { tokens } from "../theme";
import KeyboardDoubleArrowRightIcon from '@mui/icons-material/KeyboardDoubleArrowRight';
import commonContext from "../Context/commonContext";
import { useContext } from "react";
import httpClient from "../httpClient";

const Profile = () => {
    const theme = useTheme();
    const colors = tokens(theme.palette.mode);
    const isNonMobile = useMediaQuery("(min-width: 600px)");
    const {setLoading, setMySummaries} = useContext(commonContext);
    const navigate = useNavigate();
    if (localStorage.length === 0){
        navigate("/login");
    }

    const handleViewSummaries = () => {

        setLoading(true);
        httpClient.get('/get_data').then((response) => {
            setMySummaries(response.data.recents_sum);
            setLoading(false);
        }).catch((error) => {
            console.log(error);
        })

        navigate("/recent-summaries/");

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
                    src="logo512.png"
                    height="300px"
                    alt="profile-pic"
                    />
                </Box>
                <Box>
                    <Box m="15px 0">
                        <Typography variant="h4">Username</Typography>
                        <Typography variant="h3">{localStorage.getItem('name')}</Typography>
                    </Box>
                    <Box m="15px 0">
                        <Typography variant="h4">Mail ID</Typography>
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

            <Box className="view-recent-summaries" style={{color: colors.primary[400]}} onClick={handleViewSummaries}>
                <div className="view-recent-summaries-div">
                    <h5>View Recent Summaries</h5>
                    <KeyboardDoubleArrowRightIcon className="double-right-icon"/>
                </div>
            </Box>

        </Box>
    )
}

export default Profile;