import React, {useContext, useRef, useState} from "react";
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
  Collapse,
  Switch,
  useMediaQuery
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
import { jsPDF } from "jspdf";
import ContentCopyIcon from '@mui/icons-material/ContentCopy';
import MailIcon from '@mui/icons-material/Mail';
import WhatsAppIcon from '@mui/icons-material/WhatsApp';
import TwitterIcon from '@mui/icons-material/Twitter';
import Modal from '@mui/material/Modal';
import CloseIcon from '@mui/icons-material/Close';
import axios from "axios";
import MoreVertIcon from '@mui/icons-material/MoreVert';
import { imageData } from "../data/logoDataUrl";


const Summary = ({ summitem }) => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const [play, setPlay] = React.useState(true);
  const [alertType, setAlertType] = useState("");
  const [alertCont, setAlertCont] = useState("");
  const [isAlert, setIsAlert] = useState(false);
  const [shareAlert, setShareAlert] = useState(false);
  const isSmallMobile = useMediaQuery("(max-width: 480px)")
  const [isMore, setIsMore] = useState(false);

  const highlights = summitem.highlights;
  const totalSummary = useState(highlights? `The Duration of this meeting: ${summitem.duration} (mm:ss) \n\nFollow-ups\n${summitem.highlights["follow-ups"].join("\n")}\nActions\n${summitem.highlights["actions"].join("\n")}\nImportants\n${summitem.highlights["importants"].join("\n")}\n\nSummary\n${summitem.summary.join("\n")}` : summitem.summary.join("\n"))
  const [message, setMessage] = useState(summitem.summary.join("\n"));
  const [subject, setSubject] = useState("Meeting Summary");
  const [open, setOpen] = useState(false);
  const handleClose = () => {
    setOpen(false);
  };
  const handleOpen = () => {
    setOpen(true);
  }

  const handleSpeech = () => {
    setPlay(false);
    // female voice 
    const voices = window.speechSynthesis.getVoices();
    const voice = voices[4];
    const synth = window.speechSynthesis;
    const utterThis = new SpeechSynthesisUtterance(totalSummary);
    utterThis.voice = voice;
    synth.speak(utterThis);
    // after speech is done
    utterThis.onend = () => {
      setPlay(true);
    };
  };

  const handleStop = () => {
    window.speechSynthesis.cancel();
    setPlay(true);
  };

  const summaryPrintRef = useRef();

  const handleDownloadPdf = async () => {
    // const input = summaryPrintRef.current;
    // convert html to pdf with poroper styling and fonts
    const pdf = new jsPDF("p", "pt", "a4");
    pdf.setFont("Roboto");
    pdf.setFontSize(20);
    pdf.setTextColor(0, 0, 0);
    // align text to center
    pdf.text(70, 40, "\t\t\t\tMeeting Summary");
    // add line break
    pdf.line(40, 50, 560, 50);
    pdf.setFontSize(15);
    pdf.setTextColor(0, 0, 0);

    // text wrap for summary if it exceeds 500px width of pdf page
    // if page is full then add new page
    if(highlights) {
      let y = 100;
      pdf.setFont("Roboto", 'normal').setFontSize(16);
      pdf.text(40, y, `Duration of this meeting: ${summitem.duration} (mm:ss)`);
      pdf.line(40, y+5, 200, y+5);
      y += 40;
      pdf.setFont("Roboto", 'bold').setFontSize(20);
      if(highlights["actions"].length!==0) {
        const highlight_actions = highlights["actions"].map((item) => `•  ${item}`);
        var highlightsText = pdf.splitTextToSize(highlight_actions.join("\n\n"), 500);
        pdf.setFont("Roboto", 'bold').setFontSize(17);
        pdf.text(40, y, "Actions");
        y += 20;
        pdf.setFont("Roboto", 'normal').setFontSize(15);
        for (let i = 0; i < highlightsText.length; i++) {
          if(highlightsText[i]!=="") {
            if (y > 780) {
              pdf.addPage();
              y = 60;
            }
            pdf.text(60, y, highlightsText[i]);
            y += 20;
          }
        }
        y += 10;
      }

      if (highlights["follow-ups"].length!==0) {
        const highlight_followups = highlights["follow-ups"].map((item) => `•  ${item}`);
        highlightsText = pdf.splitTextToSize(highlight_followups.join("\n\n"), 500);
        pdf.setFont("Roboto", 'bold').setFontSize(17);
        pdf.text(40, y, "Follow-ups");
        y += 20;
        pdf.setFont("Roboto", 'normal').setFontSize(15);
        for (let i = 0; i < highlightsText.length; i++) {
          if(highlightsText[i]!=="") {
            if (y > 780) {
              pdf.addPage();
              y = 60;
            }
            pdf.text(60, y, highlightsText[i]);
            y += 20;
          }
        }
        y += 10;
      }
      
      if (highlights["importants"].length!==0) {
        const highlight_imps = highlights["importants"].map((item) => `•  ${item}`);
        highlightsText = pdf.splitTextToSize(highlight_imps.join("\n\n"), 500);
        pdf.setFont("Roboto", 'bold').setFontSize(17);
        pdf.text(40, y, "Importants");
        y += 20;
        pdf.setFont("Roboto", 'normal').setFontSize(15);
        for (let i = 0; i < highlightsText.length; i++) {
          if(highlightsText[i]!=="") {
            if (y > 780) {
              pdf.addPage();
              y = 60;
            }
            pdf.text(60, y, highlightsText[i]);
            y += 20;
          }
        }
        y += 20;
      }

      const summary = summitem.summary.map((item) => `•  ${item}`);
      const summaryText = pdf.splitTextToSize(summary.join("\n\n"), 500);
      pdf.setFont("Roboto", 'bold').setFontSize(20);
      pdf.text(40, y, "Summary");
      pdf.line(40, y+5, 125, y+5);
      y += 25
      pdf.setFont("Roboto", 'normal').setFontSize(15);
      for (let i = 0; i < summaryText.length; i++) {
        if(summaryText[i]!=="") {
          if (y > 780) {
            pdf.addPage();
            y = 60;
          }
          pdf.text(40, y, summaryText[i]);
          y += 20;
        }
      }
    } else {
      let y = 100;
      const summary = summitem.summary.map((item) => `•  ${item}\n`);
      const summaryText = pdf.splitTextToSize(summary.join("\n\n"), 500);
      pdf.setFont("Roboto", 'bold').setFontSize(20);
      pdf.text(40, y, "Summary");
      pdf.line(40, y, 125, y);
      y += 25
      for (let i = 0; i < summaryText.length; i++) {
        if(summaryText[i]!=="") {
          if (y > 780) {
            pdf.addPage();
            y = 40;
          }
          pdf.text(40, y, summaryText[i]);
          y += 20;
        }
      }
    }
    
    // Adding watermark 
    for (let i = 1; i <= pdf.internal.getNumberOfPages(); i++) {
      pdf.setPage(i);
      pdf.setFontSize(13);
      pdf.setTextColor(150);
      pdf.addImage(imageData, 'PNG', (pdf.internal.pageSize.width)/2 - 150, (pdf.internal.pageSize.height)/2 - 150, 300, 300);
      pdf.text(50, pdf.internal.pageSize.height - 20, "Generated by Sum-Up");
    }

    pdf.save("sum-up-summary.pdf");
  };

  return (
    <>
      <Card sx={{ maxWidth: "900px", marginTop: "20px" }} className="summary-card">
      {isAlert && (
          <div style={{position: "absolute", right: "100px", top: "450px", zIndex: 999}} className={`alert alert-${alertType}`}>
            {alertCont}
          </div>
      )}
      {shareAlert && (
            <div className="alert alert-secondary" id="share-alert">
              <IconButton onClick={handleOpen}>
                <MailIcon />
              </IconButton>
              <IconButton onClick={() => {
                const shareUrl = `https://wa.me/?text=${
                  "Meeting Summary :%0A" + summitem.summary.map((item, index) => `${index+1}. ${item}`).join("%0A")
                }`;
                window.open(shareUrl, "_blank");
              }}>
                <WhatsAppIcon />
              </IconButton>
              <IconButton onClick={() => {
                const shareUrl = `https://twitter.com/intent/tweet?text=${
                    "Meeting Summary :%0A%0A" + summitem.summary.map((item, index) => `${index+1}. ${item}`).join("%0A")
                  }`;
                window.open(shareUrl, "_blank");
              }}>
                <TwitterIcon />
              </IconButton>                  
            </div>
        )}
        <div ref={summaryPrintRef} style={{position: "absolute", top: "-1000px", left: "-1000px"}}>
          <SummaryPrintPage summary={summitem.summary}/>
        </div>
        <CardHeader title={isSmallMobile && isMore? "~" : summitem.title} subheader={isSmallMobile && isMore? "~" : summitem.type} className="summary-header" style={{background: `${colors.primary[700]}`}} 
          action={
            <Box>
              {
                (!isSmallMobile || (isSmallMobile && isMore)) && (
                  <>
                  <Tooltip title={play? "Play" : "Pause"}>
                    <IconButton aria-label="play" onClick={play? handleSpeech : handleStop} className="card-action-btn txt-to-speech-btn">
                      {play? <VolumeUpIcon /> : <VolumeOffIcon />}
                    </IconButton>
                  </Tooltip>
                  <Tooltip title="Copy">
                    <IconButton aria-label="copy" className="card-action-btn copy-btn" onClick={() => {
                        setAlertCont("Copied to Clipboard!!");
                        setAlertType("success");
                        setIsAlert(true);
                        navigator.clipboard.writeText(summitem.summary.map((item, index) => `${index+1}. ${item}`).join("%0A"));
                        setTimeout(() => {
                          setAlertCont("");
                          setAlertType("");
                          setIsAlert(false);
                        }, 2000);
                    }}>
                      <ContentCopyIcon />
                    </IconButton>
                  </Tooltip>
                  <Tooltip title="Share">
                    <IconButton aria-label="share" className="card-action-btn share-btn" onClick={() => {
                        setShareAlert(true);
                        setTimeout(() => {
                          setShareAlert(false);
                        }, 4000);
                      }}>
                      <ShareIcon />
                    </IconButton>
                  </Tooltip>
                  <Tooltip title="Download">
                    <IconButton aria-label="download" className="card-action-btn dwnld-btn" onClick={handleDownloadPdf}>
                      <DownloadIcon />
                    </IconButton>
                  </Tooltip>
                  </>
                )
              }
              {
                isSmallMobile && (
                  <IconButton className="card-action-btn" onClick={() => setIsMore(!isMore)}>
                      <MoreVertIcon />
                  </IconButton>
                )
              }
            </Box>
          }
        />
        <CardContent>
        { highlights && (
            <>
              <List className="summary-list">
                <ListItem disablePadding>
                    <ListItemIcon className="summary-list-icon" style={{color: `${colors.primary[700]}`}}>
                      <LabelIcon />
                    </ListItemIcon>
                    <ListItemText  className="summary-list-text">{`The Duration of this meeting: ${summitem.duration} (mm:ss)`}</ListItemText>
                </ListItem>
              </List>
              {highlights["actions"].length > 0 && (
                <>
                  <Typography style={{color: `${colors.primary[700]}`, fontWeight: "bold", fontSize: "1.2em", textAlign: "center"}}>Actions</Typography>
                  <List className="summary-list">
                    {highlights["actions"].map((item, index) => (
                      <ListItem disablePadding key={index}>
                          <ListItemIcon className="summary-list-icon" style={{color: `${colors.primary[700]}`}}>
                            <LabelIcon />
                          </ListItemIcon>
                          <ListItemText  className="summary-list-text">{item}</ListItemText>
                      </ListItem>
                    ))}
                  </List>
                </>
              )}
              {highlights["follow-ups"].length > 0 && (
                <>
                <Typography style={{color: `${colors.primary[700]}`, fontWeight: "bold", fontSize: "1.2em", textAlign: "center"}}>Follow-ups</Typography>
                <List className="summary-list">
                  {highlights["follow-ups"].map((item, index) => (
                    <ListItem disablePadding key={index}>
                        <ListItemIcon className="summary-list-icon" style={{color: `${colors.primary[700]}`}}>
                          <LabelIcon />
                        </ListItemIcon>
                        <ListItemText  className="summary-list-text">{item}</ListItemText>
                    </ListItem>
                  ))}
                </List>
                </>
              )}
              {highlights["importants"].length > 0 && (
                <>
                  <Typography style={{color: `${colors.primary[700]}`, fontWeight: "bold", fontSize: "1.2em", textAlign: "center"}}>Importants</Typography>
                  <List className="summary-list">
                    {highlights["importants"].map((item, index) => (
                      <ListItem disablePadding key={index}>
                          <ListItemIcon className="summary-list-icon" style={{color: `${colors.primary[700]}`}}>
                            <LabelIcon />
                          </ListItemIcon>
                          <ListItemText  className="summary-list-text">{item}</ListItemText>
                      </ListItem>
                    ))}
                  </List>
                </>
              )}
            </>
          )}
          <Typography style={{color: `${colors.primary[700]}`, fontWeight: "bold", fontSize: "1.3em", marginTop: "10px", textAlign: "center", textDecoration: "underline"}}>Summary</Typography>
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
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box id="mail-modal">
          <div onClick={handleClose} style={{textAlign: "right", cursor: "pointer", padding: "5px 10px"}}>
            <CloseIcon />
          </div>
          <input placeholder="Subject/Title" value={subject} onChange={e => setSubject(e.target.value)} className="subject-input"/>
          <textarea placeholder="Message body..." value={message} onChange={e => setMessage(e.target.value)} className="message-input" rows="10"></textarea>
          <div className="mail-modal-btn-div">
          <button className="login__create-container__form-container__form--submit" onClick={
            () => {
              axios.post("http://localhost:8000/send_mail", {
                email: localStorage.getItem("email"),
                subject: subject,
                message: message,
              }
              ).then((res) => {
                if(res.data.success){
                  setAlertCont("Mail Sent Successfully!!");
                  setAlertType("success");
                  setIsAlert(true);
                  setSubject("");
                  setMessage("");
                  handleClose();
                }
              }).catch((err) => {
                setAlertCont("Error Occured!!");
                setAlertType("danger");
                setIsAlert(true);
                console.log(err);
              }
              );
              setTimeout(() => {setAlertCont(""); setAlertType(""); setIsAlert(false);}, 3000);
            }
          }>Send</button>
          </div>
        </Box>
      </Modal>
    </>
  );
};

const RenderSummary = () => {
  const navigate = useNavigate();
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const [open, setOpen] = useState(false);

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
      <Box m="40px 0" maxWidth="calc(min(900px, 95%))">
        <Typography variant="h2" textAlign="center">
          Generated Summary
        </Typography>
        <Box mt="10px" id="render-summary-cards">
          <Summary summitem={gen_summary}/>
        </Box>
      </Box>

      <Box margin="20px 0">
        Hide Transcript 
        <Switch
          onChange={() => setOpen(!open)}
        />
        Show Transcript
      </Box>

      <Box maxWidth="calc(min(1000px, 95%))">
        <Collapse in={open} timeout="auto" unmountOnExit>
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
            {
              para.split("\n").map((par, ind) => (
                <p key={ind}>{par}</p>
              ))
            }
          </Box>
        </Collapse>
      </Box>
    </Box>
  );
};

export default RenderSummary;
