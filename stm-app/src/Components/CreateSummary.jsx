import { Box, FormLabel, Typography, useTheme } from "@mui/material";
import { tokens } from "../theme";
import httpClient from "../httpClient";
import commonContext from "../Context/commonContext";
import { useContext } from "react";
import { useNavigate } from "react-router-dom";

const CreateSummary = () => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const navigate = useNavigate();

  const { addSummary } = useContext(commonContext);
  const { addPara } = useContext(commonContext);

  const handleSubmit = (event) => {
    let inputPara = document.getElementById("para").value;
    let inputFile = document.getElementById("formFile").files[0];
    let inputAudioFile = document.getElementById("audioFile").files[0];

    let formData = new FormData();
    formData.append("para", inputPara);
    formData.append("file", inputFile);
    formData.append("audioFile", inputAudioFile);

    httpClient.post("/gen_summary", formData).then((response) => {
      const newsummaries = [
        {
          title: "LexRank",
          summary: response.data.extractive.LexRank,
          stars: 0,
          type: "Extractive"
        },
        {
          title: "LSA",
          summary: response.data.extractive["LSA"],
          stars: 0,
          type: "Extractive"
        },
        {
          title: "KL Sum",
          summary: response.data.extractive["KL Sum"],
          stars: 0,
          type: "Extractive"
        },
        {
          title: "Luhn",
          summary: response.data.extractive["Luhn"],
          stars: 0,
          type: "Extractive"
        },
        {
          title: "OpenAI",
          summary: response.data.abstractive["OpenAI"],
          stars: 0,
          type: "Abstractive"
        },
        {
          title: "NLP",
          summary: response.data.abstractive["NLP"],
          stars: 0,
          type: "Abstractive"
        },
      ]
      newsummaries.forEach((summary) => {
        addSummary(summary);
      });

      addPara(response.data.para);

      navigate("/summary");
    });
    event.preventDefault();
  };

  return (
    <Box m="20px auto" p="0 20px" maxWidth="700px" minHeight="80vh">
      <Typography variant="h3" id="heading">
        Input Data
      </Typography>
      <form
        onSubmit={handleSubmit}
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
          ></textarea>
        </Box>

        <Box className="or-line row">
          <div className="col-5">
            <hr></hr>
          </div>
          <div className="col-2">
            <Typography className="text-center" variant="h5">
              OR
            </Typography>
          </div>
          <div className="col-5">
            <hr></hr>
          </div>
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

        <Box className="or-line row">
          <div className="col-5">
            <hr></hr>
          </div>
          <div className="col-2">
            <Typography className="text-center" variant="h5">
              OR
            </Typography>
          </div>
          <div className="col-5">
            <hr></hr>
          </div>
        </Box>

        <Box className="mb-3">
          <FormLabel htmlFor="audioFile" className="form-label">
            Upload the Audio Transcript File {"(.wav / .mp3)"}
          </FormLabel>
          <input
            className="form-control"
            type="file"
            id="audioFile"
            name="audioFile"
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
            color: "white",
          }}
        >
          Load Summary
        </button>
      </form>
    </Box>
  );
};

export default CreateSummary;
