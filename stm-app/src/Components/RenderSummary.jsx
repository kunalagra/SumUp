import React, {useContext} from "react";
import { Rating } from "react-simple-star-rating";
import {
  Box,
  Card,
  CardHeader,
  CardContent,
  CardActions,
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
import { Swiper, SwiperSlide } from 'swiper/react';
import { EffectFlip, Navigation, Pagination } from "swiper";
import { tokens } from "../theme";
import commonContext from "../Context/commonContext";
import VolumeUpIcon from '@mui/icons-material/VolumeUp';
import VolumeOffIcon from '@mui/icons-material/VolumeOff';
import { useNavigate } from "react-router-dom";

import 'swiper/scss';
import 'swiper/scss/navigation';
import 'swiper/scss/effect-flip';
import 'swiper/scss/pagination';

const Summary = ({ summitem }) => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const [rating, setRating] = React.useState(0);
  const [play, setPlay] = React.useState(true);

  const handleRating = (rate) => {
    setRating(rate);
    summitem.stars += rate;
    console.log(summitem);
  };

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

  return (
    <Card sx={{ maxWidth: "900px", marginTop: "20px" }} className="summary-card">
      <CardHeader title={summitem.title} subheader={summitem.type} className="summary-header" style={{background: `${colors.primary[700]}`}} 
        action={
          <Tooltip title={play? "Play" : "Pause"}>
            <IconButton aria-label="play" onClick={play? handleSpeech : handleStop} className="text-to-speech-btn">
              {play? <VolumeUpIcon /> : <VolumeOffIcon />}
            </IconButton>
          </Tooltip>
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
      <CardActions
        disableSpacing
        style={{ justifyContent: "flex-end", margin: "0 10px 10px 0" }}
        className="summary-card-actions"
      > 
        <Typography mr="10px">Rate</Typography>
        <Rating
          onClick={handleRating}
          ratingValue={rating}
          size={20}
          label
          transition
          fillColor={colors.primary[700]}
          emptyColor="gray"
          className="foo"
        />
      </CardActions>
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

  const { summaries, para } = useContext(commonContext);

  // const para = <div><p>Ganesh Utla: Hello. Hello</p><p>Ganesh Utla: Welcome back, Kunal. This is the second part of the interview and I want to get these as quickly as possible because I know you somewhere between. Thank you.</p><p>Kunal Agrawal: Thank you. It's my pleasure.</p><p>Ganesh Utla: It says on the website you worked doing graphic design for a local branding agency before branching out and starting your own business.</p><p>Kunal Agrawal: Yes.</p><p>Ganesh Utla: Was that a conscious choice?</p><p>Kunal Agrawal: Yes.</p><p>Ganesh Utla: Sorry, one sec. We can hear the fan.</p><p>Aman Tiwari: [inaudible 00:27]</p><p>Ganesh Utla: No, no, That's perfect. Thanks, Aman. Good. Was starting your own company international, or did you just sort of fall into it?</p><p>Kunal Agrawal: Actually, Sort of both. I started out doing it as a favour for a friend. I didn't really know what I was doing at the time, but at some point, I found out I was having some success with that, and so I started doing it for local businesses and restaurants. Then it kind of took off from there, and I figured, well, if I'm going to be taking on all these new clients I might as well get a website going and make something out of this, you know?</p><p>Ganesh Utla: Sure. What kind of challenges did you experience when you were starting out, that you weren't expecting?</p><p>Kunal Agrawal: Hmm, challenges I wasn't expecting.</p><p>Ganesh Utla: Hahaha. I keep putting on the spot. I don't think I put that one in the questions either. We're just ad-libbing here.</p><p>Kunal Agrawal: No, it's fine. So, challenges.</p><p>Ganesh Utla: Okay. I understood. Time to say bye now!</p><p>Kunal Agrawal: Okay, once again Thank you for your time.</p><p>Ganesh Utla: Same goes for you.</p></div>;

  // const summaries = [
  //   {
  //     title: "LexRank",
  //     summary: ['Ganesh Utla: Hello.', 'Kunal Agrawal: Thank you.', 'Ganesh Utla: Was that a conscious choice?', "Aman Tiwari: [inaudible 00:27] Ganesh Utla: No, no, That's perfect.", "I didn't really know what I was doing at the time, but at some point, I found out I was having some success with that, and so I started doing it for local businesses and restaurants.", "What kind of challenges did you experience when you were starting out, that you weren't expecting?", "Kunal Agrawal: Hmm, challenges I wasn't expecting.", "Kunal Agrawal: No, it's fine.", 'Kunal Agrawal: Okay, once again Thank you for your time.', 'Ganesh Utla: Same goes for you.'],
  //     stars: 0,
  //     type: "Extractive"
  //   },
  //   {
  //     title: "LSA",
  //     summary: ['This is the second part of the interview and I want to get these as quickly as possible because I know you somewhere between.', 'Ganesh Utla: It says on the website you worked doing graphic design for a local branding agency before branching out and starting your own business.', 'Ganesh Utla: Was that a conscious choice?', 'Was starting your own company international, or did you just sort of fall into it?', 'Kunal Agrawal: Actually, Sort of both.', "Then it kind of took off from there, and I figured, well, if I'm going to be taking on all these new clients I might as well get a website going and make something out of this, you know?", "Kunal Agrawal: Hmm, challenges I wasn't expecting.", 'I keep putting on the spot.', 'Kunal Agrawal: Okay, once again Thank you for your time.', 'Ganesh Utla: Same goes for you.'],
  //     stars: 0,
  //     type: "Extractive"
  //   },
  //   {
  //     title: "KL Sum",
  //     summary: ['Hello.', "It's my pleasure.", 'We can hear the fan.', 'Thanks, Aman.', 'Good.', "I didn't really know what I was doing at the time, but at some point, I found out I was having some success with that, and so I started doing it for local businesses and restaurants.", "What kind of challenges did you experience when you were starting out, that you weren't expecting?", "We're just ad-libbing here.", 'So, challenges.', 'Time to say bye now!'],
  //     stars: 0,
  //     type: "Extractive"
  //   },
  //   {
  //     title: "Luhn",
  //     summary: ['This is the second part of the interview and I want to get these as quickly as possible because I know you somewhere between.', 'Ganesh Utla: It says on the website you worked doing graphic design for a local branding agency before branching out and starting your own business.', 'Ganesh Utla: Was that a conscious choice?', 'Was starting your own company international, or did you just sort of fall into it?', 'I started out doing it as a favour for a friend.', "I didn't really know what I was doing at the time, but at some point, I found out I was having some success with that, and so I started doing it for local businesses and restaurants.", "Then it kind of took off from there, and I figured, well, if I'm going to be taking on all these new clients I might as well get a website going and make something out of this, you know?", "What kind of challenges did you experience when you were starting out, that you weren't expecting?", "Kunal Agrawal: Hmm, challenges I wasn't expecting.", 'Kunal Agrawal: Okay, once again Thank you for your time.'],
  //     stars: 0,
  //     type: "Extractive"
  //   },
  //   {
  //     title: "OpenAI",
  //     summary: ['This was the second part of an interview.', 'Kunal worked as a graphic designer for a local branding agency before branching out and starting his own business.', 'Kunal started his own business as a favour for a friend.', 'Kunal was having success and started taking on new clients.', 'Kunal then created a website for his business.', 'Kunal was asked about unexpected challenges he faced when starting out.', 'Ganesh and Kunal discussed ad-libbing during the interview.', 'Kunal thanked Ganesh for his time.', 'Ganesh thanked Kunal for his time.', 'The interview concluded.'],
  //     stars: 0,
  //     type: "Abstractive"
  //   },
  //   {
  //     title: "NLP",
  //     summary: ['Ganesh Utla: It says on the website you worked doing graphic design for a local branding agency before branching out and starting your own business.', 'This is the second part of the interview and I want to get these as quickly as possible because I know you somewhere between.', "What kind of challenges did you experience when you were starting out, that you weren't expecting?", 'Was starting your own company international, or did you just sort of fall into it?', "I don't think I put that one in the questions either.", "Kunal Agrawal: Hmm, challenges I wasn't expecting.", 'I started out doing it as a favour for a friend.', 'Time to say bye now!', 'Ganesh Utla: Sorry, one sec.', 'I keep putting on the spot.'],
  //     stars: 0,
  //     type: "Abstractive"
  //   },
  // ];
  // console.log(summaries);
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
          height="400px"
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
          {/* {para} */}
        </Box>
      </Box>
      <Box m="40px 0" maxWidth="calc(min(900px, 95%))">
        <Typography variant="h2" textAlign="center">
          Generated Summaries!!
        </Typography>
        <Box mt="10px">
          <Swiper
              modules={[Pagination, EffectFlip, Navigation]}
              loop={true}
              speed={400}
              spaceBetween={0}
              slidesPerView={1}
              touchRatio={1.5}
              navigation={true}
              effect={'flip'}
              pagination={{ clickable: true }}
              autoplay={false}
              id="render-summary-swiper"
          >
            {summaries.map((summ, index) => (
              <SwiperSlide
                key={index}
                className="summary-swiperslide mb-5"
              >
                <Summary summitem={summ}/>
              </SwiperSlide>
            ))}
          </Swiper>
        </Box>
      </Box>
    </Box>
  );
};

export default RenderSummary;
