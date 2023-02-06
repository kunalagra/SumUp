import { Box, IconButton, useTheme } from "@mui/material";
import { useContext } from "react";
import { ColorModeContext, tokens } from "../theme";
import LightModeOutlinedIcon from "@mui/icons-material/LightModeOutlined";
import DarkModeOutlinedIcon from "@mui/icons-material/DarkModeOutlined";
import LogoutIcon from "@mui/icons-material/Logout";
import AccountCircleOutlinedIcon from "@mui/icons-material/AccountCircleOutlined";
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
      ></Box>

      <Box
        display="flex"
        justifyContent="space-evenly"
        alignItems="center"
        width="calc(max(17%, 150px))"
      >
        <IconButton onClick={colorMode.toggleColorMode}>
          {theme.palette.mode === "dark" ? (
            <LightModeOutlinedIcon />
          ) : (
            <DarkModeOutlinedIcon />
          )}
        </IconButton>

        <IconButton onClick={() => navigate("/user")}>
          <AccountCircleOutlinedIcon />
        </IconButton>

        <IconButton onClick={() => navigate("/about")}>
          <InfoOutlinedIcon />
        </IconButton>

        <IconButton onClick={() => navigate("/login")}>
          <LogoutIcon />
        </IconButton>
      </Box>
    </Box>
  );
};

export default Navbar;
