import * as React from "react";
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

const Summary = ({ summitem }) => {
  const [rating, setRating] = React.useState(0);

  const handleRating = (rate) => {
    setRating(rate);
    summitem.stars += rate;
    console.log(summitem);
  };

  return (
    <Card sx={{ maxWidth: "900px", marginTop: "20px" }}>
      <CardHeader
        title={summitem.title}
        // subheader="September 14, 2016"
      />
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
  const summary = [
    "abc",
    "Lists are a continuous group of text or images. They are composed of items containing primary and supplemental actions, which are represented by icons and text.",
    "Lists are a continuous group of text or images. They are composed of items containing primary and supplemental actions, which are represented by icons and text.",
    "Lists are a continuous group of text or images. They are composed of items containing primary and supplemental actions, which are represented by icons and text.",
    "abc",
  ];
  const summaries = [
    {
      title: "Summary 1",
      summary: summary,
      stars: 0,
    },
    {
      title: "Summary 2",
      summary: summary,
      stars: 0,
    },
    {
      title: "Summary 3",
      summary: summary,
      stars: 0,
    },
    {
      title: "Summary 4",
      summary: summary,
      stars: 0,
    },
    {
      title: "Summary 5",
      summary: summary,
      stars: 0,
    },
  ];
  const paragraph = `Contrary to popular belief, Lorem Ipsum is not simply random text. It has roots in a piece of classical Latin literature from 45 BC, making it over 2000 years old. Richard McClintock, a Latin professor at Hampden-Sydney College in Virginia, looked up one of the more obscure Latin words, consectetur, from a Lorem Ipsum passage, and going through the cites of the word in classical literature, discovered the undoubtable source. Lorem Ipsum comes from sections 1.10.32 and 1.10.33 of "de Finibus Bonorum et Malorum" (The Extremes of Good and Evil) by Cicero, written in 45 BC. This book is a treatise on the theory of ethics, very popular during the Renaissance. The first line of Lorem Ipsum, "Lorem ipsum dolor sit amet..", comes from a line in section 1.10.32. The standard chunk of Lorem Ipsum used since the 1500s is reproduced below for those interested. Sections 1.10.32 and 1.10.33 from "de Finibus Bonorum et Malorum" by Cicero are also reproduced in their exact original form, accompanied by English versions from the 1914 translation by H. Rackham. Contrary to popular belief, Lorem Ipsum is not simply random text. It has roots in a piece of classical Latin literature from 45 BC, making it over 2000 years old. Richard McClintock, a Latin professor at Hampden-Sydney College in Virginia, looked up one of the more obscure Latin words, consectetur, from a Lorem Ipsum passage, and going through the cites of the word in classical literature, discovered the undoubtable source. Lorem Ipsum comes from sections 1.10.32 and 1.10.33 of "de Finibus Bonorum et Malorum" (The Extremes of Good and Evil) by Cicero, written in 45 BC. This book is a treatise on the theory of ethics, very popular during the Renaissance. The first line of Lorem Ipsum, "Lorem ipsum dolor sit amet..", comes from a line in section 1.10.32. The standard chunk of Lorem Ipsum used since the 1500s is reproduced below for those interested. Sections 1.10.32 and 1.10.33 from "de Finibus Bonorum et Malorum" by Cicero are also reproduced in their exact original form, accompanied by English versions from the 1914 translation by H. Rackham.Contrary to popular belief, Lorem Ipsum is not simply random text. It has roots in a piece of classical Latin literature from 45 BC, making it over 2000 years old. Richard McClintock, a Latin professor at Hampden-Sydney College in Virginia, looked up one of the more obscure Latin words, consectetur, from a Lorem Ipsum passage, and going through the cites of the word in classical literature, discovered the undoubtable source. Lorem Ipsum comes from sections 1.10.32 and 1.10.33 of "de Finibus Bonorum et Malorum" (The Extremes of Good and Evil) by Cicero, written in 45 BC. This book is a treatise on the theory of ethics, very popular during the Renaissance. The first line of Lorem Ipsum, "Lorem ipsum dolor sit amet..", comes from a line in section 1.10.32. The standard chunk of Lorem Ipsum used since the 1500s is reproduced below for those interested. Sections 1.10.32 and 1.10.33 from "de Finibus Bonorum et Malorum" by Cicero are also reproduced in their exact original form, accompanied by English versions from the 1914 translation by H. Rackham. Contrary to popular belief, Lorem Ipsum is not simply random text. It has roots in a piece of classical Latin literature from 45 BC, making it over 2000 years old. Richard McClintock, a Latin professor at Hampden-Sydney College in Virginia, looked up one of the more obscure Latin words, consectetur, from a Lorem Ipsum passage, and going through the cites of the word in classical literature, discovered the undoubtable source. Lorem Ipsum comes from sections 1.10.32 and 1.10.33 of "de Finibus Bonorum et Malorum" (The Extremes of Good and Evil) by Cicero, written in 45 BC. This book is a treatise on the theory of ethics, very popular during the Renaissance. The first line of Lorem Ipsum, "Lorem ipsum dolor sit amet..", comes from a line in section 1.10.32. The standard chunk of Lorem Ipsum used since the 1500s is reproduced below for those interested. Sections 1.10.32 and 1.10.33 from "de Finibus Bonorum et Malorum" by Cicero are also reproduced in their exact original form, accompanied by English versions from the 1914 translation by H. Rackham.`;
  return (
    <Box
      m="20px auto"
      p="0 20px"
      minHeight="85vh"
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
          // backgroundColor={colors.grey[800]}
          // color={colors.grey[100]}
          height="400px"
          overflow="auto"
          m="20px 0"
          p="10px"
          border={`2px solid ${colors.grey[800]}`}
          borderRadius="10px"
        >
          {paragraph}
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
