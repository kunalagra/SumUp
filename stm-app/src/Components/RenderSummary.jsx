<<<<<<< HEAD
import React, { useContext } from "react";
=======
import React, {useContext} from "react";
>>>>>>> 8a78f0416006fa0115f7ec8fd49eb8fef5a44a1b
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
  ListItemButton,
  ListItemText,
  ListItemIcon,
} from "@mui/material";
import LabelIcon from "@mui/icons-material/Label";
import { tokens } from "../theme";
import commonContext from "../Context/commonContext";

const Summary = ({ summitem }) => {
  const [rating, setRating] = React.useState(0);

  const handleRating = (rate) => {
    setRating(rate);
    summitem.stars += rate;
    console.log(summitem);
  };

  return (
    <Card sx={{ maxWidth: "900px", marginTop: "20px" }}>
      <CardHeader title={summitem.title} subheader={summitem.type} />
      <CardContent>
        <List>
          {summitem.summary.map((item, index) => (
            <ListItem disablePadding key={index}>
              <ListItemButton>
                <ListItemIcon>
                  <LabelIcon />
                </ListItemIcon>
                <ListItemText>{item}</ListItemText>
              </ListItemButton>
            </ListItem>
          ))}
        </List>
      </CardContent>
      <CardActions
        disableSpacing
        style={{ justifyContent: "flex-end", margin: "0 10px 10px 0" }}
      >
        <Typography mr="10px">Rate</Typography>
        <Rating
          onClick={handleRating}
          ratingValue={rating}
          size={20}
          label
          transition
          fillColor="orange"
          emptyColor="gray"
          className="foo"
        />
      </CardActions>
    </Card>
  );
};

const RenderSummary = () => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);

  const { summaries } = useContext(commonContext);

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
<<<<<<< HEAD
=======
  const { summaries } = useContext(commonContext);
  const { para } = useContext(commonContext);
  console.log(summaries);
>>>>>>> 8a78f0416006fa0115f7ec8fd49eb8fef5a44a1b
  return (
    <Box
      m="20px auto"
      p="0 20px"
      minHeight="80vh"
      display="flex"
      flexDirection="column"
      justifyContent="center"
      alignItems="center"
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
          border={`2px solid ${colors.grey[800]}`}
          borderRadius="10px 0 0 10px"
        >
          <p>{para}</p>
        </Box>
      </Box>
      <Box m="40px 0" maxWidth="calc(min(900px, 95%))">
        <Typography variant="h2" textAlign="center">
          Generated Summaries!!
        </Typography>
        <Box mt="10px">
          {summaries.map((summ, index) => (
            <Summary summitem={summ} key={index} />
          ))}
        </Box>
      </Box>
    </Box>
  );
};

export default RenderSummary;
