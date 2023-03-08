import { List, ListItem, ListItemIcon, ListItemText, useTheme } from "@mui/material";
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import DescriptionIcon from '@mui/icons-material/Description';
import RestoreIcon from '@mui/icons-material/Restore';
import ErrorOutlineIcon from '@mui/icons-material/ErrorOutline';
import { tokens } from "../theme";
import { useContext } from "react";
import commonContext from "../Context/commonContext";
import { useNavigate } from "react-router-dom";

const RecentSummaries = () => {
    const theme = useTheme();
    const colors = tokens(theme.palette.mode);
    const { setSummitem, setTranscript, setLoading, mySummaries } = useContext(commonContext);
    const navigate = useNavigate();

    const summaries = mySummaries;
    console.log(summaries);

    // const summaries = [
    //     {
    //         date: "23-42-2001/23-23-24",
    //         transcript: `Ganesh Utla said "Hello. Hello." Ganesh Utla said "Welcome back, Kunal. This is the second part of the interview and I want to get these as quickly as possible because I know you somewhere between. Thank you." Kunal Agrawal said "Thank you. It's my pleasure." Ganesh Utla said "It says on the website you worked doing graphic design for a local branding agency before branching out and starting your own business." Kunal Agrawal said "Yes." Ganesh Utla said "Was that a conscious choice?" Kunal Agrawal said "Yes." Ganesh Utla said "Sorry, one sec. We can hear the fan." Aman Tiwari: [inaudible 00:27] Ganesh Utla said "No, no, That's perfect. Thanks, Aman. Good. Was starting your own company international, or did you just sort of fall into it?" Kunal Agrawal said "Actually, Sort of both. I started out doing it as a favour for a friend. I didn't really know what I was doing at the time, but at some point, I found out I was having some success with that, and so I started doing it for local businesses and restaurants. Then it kind of took off from there, and I figured, well, if I'm going to be taking on all these new clients I might as well get a website going and make something out of this, you know?" Ganesh Utla said "Sure. What kind of challenges did you experience when you were starting out, that you weren't expecting?" Kunal Agrawal said "Hmm, challenges I wasn't expecting." Ganesh Utla said "Hahaha. I keep putting on the spot. I don't think I put that one in the questions either. We're just ad-libbing here." Kunal Agrawal said "No, it's fine. So, challenges." Ganesh Utla said "Okay. I understood. Time to say bye now!" Kunal Agrawal said "Okay, once again Thank you for your time." Ganesh Utla said "Same goes for you."`,
    //         summitem: {
    //             title: "OpenAI",
    //             type: "ABC",
    //             summary: [
    //                 `Kunal Agrawal said "Yes."`,
    //                 `Ganesh Utla said "It says on the website you worked doing graphic design for a local branding agency before branching out and starting your own business."`,
    //                 `Kunal Agrawal said "Hmm, challenges I wasn't expecting."`,
    //                 `Ganesh Utla said "Sorry, one sec.`,
    //                 `Ganesh Utla said "Was that a conscious choice?"`,
    //                 `Aman Tiwari: [inaudible 00:27] Ganesh Utla said "No, no, That's perfect.`,
    //                 `Kunal Agrawal said "Okay, once again Thank you for your time."`,
    //                 `Ganesh Utla said "Welcome back, Kunal.`,
    //                 `Kunal Agrawal said "Actually, Sort of both.`,
    //                 `Kunal Agrawal said "No, it's fine.`
    //             ]
    //         }
    //     },
    //     {
    //         date: "23-42-2001/23-23-24",
    //         transcript: `Ganesh Utla said "Hello. Hello." Ganesh Utla said "Welcome back, Kunal. This is the second part of the interview and I want to get these as quickly as possible because I know you somewhere between. Thank you." Kunal Agrawal said "Thank you. It's my pleasure." Ganesh Utla said "It says on the website you worked doing graphic design for a local branding agency before branching out and starting your own business." Kunal Agrawal said "Yes." Ganesh Utla said "Was that a conscious choice?" Kunal Agrawal said "Yes." Ganesh Utla said "Sorry, one sec. We can hear the fan." Aman Tiwari: [inaudible 00:27] Ganesh Utla said "No, no, That's perfect. Thanks, Aman. Good. Was starting your own company international, or did you just sort of fall into it?" Kunal Agrawal said "Actually, Sort of both. I started out doing it as a favour for a friend. I didn't really know what I was doing at the time, but at some point, I found out I was having some success with that, and so I started doing it for local businesses and restaurants. Then it kind of took off from there, and I figured, well, if I'm going to be taking on all these new clients I might as well get a website going and make something out of this, you know?" Ganesh Utla said "Sure. What kind of challenges did you experience when you were starting out, that you weren't expecting?" Kunal Agrawal said "Hmm, challenges I wasn't expecting." Ganesh Utla said "Hahaha. I keep putting on the spot. I don't think I put that one in the questions either. We're just ad-libbing here." Kunal Agrawal said "No, it's fine. So, challenges." Ganesh Utla said "Okay. I understood. Time to say bye now!" Kunal Agrawal said "Okay, once again Thank you for your time." Ganesh Utla said "Same goes for you."`,
    //         summitem: {
    //             title: "BERT",
    //             type: "ABC",
    //             summary: [
    //                 `Kunal Agrawal said "Yes."`,
    //                 `Ganesh Utla said "It says on the website you worked doing graphic design for a local branding agency before branching out and starting your own business."`,
    //                 `Kunal Agrawal said "Hmm, challenges I wasn't expecting."`,
    //                 `Ganesh Utla said "Sorry, one sec.`,
    //                 `Ganesh Utla said "Was that a conscious choice?"`,
    //                 `Aman Tiwari: [inaudible 00:27] Ganesh Utla said "No, no, That's perfect.`,
    //                 `Kunal Agrawal said "Okay, once again Thank you for your time."`,
    //                 `Ganesh Utla said "Welcome back, Kunal.`,
    //                 `Kunal Agrawal said "Actually, Sort of both.`,
    //                 `Kunal Agrawal said "No, it's fine.`
    //             ]
    //         }
    //     },
    //     {
    //         date: "23-42-2001/23-23-24",
    //         transcript: `Ganesh Utla said "Hello. Hello." Ganesh Utla said "Welcome back, Kunal. This is the second part of the interview and I want to get these as quickly as possible because I know you somewhere between. Thank you." Kunal Agrawal said "Thank you. It's my pleasure." Ganesh Utla said "It says on the website you worked doing graphic design for a local branding agency before branching out and starting your own business." Kunal Agrawal said "Yes." Ganesh Utla said "Was that a conscious choice?" Kunal Agrawal said "Yes." Ganesh Utla said "Sorry, one sec. We can hear the fan." Aman Tiwari: [inaudible 00:27] Ganesh Utla said "No, no, That's perfect. Thanks, Aman. Good. Was starting your own company international, or did you just sort of fall into it?" Kunal Agrawal said "Actually, Sort of both. I started out doing it as a favour for a friend. I didn't really know what I was doing at the time, but at some point, I found out I was having some success with that, and so I started doing it for local businesses and restaurants. Then it kind of took off from there, and I figured, well, if I'm going to be taking on all these new clients I might as well get a website going and make something out of this, you know?" Ganesh Utla said "Sure. What kind of challenges did you experience when you were starting out, that you weren't expecting?" Kunal Agrawal said "Hmm, challenges I wasn't expecting." Ganesh Utla said "Hahaha. I keep putting on the spot. I don't think I put that one in the questions either. We're just ad-libbing here." Kunal Agrawal said "No, it's fine. So, challenges." Ganesh Utla said "Okay. I understood. Time to say bye now!" Kunal Agrawal said "Okay, once again Thank you for your time." Ganesh Utla said "Same goes for you."`,
    //         summitem: {
    //             title: "OpenAI",
    //             type: "dsf",
    //             summary: [
    //                 `Kunal Agrawal said "Yes."`,
    //                 `Ganesh Utla said "It says on the website you worked doing graphic design for a local branding agency before branching out and starting your own business."`,
    //                 `Kunal Agrawal said "Hmm, challenges I wasn't expecting."`,
    //                 `Ganesh Utla said "Sorry, one sec.`,
    //                 `Ganesh Utla said "Was that a conscious choice?"`,
    //                 `Aman Tiwari: [inaudible 00:27] Ganesh Utla said "No, no, That's perfect.`,
    //                 `Kunal Agrawal said "Okay, once again Thank you for your time."`,
    //                 `Ganesh Utla said "Welcome back, Kunal.`,
    //                 `Kunal Agrawal said "Actually, Sort of both.`,
    //                 `Kunal Agrawal said "No, it's fine.`
    //             ]
    //         }
    //     }
    // ];


    const handleSummitem = (summ, index) => {
        setSummitem(summ.summitem);
        setTranscript(summ.transcript);
        setLoading(true);

        setTimeout(() => {
            setLoading(false);
            navigate(`/recent-summaries/${index+1}`);
        }, 1000);
    }

    return (
        <div id="recent-summaries" style={{border: `2px solid ${colors.primary[400]}`, backgroundColor: `${colors.primary[400]}`}}>
            <div className="section-header">
                <RestoreIcon />
                <h5>Recent Summaries...</h5>
            </div>
            <div>
                <List className="summaries-list">
                    {summaries.length > 0 && summaries.map((item, index) => (
                        <ListItem 
                            className="summaries-list-item" 
                            key={index} 
                            style={{borderBottom: `2px solid ${colors.primary[400]}`}}
                            onClick={() => handleSummitem(item, index)}
                        >
                            <ListItemIcon className="summaries-list-icon" style={{color: `${colors.primary[400]}`}}>
                                <DescriptionIcon />
                            </ListItemIcon>
                            <ListItemText
                                primary={item.date}
                                className="summaries-list-text"
                            />
                            <ListItemIcon className="summaries-list-icon" style={{color: `${colors.primary[400]}`}}>
                                <ChevronRightIcon />
                            </ListItemIcon>
                        </ListItem>
                    ))}
                    {summaries.length===0 && (
                            <ListItem className="summaries-list-item" style={{borderBottom: `2px solid ${colors.primary[400]}`}}>
                                <ListItemIcon className="summaries-list-icon" style={{color: `${colors.primary[400]}`}}>
                                    <ErrorOutlineIcon />
                                </ListItemIcon>
                                <ListItemText
                                    primary="No summaries found!!"
                                    className="summaries-list-text"
                                />
                            </ListItem>
                        )
                    }
                </List>
            </div>
        </div>
    )
};

export default RecentSummaries;