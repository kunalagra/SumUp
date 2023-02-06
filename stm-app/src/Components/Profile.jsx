import { Box, Typography, Button } from "@mui/material";
import useMediaQuery from "@mui/material/useMediaQuery";

const Profile = () => {
    const isNonMobile = useMediaQuery("(min-width: 600px)");
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
                    <Typography variant="h3">Name</Typography>
                    <Typography variant="h4">Username</Typography>
                </Box>
                <Box m="15px 0">
                    <Typography variant="h3">Email</Typography>
                    <Typography variant="h4">User mail id</Typography>
                </Box>
                <Box m="15px 0">
                    <Button variant="outlined">
                    <Typography variant="h6">Update</Typography>
                    </Button>
                </Box>
            </Box>

        </Box>
    )
}

export default Profile;