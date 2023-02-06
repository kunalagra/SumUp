import { Box, IconButton, Typography, useTheme, Tooltip } from "@mui/material";
import { useContext } from "react";
import { ColorModeContext, tokens } from "../theme";
import LightModeOutlinedIcon from "@mui/icons-material/LightModeOutlined";
import DarkModeOutlinedIcon from "@mui/icons-material/DarkModeOutlined";
import LogoutIcon from "@mui/icons-material/Logout";
import AccountCircleOutlinedIcon from "@mui/icons-material/AccountCircleOutlined";
import SummarizeOutlinedIcon from '@mui/icons-material/SummarizeOutlined';
import InfoOutlinedIcon from "@mui/icons-material/InfoOutlined";
import { useNavigate } from "react-router-dom";

const Navbar = () => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const colorMode = useContext(ColorModeContext);
  const navigate = useNavigate();
  return (
    <Box
      display="flex"
      justifyContent="space-between"
      p={2}
      position="sticky"
      top="0"
      backgroundColor={colors.primary[400]}
      zIndex="999"
    >
      <Box
        display="flex"
        backgroundColor={colors.primary[400]}
        borderRadius="3px"
        alignItems="center"
        justifyContent="center"
        sx={{
          cursor: "pointer"
        }}
      >
        <Box>
          <img
            src="logo192.png"
            width="fit-content"
            height="35px"
            alt="Logo"
          />
        </Box>
        <Typography variant="h3" ml="10px">
          Sum-Up
        </Typography>

      </Box>

      <Box
        display="flex"
        justifyContent="space-evenly"
        alignItems="center"
        width="calc(max(17%, 150px))"
      >
      
      <Tooltip title="Change Theme">
        <IconButton onClick={colorMode.toggleColorMode}>
          {theme.palette.mode === "dark" ? (
            <LightModeOutlinedIcon />
          ) : (
            <DarkModeOutlinedIcon />
          )}
        </IconButton>
      </Tooltip>
      
      <Tooltip title="Summarize">
        <IconButton onClick={() => navigate("/create")}>
          <SummarizeOutlinedIcon />
        </IconButton>
      </Tooltip>
      
      <Tooltip title="Profile">
        <IconButton onClick={() => navigate("/user")}>
          <AccountCircleOutlinedIcon />
        </IconButton>
      </Tooltip>

      <Tooltip title="About">
        <IconButton onClick={() => navigate("/about")}>
          <InfoOutlinedIcon />
        </IconButton>
      </Tooltip>

      <Tooltip title="Logout">
        <IconButton onClick={() => navigate("/login")}>
          <LogoutIcon />
        </IconButton>
      </Tooltip>
      </Box>
    </Box>
  );
};

export default Navbar;
