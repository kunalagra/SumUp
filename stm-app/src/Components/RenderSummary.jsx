import React, {useContext, useRef} from "react";
import {
  Box,
  Card,
  CardHeader,
  CardContent,
  Typography,
  useTheme,
  List,
  ListItem,
  ListItemText,
  Tooltip,
  IconButton,
  ListItemIcon,
} from "@mui/material";
import LabelIcon from "@mui/icons-material/Label";
import { tokens } from "../theme";
import commonContext from "../Context/commonContext";
import VolumeUpIcon from '@mui/icons-material/VolumeUp';
import VolumeOffIcon from '@mui/icons-material/VolumeOff';
import ShareIcon from '@mui/icons-material/Share';
import DownloadIcon from '@mui/icons-material/Download';
import { useNavigate } from "react-router-dom";
import SummaryPrintPage from "./PDFPages";
import html2canvas from "html2canvas";
import { jsPDF } from "jspdf";
import ContentCopyIcon from '@mui/icons-material/ContentCopy';


const Summary = ({ summitem }) => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const [play, setPlay] = React.useState(true);

  const handleSpeech = () => {
    setPlay(false);
    // female voice 
    const voices = window.speechSynthesis.getVoices();
    const voice = voices[4];
    const synth = window.speechSynthesis;
    const utterThis = new SpeechSynthesisUtterance(summitem.summary.join(" "));
    utterThis.voice = voice;
    synth.speak(utterThis);
    // after speech is done
    utterThis.onend = () => {
      setPlay(true);
    };
    // const synth = window.speechSynthesis;
    // const utterThis = new SpeechSynthesisUtterance(summitem.summary.join(" "));
    // synth.speak(utterThis);
  };

  const handleStop = () => {
    window.speechSynthesis.cancel();
    setPlay(true);
  };

  const summaryPrintRef = useRef();

  const handleDownloadPdf = async () => {
    const element = summaryPrintRef.current;
    const canvas = await html2canvas(element);
    const data = canvas.toDataURL('image/png');

    const pdf = new jsPDF();
    const imgProperties = pdf.getImageProperties(data);
    const pdfWidth = pdf.internal.pageSize.getWidth();
    const pdfHeight =
      (imgProperties.height * pdfWidth) / imgProperties.width;

    pdf.addImage(data, 'PNG', 0, 0, pdfWidth, pdfHeight);
    pdf.save('sum-up-summary.pdf'); 
  };

  return (
    <Card sx={{ maxWidth: "900px", marginTop: "20px" }} className="summary-card">
      <div ref={summaryPrintRef} style={{position: "absolute", top: "-1000px", left: "-1000px"}}>
        <SummaryPrintPage summary={summitem.summary}/>
      </div>
      <CardHeader title={summitem.title} subheader={summitem.type} className="summary-header" style={{background: `${colors.primary[700]}`}} 
        action={
          <Box>
            <Tooltip title={play? "Play" : "Pause"}>
              <IconButton aria-label="play" onClick={play? handleSpeech : handleStop} className="card-action-btn txt-to-speech-btn">
                {play? <VolumeUpIcon /> : <VolumeOffIcon />}
              </IconButton>
            </Tooltip>
            <Tooltip title="Copy">
              <IconButton aria-label="copy" className="card-action-btn copy-btn">
                <ContentCopyIcon />
              </IconButton>
            </Tooltip>
            <Tooltip title="Share">
              <IconButton aria-label="share" className="card-action-btn share-btn" onClick={() => {
                // gmail share
                const shareUrl = `mailto:?subject=Summary&body=${
                  "Meeting Summary :%0A%0A" + summitem.summary.map((item, index) => `${index+1}. ${item}`).join("%0A")
                }`;
                // whatsapp share
                // const shareUrl = `https://wa.me/?text=${
                //   "Meeting Summary :%0A" + summitem.summary.map((item, index) => `${index+1}. ${item}`).join("%0A")
                // }`;
                // twitter share
                // const shareUrl = `https://twitter.com/intent/tweet?text=${
                //   "Meeting Summary :%0A%0A" + summitem.summary.map((item, index) => `${index+1}. ${item}`).join("%0A")
                // }`;
                window.open(shareUrl, "_blank");
              }}>
                <ShareIcon />
              </IconButton>
            </Tooltip>
            <Tooltip title="Download">
              <IconButton aria-label="download" className="card-action-btn dwnld-btn" onClick={handleDownloadPdf}>
                <DownloadIcon />
              </IconButton>
            </Tooltip>
          </Box>
        }
      />
      <CardContent>
        <List className="summary-list">
          {summitem.summary.map((item, index) => (
            <ListItem disablePadding key={index}>
                <ListItemIcon className="summary-list-icon" style={{color: `${colors.primary[700]}`}}>
                  <LabelIcon />
                </ListItemIcon>
                <ListItemText  className="summary-list-text">{item}</ListItemText>
            </ListItem>
          ))}
        </List>
      </CardContent>
    </Card>
  );
};

const RenderSummary = () => {
  const navigate = useNavigate();
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);

  if (localStorage.length === 0){
    navigate("/login");
  }

  const { gen_summary, para } = useContext(commonContext);

  return (
    <Box
      m="20px auto"
      p="0 20px"
      display="flex"
      flexDirection="column"
      justifyContent="center"
      alignItems="center"
      id="render-summary-page"
    >
      <Box maxWidth="calc(min(1000px, 95%))">
        <Typography variant="h2" textAlign="center">
          Given Transcript
        </Typography>
        <Box
          maxHeight="400px"
          overflow="auto"
          m="20px 0"
          p="10px"
          borderRadius="10px 0 0 10px"
          className="given-transcript-box"

          style={{
            border: `2px solid ${colors.primary[700]}`,
          }}
    
          sx={{
            "&:hover": {
              outline: `3px solid ${theme.palette.mode==='dark'? colors.light[100] : colors.primary[100]}`
            }
          }}
        >
          <p>{para}</p>
        </Box>
      </Box>
      <Box m="40px 0" maxWidth="calc(min(900px, 95%))">
        <Typography variant="h2" textAlign="center">
          Generated Summary!!
        </Typography>
        <Box mt="10px" id="render-summary-cards">
          <Summary summitem={gen_summary}/>
        </Box>
      </Box>
    </Box>
  );
};

export default RenderSummary;
