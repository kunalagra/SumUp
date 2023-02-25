import { Box, FormLabel, Typography, useTheme } from "@mui/material";
import { tokens } from "../theme";
// import httpClient from "../httpClient";
import commonContext from "../Context/commonContext";
import { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const CreateSummary = () => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const navigate = useNavigate();

  const { addSummary } = useContext(commonContext);
  const { addPara } = useContext(commonContext);
  const { clearSummaries, clearPara } = useContext(commonContext);

  const [para, setPara] = useState("");
  const [transcript, setTranscript] = useState(null);
  const [audio, setAudio] = useState(null);
  const [video, setVideo] = useState(null);

  const handleSubmit = (event) => {
    event.preventDefault();

    let formData = new FormData();
    formData.append("para", para);
    formData.append("file", transcript);
    formData.append("audio", audio);
    formData.append("video", video);

    // console.log(formData);

    axios.post("http://localhost:8000/gen_summary", formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    })
    .then((response) => {
      const newsummaries = [
        // {
        //   title: "LexRank",
        //   summary: response.data.extractive.LexRank,
        //   stars: 0,
        //   type: "Extractive"
        // },
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
        // {
        //   title: "Luhn",
        //   summary: response.data.extractive["Luhn"],
        //   stars: 0,
        //   type: "Extractive"
        // },
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

      clearSummaries();
      clearPara();
      newsummaries.forEach((summary) => {
        addSummary(summary);
      });

      addPara(response.data.para);

      navigate("/summary");
    });
    // event.preventDefault();
  };

  return (
    <Box m="20px auto" p="0 20px" id="create-summ-page">
      <Typography variant="h3" id="heading">
        Input Data
      </Typography>
      <form
        onSubmit={handleSubmit}
        id="input-form"
        encType="multipart/form-data"
      >
        <Box className="create-summ-form">
          <Box className="textarea-div">
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
              onChange={(e) => setPara(e.target.value)}
              disabled={audio !== null || transcript !== null || video !== null}
              required
            ></textarea>
          </Box>

          <Box className="media-div">
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
                accept=".doc, .txt, .docx"
                style={{
                  border: `2px solid ${colors.grey[900]}`,
                  backgroundColor: `${colors.primary[800]}`,
                  color: `${colors.grey[100]}`,
                }}
                onChange={(e) => setTranscript(e.target.files[0]?  e.target.files[0] : null)}
                disabled={para !== "" || audio !== null || video !== null}
                required
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
                accept="audio/*"
                id="audioFile"
                name="audioFile"
                style={{
                  border: `2px solid ${colors.grey[900]}`,
                  backgroundColor: `${colors.primary[800]}`,
                  color: `${colors.grey[100]}`,
                }}
                onChange={(e) => setAudio(e.target.files[0]?  e.target.files[0] : null)}
                disabled={para !== "" || transcript !== null || video !== null}
                required
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
              <FormLabel htmlFor="videoFile" className="form-label">
                Upload the Video Transcript File {"(.mp4, etc)"}
              </FormLabel>
              <input
                className="form-control"
                type="file"
                accept="video/*"
                id="videoFile"
                name="videoFile"
                style={{
                  border: `2px solid ${colors.grey[900]}`,
                  backgroundColor: `${colors.primary[800]}`,
                  color: `${colors.grey[100]}`,
                }}
                onChange={(e) => setVideo(e.target.files[0]?  e.target.files[0] : null)}
                disabled={para !== "" || transcript !== null || audio !== null}
                required
              ></input>
            </Box>
          </Box>
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
