import {
  Box,
  TextField,
  Typography,
  FormControl,
  InputLabel,
  OutlinedInput,
  InputAdornment,
  IconButton,
} from "@mui/material";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import { useState } from "react";
import { Link } from "react-router-dom";
import useMediaQuery from "@mui/material/useMediaQuery";

const Login = () => {

    const isNonMobile = useMediaQuery("(min-width: 400px)");
  const [showPassword, setShowPassword] = useState(false);

  const handleClickShowPassword = () => setShowPassword((show) => !show);

  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };

  return (
    <Box
      m="20px"
      minHeight="70vh"
      display="flex"
      flexDirection="column"
      justifyContent="center"
      alignItems="center"
    >
      <Box
        component="form"
        sx={{
          "& .MuiTextField-root": { mt: "20px", width: "100%" },
        }}
        noValidate
        width={isNonMobile? "300px" : "90%" } 
      >
        <Typography variant="h3"> Login</Typography>
          <Box>
            <TextField
              id="outlined-textarea"
              label="Email"
              placeholder="Email address"
              multiline
            />
            <FormControl sx={{ mt: "10px", width: "100%" }} variant="outlined">
              <InputLabel htmlFor="outlined-adornment-password">
                Password
              </InputLabel>
              <OutlinedInput
                id="outlined-adornment-password"
                type={showPassword ? "text" : "password"}
                placeholder="Password"
                endAdornment={
                  <InputAdornment position="end">
                    <IconButton
                      aria-label="toggle password visibility"
                      onClick={handleClickShowPassword}
                      onMouseDown={handleMouseDownPassword}
                      edge="end"
                    >
                      {showPassword ? <VisibilityOff /> : <Visibility />}
                    </IconButton>
                  </InputAdornment>
                }
                label="Password"
              />
            </FormControl>
            <button className="btn btn-secondary mt-3 mb-2">
                Login
            </button>
            <Box width="70%">
            <Link to="/signup">
                <Typography color="secondary">
                    Create a new profile? Register
                </Typography>
            </Link>
            </Box>
          </Box>
      </Box>
    </Box>
  );
};

export default Login;
