import { List, ListItem, ListItemIcon, ListItemText, useTheme, useMediaQuery, IconButton, Card, CardHeader, CardContent, Box, Tooltip } from "@mui/material";
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import DescriptionIcon from '@mui/icons-material/Description';
import RestoreIcon from '@mui/icons-material/Restore';
import ErrorOutlineIcon from '@mui/icons-material/ErrorOutline';
import { tokens } from "../theme";
import { useContext, useEffect, useState } from "react";
import commonContext from "../Context/commonContext";
import { useNavigate } from "react-router-dom";
import OpenInFullIcon from '@mui/icons-material/OpenInFull';
import LabelIcon from '@mui/icons-material/Label';
import DriveFileRenameOutlineIcon from '@mui/icons-material/DriveFileRenameOutline';
import InfoOutlinedIcon from '@mui/icons-material/InfoOutlined';
import Modal from '@mui/material/Modal';
import CloseIcon from '@mui/icons-material/Close';
import axios from "axios";
import httpClient from "../httpClient";
import DeleteIcon from '@mui/icons-material/Delete';

const RecentSummaries = () => {
    const theme = useTheme();
    const colors = tokens(theme.palette.mode);
    const { setSummitem, setTranscript, setLoading, mySummaries, setMySummaries } = useContext(commonContext);
    const navigate = useNavigate();
    const isNonMobile = useMediaQuery("(min-width: 1024px)");
    const isSmallMobile = useMediaQuery("(max-width: 768px)")
    
    const summaries = [...mySummaries].reverse();
    const sumlen = summaries.length;
    const [summ, setSumm] = useState(null);
    const [ind, setInd] = useState(0);
    const [isNameEdit, setIsNameEdit] = useState(false);
    const [newName, setNewName] = useState("");
    const [editItem, setEditItem] = useState(null);
    const [isError, setIsError] = useState(0);
    const [ediind, setEdiind] = useState(0);

    useEffect(() => {
        httpClient.get('/get_data').then((response) => {
            setMySummaries(response.data.recents_sum);
        }).catch((error) => {
            console.log(error);
        })
        // eslint-disable-next-line
    }, [isError]);
    

    const handleSummitem = (summ, index) => {
        setSummitem(summ);
        setTranscript(summ.transcript);
        // console.log(summ);
        if(isNonMobile) {
            setSumm(summ);
            setInd(index);
        }
        else {
            setLoading(true);
            setTimeout(() => {
                setLoading(false);
                navigate(`/recent-summaries/${index+1}`);
            }, 1000);
        }
    }


    const handleEditName = (item,index) => {
        setEdiind(sumlen-index-1);
        setNewName(item.title? item.title : item.date);
        setEditItem(item);
        setIsNameEdit(true);
    }

    const handleClose = () => {
        setIsNameEdit(false);
    }

    const handleDeleteSumm = (item,index) => {
        setIsError(2);
        axios.post("http://localhost:8000/delete_summary", {
            ind: sumlen-index-1,
            date: item.date,
            username: localStorage.getItem("email")
        })
        .catch(() => {
            setIsError(1);
        });   
        setTimeout(() => setIsError(0), 4000);
    }


    return (
        <>
            {isError!==0 && (
                <div style={{position: "fixed", top: "0px", right: "0px"}}>
                    <div style={{position: "absolute", right: "10px", top: "80px", zIndex: 999, width: "max-content"}} className={`alert alert-${isError===1? "danger" : "success"}`}>
                        {isError===1? "Something went wrong!!" : "Updating..."}
                    </div>
                </div>
            )}
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
                                    style={{borderBottom: `2px solid ${colors.primary[400]}`, position: "relative"}}
                                >
                                    <ListItemIcon className="summaries-list-icon" style={{color: `${colors.primary[400]}`}}>
                                        <DescriptionIcon />
                                    </ListItemIcon>
                                    <p className="summaries-list-text" onClick={() => handleSummitem(item, index)}>{item.title? item.title : item.date}</p>
                                    <Tooltip title="Rename">
                                        <IconButton className="rename-icon" style={{color: `${colors.primary[400]}`}} onClick={() => handleEditName(item,index)}>
                                            <DriveFileRenameOutlineIcon />
                                        </IconButton>
                                    </Tooltip>
                                    {!isSmallMobile && (
                                        <Tooltip title={`Generated on ${item.date}`}>
                                            <IconButton className="info-icon" style={{color: `${colors.primary[400]}`}}>
                                                <InfoOutlinedIcon />
                                            </IconButton>
                                        </Tooltip>
                                    )}
                                    <Tooltip title="Delete Summary">
                                        <IconButton className="delete-icon" style={{color: `${colors.primary[400]}`}} onClick={() => handleDeleteSumm(item,index)}>
                                            <DeleteIcon />
                                        </IconButton>
                                    </Tooltip>
                                    <ListItemIcon className="summaries-view-icon" style={{color: `${colors.primary[400]}`}} onClick={() => handleSummitem(item, index)}>
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
                                <CardHeader title={"Summary"} subheader={summ.title? summ.title: summ.date} className="summary-header" style={{background: `${colors.primary[700]}`}} 
                                    action={
                                        <Box>
                                        <Tooltip title="Expand">
                                            <IconButton aria-label="expand" className="card-action-btn expand-btn" onClick={() => {
                                                setLoading(true);
                                                setTimeout(() => {
                                                    setLoading(false);
                                                    navigate(`/recent-summaries/${sumlen-ind-1}`);
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
                <Modal
                    open={isNameEdit}
                    onClose={handleClose}
                >
                    <div id="rename-modal">
                        <div onClick={handleClose} style={{textAlign: "right", cursor: "pointer", padding: "5px 10px"}}>
                            <CloseIcon />
                        </div>
                        <input placeholder="Summary Name" value={newName} onChange={e => setNewName(e.target.value)} className="rename-input"/>
                        <div className="rename-modal-btn-div">
                            <button className="login__create-container__form-container__form--submit" onClick={() => {
                                // console.log(newName);
                                setIsError(2);
                                axios.post("http://localhost:8000/rename_sumtitle", {
                                    ind: ediind,
                                    date: editItem.date,
                                    newName: newName,
                                    username: localStorage.getItem("email")
                                })
                                .catch(() => {
                                    setIsError(1);
                                    setTimeout(() => setIsError(0), 2000);
                                });
                                setTimeout(() => setIsError(0), 2000);
                                setIsNameEdit(false);
                            }}>Rename</button>
                        </div>
                    </div>
                </Modal>
            </div>
        </>
    )
};

export default RecentSummaries;