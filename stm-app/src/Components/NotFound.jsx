import { Box, Typography, useTheme } from "@mui/material";
import { tokens } from "../theme";
import WarningAmberIcon from '@mui/icons-material/WarningAmber';

const NotFound = () => {
    const theme = useTheme();
    const colors = tokens(theme.palette.mode);

    return (
        <Box 
            m="20px"
            display="flex"
            flexDirection="column"
            alignItems="center"
            mt="100px"
            minHeight="85vh"
        >
            <Box 
                display="flex"
                alignItems="center"
                justifyContent="center"
            >
                <WarningAmberIcon sx={{ mr: "10px", fontSize:"100px"}}/>
            <Typography
                variant="h1"
                color={colors.grey[100]}
                fontSize="100px"
            >
                404
            </Typography>
            </Box>
            <Typography
                variant="h1"
                color="secondary"
            >
                {"< Page not Found />"}
            </Typography>

        </Box>
    )

}

export default NotFound;