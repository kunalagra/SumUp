import { useState } from "react";
import { ProSidebar, Menu, MenuItem } from "react-pro-sidebar";
import "react-pro-sidebar/dist/css/styles.css";
import { Box, IconButton, Typography, useTheme } from "@mui/material";
import { Link } from "react-router-dom";
import { tokens } from "../theme";
import LogoutIcon from '@mui/icons-material/Logout';
import MenuOutlinedIcon from "@mui/icons-material/MenuOutlined";

const Sidebar = () => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const [isCollapsed, setIsCollapsed] = useState(false);
  const [selected, setSelected] = useState("Dashboard");
  const lname = localStorage.getItem("lastName");
  const Lname = lname? lname.toString() : "Lastname";
  const fname = localStorage.getItem("firstName");
  const Fname = fname? fname.toString() : "Firstname";
  
  return (
    <Box 
      sx={{
        "& .pro-sidebar-inner": {
          background: `${colors.primary[400]} !important`,
        },
        "& .pro-icon-wrapper": {
          backgroundColor: "transparent !important",
        },
        "& .pro-inner-item": {
          padding: "5px 35px 5px 20px !important",
        },
        "& .pro-inner-item:hover": {
          color: "#868dfb !important",
        },
        "& .pro-menu-item.active": {
          color: "#6870fa !important",
        },
      }}
      minHeight="calc(max(100vh,110vh))"
    >
      <ProSidebar collapsed={isCollapsed}>
        <Menu iconShape="square">
          {/* LOGO AND MENU ICON */}
          <MenuItem
            onClick={() => setIsCollapsed(!isCollapsed)}
            icon={isCollapsed ? <MenuOutlinedIcon /> : undefined}
            style={{
              margin: "10px 0 20px 0",
              color: colors.grey[100],
            }}
          >
            {!isCollapsed && (
              <Box textAlign="right">
                <IconButton onClick={() => setIsCollapsed(!isCollapsed)}>
                  <MenuOutlinedIcon />
                </IconButton>
              </Box>
            )}
          </MenuItem>
          <MenuItem>
            {!isCollapsed && (
              <Box
                display="flex"
                justifyContent="center"
                alignItems="center"
                ml="15px"
              >
                <Typography variant="h2" color={colors.grey[100]}>
                  SUM-UP
                </Typography>
              </Box>
            )}
          </MenuItem>

          {!isCollapsed && (
            <Box sx={{ mb: "25px" }}>
              <Box display="flex" justifyContent="center" alignItems="center">
                <img
                  src="logo192.png"
                  width="100px"
                  height="100px"
                  alt="Patient Profile"
                />
              </Box>
              <Box textAlign="center">
                <Typography
                  variant="h2"
                  color={colors.grey[100]}
                  fontWeight="bold"
                  margin="10px 0 0 0"
                >
                  {Fname} {Lname}
                </Typography>
              </Box>
            </Box>
          )}

          {!isCollapsed && (
            <Box display="flex" justifyContent="center" alignItems="center">
              {/* LOGOUT */}
              <MenuItem
                active={selected === "LOGOUT"}
                style={{ color: colors.grey[100] }}
                onClick={() => setSelected("LOGOUT")}
                icon={<LogoutIcon />}
                >
                <Typography>{"LOGOUT"}</Typography>
                <Link to="login" target="_blank"/>
              </MenuItem>
            </Box>
          )}
        </Menu>
      </ProSidebar>
    </Box>
  );
};

export default Sidebar;