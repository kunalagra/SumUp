import { tokens } from "../theme";
import { Link } from "react-router-dom";
import { Box, Typography, useTheme } from "@mui/material";

const Footer = () => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  return (
    <Box>
      {/* COPYRIGHT */}
      <Typography
        variant="h6"
        color={colors.grey[300]}
        textAlign="center"
        sx={{ m: "15px" }}
      >
        © 2022
        <Link to="/" style={{textDecoration: "none", color: `${colors.greenAccent[500]}`, margin: "7px"}}>
            Sum-Up
        </Link>
        | All Rights Reserved
      </Typography>
    </Box>
  );
};

export default Footer;
