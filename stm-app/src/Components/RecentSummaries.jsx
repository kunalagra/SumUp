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

    const summaries = [...mySummaries].reverse();

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