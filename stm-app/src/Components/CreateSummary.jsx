import { Box, FormLabel, Typography, useTheme } from "@mui/material";
import { tokens } from "../theme";
import { useNavigate } from "react-router-dom";
import commonContext from "../Context/commonContext";
import { useContext } from "react";

const CreateSummary = () => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const navigate = useNavigate();

  const { addSummary } = useContext(commonContext);

  const handleSubmit = (event) => {

    // let inputPara = document.getElementById("para").value;
    // let inputFile = document.getElementById("formFile").files[0];
    // let inputAudioFile = document.getElementById("audioFile").files[0];
    // console.log(inputPara);
    // console.log(inputFile);
    // console.log(inputAudioFile);
    // event.preventDefault();

    const newSummaries = [
      {
        title: "LexRank",
        summary: ['Ganesh Utla: Hello.', 'Kunal Agrawal: Thank you.', 'Ganesh Utla: Was that a conscious choice?', "Aman Tiwari: [inaudible 00:27] Ganesh Utla: No, no, That's perfect.", "I didn't really know what I was doing at the time, but at some point, I found out I was having some success with that, and so I started doing it for local businesses and restaurants.", "What kind of challenges did you experience when you were starting out, that you weren't expecting?", "Kunal Agrawal: Hmm, challenges I wasn't expecting.", "Kunal Agrawal: No, it's fine.", 'Kunal Agrawal: Okay, once again Thank you for your time.', 'Ganesh Utla: Same goes for you.'],
        stars: 0,
        type: "Extractive"
      },
      {
        title: "LSA",
        summary: ['This is the second part of the interview and I want to get these as quickly as possible because I know you somewhere between.', 'Ganesh Utla: It says on the website you worked doing graphic design for a local branding agency before branching out and starting your own business.', 'Ganesh Utla: Was that a conscious choice?', 'Was starting your own company international, or did you just sort of fall into it?', 'Kunal Agrawal: Actually, Sort of both.', "Then it kind of took off from there, and I figured, well, if I'm going to be taking on all these new clients I might as well get a website going and make something out of this, you know?", "Kunal Agrawal: Hmm, challenges I wasn't expecting.", 'I keep putting on the spot.', 'Kunal Agrawal: Okay, once again Thank you for your time.', 'Ganesh Utla: Same goes for you.'],
        stars: 0,
        type: "Extractive"
      },
      {
        title: "KL Sum",
        summary: ['Hello.', "It's my pleasure.", 'We can hear the fan.', 'Thanks, Aman.', 'Good.', "I didn't really know what I was doing at the time, but at some point, I found out I was having some success with that, and so I started doing it for local businesses and restaurants.", "What kind of challenges did you experience when you were starting out, that you weren't expecting?", "We're just ad-libbing here.", 'So, challenges.', 'Time to say bye now!'],
        stars: 0,
        type: "Extractive"
      },
      {
        title: "Luhn",
        summary: ['This is the second part of the interview and I want to get these as quickly as possible because I know you somewhere between.', 'Ganesh Utla: It says on the website you worked doing graphic design for a local branding agency before branching out and starting your own business.', 'Ganesh Utla: Was that a conscious choice?', 'Was starting your own company international, or did you just sort of fall into it?', 'I started out doing it as a favour for a friend.', "I didn't really know what I was doing at the time, but at some point, I found out I was having some success with that, and so I started doing it for local businesses and restaurants.", "Then it kind of took off from there, and I figured, well, if I'm going to be taking on all these new clients I might as well get a website going and make something out of this, you know?", "What kind of challenges did you experience when you were starting out, that you weren't expecting?", "Kunal Agrawal: Hmm, challenges I wasn't expecting.", 'Kunal Agrawal: Okay, once again Thank you for your time.'],
        stars: 0,
        type: "Extractive"
      },
      {
        title: "OpenAI",
        summary: ['This was the second part of an interview.', 'Kunal worked as a graphic designer for a local branding agency before branching out and starting his own business.', 'Kunal started his own business as a favour for a friend.', 'Kunal was having success and started taking on new clients.', 'Kunal then created a website for his business.', 'Kunal was asked about unexpected challenges he faced when starting out.', 'Ganesh and Kunal discussed ad-libbing during the interview.', 'Kunal thanked Ganesh for his time.', 'Ganesh thanked Kunal for his time.', 'The interview concluded.'],
        stars: 0,
        type: "Abstractive"
      },
      {
        title: "NLP",
        summary: ['Ganesh Utla: It says on the website you worked doing graphic design for a local branding agency before branching out and starting your own business.', 'This is the second part of the interview and I want to get these as quickly as possible because I know you somewhere between.', "What kind of challenges did you experience when you were starting out, that you weren't expecting?", 'Was starting your own company international, or did you just sort of fall into it?', "I don't think I put that one in the questions either.", "Kunal Agrawal: Hmm, challenges I wasn't expecting.", 'I started out doing it as a favour for a friend.', 'Time to say bye now!', 'Ganesh Utla: Sorry, one sec.', 'I keep putting on the spot.'],
        stars: 0,
        type: "Abstractive"
      },
    ];

    newSummaries.forEach(summ => {
        addSummary(summ);
    });

    navigate("/summary");

  };

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
