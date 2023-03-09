import { List, ListItem, ListItemIcon, ListItemText, useTheme, useMediaQuery, IconButton, Card, CardHeader, CardContent, Box, Tooltip } from "@mui/material";
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import DescriptionIcon from '@mui/icons-material/Description';
import RestoreIcon from '@mui/icons-material/Restore';
import ErrorOutlineIcon from '@mui/icons-material/ErrorOutline';
import { tokens } from "../theme";
import { useContext, useState } from "react";
import commonContext from "../Context/commonContext";
import { useNavigate } from "react-router-dom";
import OpenInFullIcon from '@mui/icons-material/OpenInFull';
import LabelIcon from '@mui/icons-material/Label';

const RecentSummaries = () => {
    const theme = useTheme();
    const colors = tokens(theme.palette.mode);
    const { setSummitem, setTranscript, setLoading, mySummaries } = useContext(commonContext);
    const navigate = useNavigate();
    const isNonMobile = useMediaQuery("(min-width: 1024px)");
    
    const summaries = [...mySummaries].reverse();
    const [summ, setSumm] = useState(null);
    const [ind, setInd] = useState(0);
    
    const handleSummitem = (summ, index) => {
        if(isNonMobile) {
            setSummitem(summ.summitem);
            setTranscript(summ.transcript);
            setSumm(summ);
            setInd(index);
        }
        else {
            setSummitem(summ.summitem);
            setTranscript(summ.transcript);
            setLoading(true);
            setTimeout(() => {
                setLoading(false);
                navigate(`/recent-summaries/${index+1}`);
            }, 1000);
        }
    }

    return (
        <div id="recent-summary-page">
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
            {
                isNonMobile && summ && (
                    <div id="recent-selected-summary">
                        <Card sx={{ maxWidth: "900px", marginTop: "20px" }} className="summary-card">
                            <CardHeader title={"Summary"} subheader={summ.date} className="summary-header" style={{background: `${colors.primary[700]}`}} 
                                action={
                                    <Box>
                                    <Tooltip title="Expand">
                                        <IconButton aria-label="expand" className="card-action-btn expand-btn" onClick={() => {
                                            setLoading(true);
                                            setTimeout(() => {
                                                setLoading(false);
                                                navigate(`/recent-summaries/${ind+1}`);
                                            }, 1000);
                                        }}>
                                            <OpenInFullIcon />
                                        </IconButton>
                                    </Tooltip>
                                    </Box>
                                }
                            />
                            <CardContent className="summary-content">
                            <List className="summary-list">
                                {summ.summitem.summary.map((item, index) => (
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
                    </div>
                )
            }
        </div>
    )
};

export default RecentSummaries;