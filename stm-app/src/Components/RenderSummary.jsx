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

  //   Sample summaries
  // const summary = [
  //   "abc",
  //   "Lists are a continuous group of text or images. They are composed of items containing primary and supplemental actions, which are represented by icons and text.",
  //   "Lists are a continuous group of text or images. They are composed of items containing primary and supplemental actions, which are represented by icons and text.",
  //   "Lists are a continuous group of text or images. They are composed of items containing primary and supplemental actions, which are represented by icons and text.",
  //   "abc",
  // ];
  const { summaries } = useContext(commonContext);
  const { para } = useContext(commonContext);
  console.log(summaries);
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
