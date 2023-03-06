import { tokens } from "../theme";
import { Link } from "react-router-dom";
import { Box, Typography, useTheme } from "@mui/material";

const Footer = () => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  return (
    <Box id="footer" backgroundColor={colors.primary[700]}>
      {/* COPYRIGHT */}
      <Typography
        variant="h6"
        textAlign="center"
        sx={{ m: "15px" }}
      >
        © 2023
        <Link to="/" style={{textDecoration: "none", margin: "7px", fontWeight: "bold"}}>
            Sum-Up
        </Link>
        | All Rights Reserved
      </Typography>
    </Box>
  );
};

export default Footer;
