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
} from "@mui/material";
import React, { useContext, useState } from "react";
import { ColorModeContext, tokens } from "../theme";
import LightModeOutlinedIcon from "@mui/icons-material/LightModeOutlined";
import DarkModeOutlinedIcon from "@mui/icons-material/DarkModeOutlined";
import LogoutIcon from "@mui/icons-material/Logout";
import AccountCircleOutlinedIcon from "@mui/icons-material/AccountCircleOutlined";
import PeopleAltOutlinedIcon from '@mui/icons-material/PeopleAltOutlined';
import { useNavigate } from "react-router-dom";
import useMediaQuery from "@mui/material/useMediaQuery";
import MenuOpenIcon from "@mui/icons-material/MenuOpen";
import MenuIcon from "@mui/icons-material/Menu";
import httpClient from "../httpClient";
import ControlPointIcon from '@mui/icons-material/ControlPoint';

const Sidebar = () => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const colorMode = useContext(ColorModeContext);
  const navigate = useNavigate();

  return (
    <Box zIndex="999" width="100vw" position="sticky" top="67.28px" backgroundColor={colors.primary[700]} id="side-bar">
      <Collapse in={true} timeout="auto" className="sidebar-collapse" unmountOnExit>
        <List component="div" className="sidebar-collapse-list" disablePadding>
          <ListItemButton sx={{ pl: 4, pb: 1 }} onClick={colorMode.toggleColorMode} className="list-item">
            <ListItemIcon className="list-item-icon">
              {theme.palette.mode === "dark" ? (
                <LightModeOutlinedIcon />
              ) : (
                <DarkModeOutlinedIcon />
              )}
            </ListItemIcon>
            <ListItemText primary="Change Theme" className="list-item-text" />
          </ListItemButton>

          <ListItemButton sx={{ pl: 4, pb: 1 }} onClick={() => navigate("/my-teams")} className="list-item">
            <ListItemIcon className="list-item-icon">
              <PeopleAltOutlinedIcon />
            </ListItemIcon>
            <ListItemText primary="My Teams" className="list-item-text" />
          </ListItemButton>

          <ListItemButton sx={{ pl: 4, pb: 1 }} onClick={() => navigate("/summarize")} className="list-item">
            <ListItemIcon className="list-item-icon">
              <ControlPointIcon />
            </ListItemIcon>
            <ListItemText primary="Summarize" className="list-item-text" />
          </ListItemButton>

          <ListItemButton sx={{ pl: 4, pb: 1 }} onClick={() => navigate("/user")} className="list-item">
            <ListItemIcon className="list-item-icon">
              <AccountCircleOutlinedIcon />
            </ListItemIcon>
            <ListItemText primary="Profile" className="list-item-text" />
          </ListItemButton>

          <ListItemButton sx={{ pl: 4, pb: 1 }} onClick={() => {
            colorMode.toggleColorMode();
            navigate("/login")
          }} className="list-item">
            <ListItemIcon className="list-item-icon">
              <LogoutIcon />
            </ListItemIcon>
            <ListItemText primary="Log Out" className="list-item-text"/>
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
  const [open, setOpen] = useState(false);
  const isNonMobile = useMediaQuery("(min-width: 500px)");

  const handleClick = () => {
    setOpen(!open);
  };

  return (
    <React.Fragment >
      <Box
        display="flex"
        justifyContent="space-between"
        p={2}
        position="sticky"
        top="0"
        backgroundColor={colors.primary[700]}
        zIndex="999"
        color="#fcfcfc"
        id="navbar"
      >
        <Box
          display="flex"
          backgroundColor={colors.primary[700]}
          borderRadius="3px"
          alignItems="center"
          justifyContent="center"
          sx={{
            cursor: "pointer",
          }}
          onClick={() => navigate("/")}
        >
          <Box>
            <img
              src="stm-logo.png"
              width="fit-content"
              height="35px"
              alt="Logo"
              style={{borderRadius: "50px"}}
            />
          </Box>
          <Typography variant="h3" ml="10px">
            Sum-Up
          </Typography>
        </Box>

        {
          (localStorage.getItem("name")===null || localStorage.getItem("name")===undefined) ? (
            <Box 
              display="flex"
              justifyContent="space-evenly"
              alignItems="center"
              width="calc(max(15%, 150px))"
              id="nav-links"
            >
              <Tooltip title="Change Theme">
                <IconButton onClick={colorMode.toggleColorMode} className="nav-links-btn">
                  {theme.palette.mode === "dark" ? (
                    <LightModeOutlinedIcon />
                  ) : (
                    <DarkModeOutlinedIcon />
                  )}
                </IconButton>
              </Tooltip>
              <button className="get-started-btn" onClick={() => navigate("/login")}>Get Started</button>
            </Box>
          ) : (

        isNonMobile ? (
          <Box
            display="flex"
            justifyContent="space-evenly"
            alignItems="center"
            width="calc(max(21%, 170px))"
            id="nav-links"
          >
            <Tooltip title="Change Theme">
              <IconButton onClick={colorMode.toggleColorMode} className="nav-links-btn">
                {theme.palette.mode === "dark" ? (
                  <LightModeOutlinedIcon />
                ) : (
                  <DarkModeOutlinedIcon />
                )}
              </IconButton>
            </Tooltip>

            <Tooltip title="My Teams">
              <IconButton onClick={() => navigate("/my-teams")} className="nav-links-btn">
                <PeopleAltOutlinedIcon />
              </IconButton>
            </Tooltip>

            <Tooltip title="Summarize">
              <IconButton onClick={() => navigate("/summarize")} className="nav-links-btn">
                <ControlPointIcon />
              </IconButton>
            </Tooltip>

            <Tooltip title="Profile">
              <IconButton onClick={() => navigate("/user")} className="nav-links-btn">
                <AccountCircleOutlinedIcon />
              </IconButton>
            </Tooltip>

            <Tooltip title="Logout">
              <IconButton className="nav-links-btn" onClick={() => {
                httpClient.get('/logout').then((res) => {
                  if (res.data.message) {
                    if(theme.palette.mode==="dark"){
                      colorMode.toggleColorMode();
                    }
                    localStorage.clear();
                    navigate("/login")
                  }
                  else {
                    alert("User not found");
                  }
              }).catch((err) => {
                  console.log(err);
              });
              }}>
                <LogoutIcon />
              </IconButton>
            </Tooltip>
          </Box>
        ) : (
          <IconButton onClick={handleClick} className="nav-links-btn">
            {open ? <MenuIcon /> : <MenuOpenIcon />}
          </IconButton>
        )
        
        )}
      </Box>
      {!(localStorage.getItem("name")===null || localStorage.getItem("name")===undefined) && open && <Sidebar />}
    </React.Fragment>
  );
};

export default Navbar;
