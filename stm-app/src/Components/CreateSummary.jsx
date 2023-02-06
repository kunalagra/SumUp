import { Box, FormLabel, Typography, useTheme } from "@mui/material";
import { tokens } from "../theme";
import { useState } from "react";

const CreateSummary = () => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const [para, setPara] = useState("");

  const handleChange = (event) => {
    setPara(event.target.value);
  };

  const handleSubmit = () => {
    console.log(para);
  };
  //   const isNonMobile = useMediaQuery("(min-width: 600px)");
  return (
    <Box m="20px auto" p="0 20px" maxWidth="700px" minHeight="80vh">
      <Typography variant="h3" id="heading">
        Input Data
      </Typography>
      <form
        onSubmit={handleSubmit}
        action="/submit"
        method="post"
        id="input-form"
        encType="multipart/form-data"
      >
        <Box className="mb-3">
          <FormLabel htmlFor="para" className="form-label mb-3">
            Paste the Transcript
          </FormLabel>
          <textarea
            id="para"
            className="form-control mb-3"
            name="para"
            rows="10"
            cols="50"
            style={{
              border: `2px solid ${colors.grey[900]}`,
              backgroundColor: `${colors.primary[800]}`,
              color: `${colors.grey[100]}`,
            }}
            onChange={handleChange}
          ></textarea>
        </Box>

        <Box className="or-line row">
          <div className="col-5"><hr></hr></div>
          <div className="col-2">
          <Typography className="text-center" variant="h5">OR</Typography>
          </div>
          <div className="col-5"><hr></hr></div>
        </Box>

        <Box className="mb-3">
          <FormLabel htmlFor="formFile" className="form-label">
            Upload the Transcript File {"(.txt / .docx)"}
          </FormLabel>
          <input
            className="form-control"
            type="file"
            id="formFile"
            name="formFile"
            style={{
              border: `2px solid ${colors.grey[900]}`,
              backgroundColor: `${colors.primary[800]}`,
              color: `${colors.grey[100]}`,
            }}
          ></input>
        </Box>
        <button
          type="submit"
          className="btn"
          style={{ 
            backgroundColor: `${colors.blueAccent[500]}`,
            color: "white"
            }}
        >
          Load Summary
        </button>
      </form>
    </Box>
  );
};

export default CreateSummary;
