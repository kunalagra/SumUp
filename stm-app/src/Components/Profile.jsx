import { Box, Typography, Button } from "@mui/material";
import useMediaQuery from "@mui/material/useMediaQuery";
import { useNavigate } from "react-router-dom";

const Profile = () => {
    const isNonMobile = useMediaQuery("(min-width: 600px)");
    const navigate = useNavigate();
    return (
        <Box 
            m="20px"
            display="flex"
            flexDirection={isNonMobile? "row" : "column"}
            alignItems="center"
            justifyContent="center"
            mt="70px"
            minHeight="70vh"
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
                    <Typography variant="h3">{localStorage.getItem('name')}</Typography>
                    <Typography variant="h4">Username</Typography>
                </Box>
                <Box m="15px 0">
                    <Typography variant="h3">{localStorage.getItem('email')}</Typography>
                    <Typography variant="h4">User mail id</Typography>
                </Box>
                <Box m="15px 0">
                    <Button variant="outlined"
                    onClick={() => {
                        navigate("/update");
                    }}
                    >
                    <Typography variant="h6">Update</Typography>
                    </Button>
                </Box>
            </Box>

        </Box>
    )
}

export default Profile;