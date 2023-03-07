import { Box, FormLabel, Typography, useTheme } from "@mui/material";
import { tokens } from "../theme";
import commonContext from "../Context/commonContext";
import { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import Preloader from "./Preloader";

const CreateSummary = () => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const navigate = useNavigate();
  const { isLoading, setLoading } = useContext(commonContext); 
  const [alertType, setAlertType] = useState("");
  const [alertCont, setAlertCont] = useState("");
  const [isAlert, setIsAlert] = useState(false);

  if (localStorage.length === 0){
    navigate("/login");
  }

  const { setSummary, setParagraph } = useContext(commonContext);

  const [para, setPara] = useState("");
  const [transcript, setTranscript] = useState(null);
  const [model, setModel] = useState("open-ai");

  const handleSubmit = (event) => {
    event.preventDefault();

    let formData = new FormData();
    formData.append("para", para);
    formData.append("file", transcript);
    formData.append("model", model);

    // console.log(formData);
    setLoading(true);
    axios.post("http://localhost:8000/gen_summary", formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    })
    .then((response) => {
      const newsummary = {
          title: model==="open-ai"? "OpenAI":"BERT",
          summary: model==="open-ai"? response.data["OpenAI"]: response.data["BERT"],
          type: "Abstractive"
        }

      setSummary(newsummary);
      setParagraph(response.data.para);

      axios.post("http://127.0.0.1:8000/recent_data", {
        email: localStorage.getItem("email"),
        data: {
          transcript: response.data.para,
          summary: newsummary.summary
        }
      })

      setLoading(false);
      // console.log(newsummary);
      navigate("/summary");
    })
    .catch(e => {
      setLoading(false);
      setAlertCont("Something went wrong!!");
      setAlertType("danger");
      setIsAlert(true);
      setPara("");
      setTranscript(null);

      setTimeout(() => {
        setIsAlert(false);
        setAlertCont("");
        setAlertType("");
      }, 2000);
    });
    
    // event.preventDefault();
  };

  return (
    <>
      {isAlert && (
          <div style={{position: "absolute", right: "10px", top: "80px", zIndex: 999}} className={`alert alert-${alertType}`}>
            {alertCont}
          </div>
      )}
      {
        isLoading? (
          <Preloader cont="Please wait... It may take some time upto 15 minutes based on the file size" />
        ) : (
          <Box m="20px auto" p="0 20px" id="create-summ-page">
            <Typography variant="h3" id="heading" className="text-center">
              Summarize your Meet!
            </Typography>
            <form
              onSubmit={handleSubmit}
              id="input-form"
              encType="multipart/form-data"
            >
              <Box className="create-summ-form" sx={{
                "input, textarea, select": {
                  "&:hover, &:active, &:focus" : {
                      outline: `3px solid ${theme.palette.mode==='dark'? colors.primary[800] : colors.primary[100]}`
                  }
                }
              }}>
                <Box className="textarea-div">
                  <FormLabel htmlFor="para" className="form-label mb-3">
                    Paste the Transcript
                  </FormLabel>
                  <textarea
                    id="para"
                    className="form-control mb-3"
                    name="para"
                    style={{
                      border: `2px solid ${colors.primary[700]}`,
                      backgroundColor: "var(--light-color-5)",
                      color: "var(--dark-color-6)",
                    }}
                    onChange={(e) => setPara(e.target.value)}
                    disabled={transcript !== null}
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

                  <Box className="mb-3" sx={{
                    "&button" : {
                      backgroundColor: `${colors.primary[700]}`,
                      color: "var(--dark-color-7)",
                      
                      "&:hover" : {
                        backgroundColor: `${colors.primary[400]}`,
                      }
                    }
                  }}>
                    <FormLabel htmlFor="formFile" className="form-label">
                      Upload the Transcript File {"(.txt / .docx / .mp3 / .wav / .mp4 / etc)"}
                    </FormLabel>
                    <input
                      className="form-control"
                      type="file"
                      id="formFile"
                      name="formFile"
                      accept=".doc, .txt, .docx, .mp3, .mp4, .mkv, .wav, .flac, .avi"
                      style={{
                        border: `2px solid ${colors.primary[700]}`,
                        backgroundColor: "var(--light-color-5)",
                        color: "var(--dark-color-6)",
                      }}
                      onChange={(e) => setTranscript(e.target.files[0]?  e.target.files[0] : null)}
                      disabled={para !== ""}
                      required
                    ></input>
                  </Box>

                  <Box className="mb-3 select-input-div" sx={{

                  }}>
                    <FormLabel htmlFor="formFile" className="form-label select-input-label">
                      Select model {"(optional)"}
                    </FormLabel>
                    <select
                      className="form-control select-input"
                      id="model"
                      name="model"
                      style={{
                        border: `2px solid ${colors.primary[700]}`,
                        backgroundColor: "var(--light-color-5)",
                        color: "var(--dark-color-6)",
                      }}
                      onChange={(e) => setModel(e.target.value)}
                      value={model}
                    >
                      <option value="open-ai" className="select-input-option">OpenAI</option>
                      <option value="bert" className="select-input-option">BERT</option>
                    </select>
                  </Box>
                </Box>
              </Box>
              <button
                type="submit"
                className="btn"
              >
                Load Summary
              </button>
            </form>
          </Box>
        )
      }
    </>
  );
};

export default CreateSummary;
