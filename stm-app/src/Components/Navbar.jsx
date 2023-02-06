import {
  Box,
  IconButton,
  Typography,
  useTheme,
  Tooltip,
  Collapse,
  List,
  ListItemIcon,
  ListItemButton,
  ListItemText,
  colors,
} from "@mui/material";
import React, { useContext, useState } from "react";
import { ColorModeContext, tokens } from "../theme";
import LightModeOutlinedIcon from "@mui/icons-material/LightModeOutlined";
import DarkModeOutlinedIcon from "@mui/icons-material/DarkModeOutlined";
import LogoutIcon from "@mui/icons-material/Logout";
import AccountCircleOutlinedIcon from "@mui/icons-material/AccountCircleOutlined";
import SummarizeOutlinedIcon from "@mui/icons-material/SummarizeOutlined";
import InfoOutlinedIcon from "@mui/icons-material/InfoOutlined";
import { useNavigate } from "react-router-dom";
import useMediaQuery from "@mui/material/useMediaQuery";
import MenuOpenIcon from "@mui/icons-material/MenuOpen";
import MenuIcon from "@mui/icons-material/Menu";

const Sidebar = () => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const colorMode = useContext(ColorModeContext);
  const navigate = useNavigate();

  return (
    <Box zIndex="999" width="200px" position="absolute" right="0" backgroundColor={colors.primary[400]}>
      <Collapse in={true} timeout="auto" unmountOnExit>
        <List component="div" disablePadding>
          <ListItemButton sx={{ pl: 4, pb: 1 }} onClick={colorMode.toggleColorMode}>
            <ListItemIcon>
              {theme.palette.mode === "dark" ? (
                <LightModeOutlinedIcon />
              ) : (
                <DarkModeOutlinedIcon />
              )}
            </ListItemIcon>
            <ListItemText primary="Change Theme" />
          </ListItemButton>

          <ListItemButton sx={{ pl: 4, pb: 1 }} onClick={() => navigate("/summarize")}>
            <ListItemIcon>
              <SummarizeOutlinedIcon />
            </ListItemIcon>
            <ListItemText primary="Summarize" />
          </ListItemButton>

          <ListItemButton sx={{ pl: 4, pb: 1 }} onClick={() => navigate("/user")}>
            <ListItemIcon>
              <AccountCircleOutlinedIcon />
            </ListItemIcon>
            <ListItemText primary="Profile" />
          </ListItemButton>

          <ListItemButton sx={{ pl: 4, pb: 1 }} onClick={() => navigate("/about")}>
            <ListItemIcon>
              <InfoOutlinedIcon />
            </ListItemIcon>
            <ListItemText primary="About Us" />
          </ListItemButton>

          <ListItemButton sx={{ pl: 4, pb: 1 }} onClick={() => navigate("/login")}>
            <ListItemIcon>
              <LogoutIcon />
            </ListItemIcon>
            <ListItemText primary="Log Out" />
          </ListItemButton>
        </List>
      </Collapse>
    </Box>
  );
};

const Navbar = () => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const colorMode = useContext(ColorModeContext);
  const navigate = useNavigate();
  const [open, setOpen] = useState(true);
  const isNonMobile = useMediaQuery("(min-width: 500px)");

  const handleClick = () => {
    setOpen(!open);
  };

  return (
    <React.Fragment>
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
            cursor: "pointer",
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

        {isNonMobile ? (
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
              <IconButton onClick={() => navigate("/summarize")}>
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
        ) : (
          <IconButton onClick={handleClick}>
            {open ? <MenuIcon /> : <MenuOpenIcon />}
          </IconButton>
        )}
      </Box>
      {open && <Sidebar />}
    </React.Fragment>
  );
};

export default Navbar;
