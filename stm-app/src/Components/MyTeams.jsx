import { useState, useEffect } from "react";
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import { List, ListItem, ListItemAvatar, Avatar, ListItemText, IconButton, TextField, Tooltip, Box, Switch, Collapse, useTheme } from "@mui/material";
import DeleteIcon from '@mui/icons-material/Delete';
import Modal from '@mui/material/Modal';
import CloseIcon from "@mui/icons-material/Close";
import MailIcon from "@mui/icons-material/Mail";
import axios from "axios";
import httpClient from "../httpClient";
import { Link } from "react-router-dom";
import LogoutIcon from '@mui/icons-material/Logout';

const MyTeams = () => {

    const theme = useTheme();
    const [team, setTeam] = useState(null);
    const [joinTeamCode, setJoinTeamCode] = useState("");
    const [TeamCode, setTeamCode] = useState("");
    const [groups, setGroups] = useState([]);
    const [showJoinedTeams, setShowJoinedTeams] = useState(false);

    const [isAlert, setIsAlert] = useState(false);
    const [alertCont, setAlertCont] = useState("");
    const [alertType, setAlertType] = useState("");

    const [memberName, setMemberName] = useState("");
    const [memberMail, setMemberMail] = useState("");
    const [open, setOpen] = useState(false);
    const handleClose = () => {
      setOpen(false);
      setMemberMail("");
      setMemberName("");
    };
    const handleOpen = () => {
      setOpen(true);
    };

    useEffect(() => {
        fetchTeam();
        groupsmembersof();
        //eslint-disable-next-line
    }, [isAlert]);

    const fetchTeam = async () => {
        const res = await httpClient.get("http://localhost:8000/get_groups");
        // console.log(res.data.groups);
        setTeam(res.data.groups);
        setTeamCode(res.data.code);
    };

    const groupsmembersof = async () => {
        const res = await httpClient.get("http://localhost:8000/get_group_data");
        // console.log(res.data.groups);
        setGroups(res.data.groups);
    }

    const deletememberof = async (group_code, member) => {
        console.log(group_code, member);
        axios.post("http://localhost:8000/delete_group", {group_code: group_code, member: member})
        .then((res) => {
            setIsAlert(true);
            setAlertCont("Team deleted successfully!!");
            setAlertType("success");
            setTimeout(() => setIsAlert(false), 2000);
        }
        )
        .catch(() => {
            setIsAlert(true);
            setAlertCont("Error in deleting team member!!");
            setAlertType("danger");
            setTimeout(() => setIsAlert(false), 2000);
        }
        );

    }

    const handleCreateTeam = () => {
        setIsAlert(true);
        setAlertCont("Creating team...");
        setAlertType("success");
        axios.post("http://localhost:8000/create_group", {email: localStorage.getItem("email")} )
        .then((res) => {
            if(res.status===200) {
                setTeamCode(res.group_code);
            }
        })
        .catch(() => {
            setIsAlert(true);
            setAlertCont("Error in creating team!!");
            setAlertType("danger");
        });
        setTimeout(() => setIsAlert(false), 2000);
    };
    
    const handleJoinTeam = () => {
        axios.post("http://localhost:8000/add_members", {group_code: joinTeamCode, members: {
            name: localStorage.getItem("name"),
            email: localStorage.getItem("email")
        }})
        .then((res) => {
            setIsAlert(true);
            if(res.status===200) {
                setAlertCont("Team joined successfully!!");
                setAlertType("success");
            } else {
                setAlertCont("Invalid Team Code!!");
                setAlertType("danger");
            }
            setTimeout(() => [setIsAlert(false), setJoinTeamCode("")], 2000);
        })
        .catch(() => {
            setIsAlert(true);
            setAlertCont("Invalid Team Code!!");
            setAlertType("danger");
            setTimeout(() => [setIsAlert(false), setJoinTeamCode("")], 2000);
        });
    };

    const handleDeleteMember = (member) => {
        setIsAlert(true);
        setAlertCont("Deleting...");
        setAlertType("success");
        axios.post("http://localhost:8000/delete_members", {group_code: TeamCode, member: member})
        .then((res) => {
            if(res.status===200) {
                setTeam(team.filter((mem) => mem.email!==member.email));
            }
        })
        .catch(() => {
            setIsAlert(true);
            setAlertCont("Error in deleting team member!!");
            setAlertType("danger");
        });
        setTimeout(() => setIsAlert(false), 2000);
    };

    const handleAddMember = () => {

        if(memberName==="") {
            setIsAlert(true);
            setAlertCont("Enter a valid Name!!");
            setAlertType("danger");
            setTimeout(() => setIsAlert(false), 2000);
            handleClose();
            return ;
        }
        // eslint-disable-next-line
        if(!(/^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/.test(memberMail))) {
            setIsAlert(true);
            setAlertCont("Invalid Mail!!");
            setAlertType("danger");
            setTimeout(() => setIsAlert(false), 2000);
            handleClose();
            return ;
        }
        
        setIsAlert(true);
        setAlertCont("Adding...");
        setAlertType("success");
        axios.post("http://localhost:8000/add_members", {group_code: TeamCode, members: {
            name: memberName,
            email: memberMail
        }})
        .then((res) => {
            if(res.status===200) {
                let curTeam = team;
                curTeam.push({
                    name: memberName,
                    email: memberMail
                });
                setTeam([...curTeam]);
                setTimeout(() => setIsAlert(false), 2000);
                handleClose();
            }
        })
        .catch(() => {
            setTimeout(() => setIsAlert(false), 2000);
            handleClose();
        });
    };

    return (
        <>
            {isAlert && (
                <div style={{position: "fixed", top: "0px", right: "0px"}}>
                    <div style={{position: "absolute", right: "10px", top: "80px", zIndex: 999, width: "max-content"}} className={`alert alert-${alertType}`}>
                        {alertCont}
                    </div>
                </div>
            )}
            <div id="my-teams">
                <div className="join-team">
                    <h3>Join a team</h3>
                    <div className="join-team-div">
                        <TextField id="outlined-teamcode" label="Team Code eg. ABC12" variant="outlined" 
                            value={joinTeamCode}
                            onChange={(e) => setJoinTeamCode(e.target.value)}
                        />
                        <button className="login__create-container__form-container__form--submit" onClick={handleJoinTeam}>Join</button>
                    </div>

                    <Box margin="20px 0">
                        Hide Joined Teams
                        <Switch
                            onChange={() => setShowJoinedTeams(!showJoinedTeams)}
                        />
                        Show Joined Teams
                    </Box>

                    <Collapse in={showJoinedTeams} timeout="auto" unmountOnExit>
                        <div className="part-of-team" style={{marginTop: `${groups.length===0? "0": "1rem"}`}}>
                            <h3>{(groups.length===0)? "Haven't joined any team!" : "Joined Teams"}</h3>
                            <div className="part-of-team-div">
                                {(groups.length===0)? (
                                    <div>
                                        <p>Be a part of any team by entering the team code!!</p>
                                    </div>
                                ) : (
                                    <div className="team-list-div">
                                        <div style={{display:"flex", alignItems: "center", padding: "5px 0"}}>
                                            <div style={{width: "25%"}}>Team Code</div>
                                            <div style={{width: "50%"}}>Team Leader</div>
                                        </div>
                                        <ul>
                                            {
                                                groups.map((group,index) => (
                                                    <li key={index}>
                                                        <div className="list-item">
                                                            <div className="item-code">
                                                                <p style={{color: `${theme.palette.mode==="dark"? "rgba(255, 255, 255, 0.7)": "rgba(0, 0, 0, 0.6)"}`}}>
                                                                    {group.group_code}</p>
                                                            </div>
                                                            <div className="item-details">
                                                                <div className="leader-name">{group.leader_name}</div>
                                                                <div className="leader-mail" style={{color: `${theme.palette.mode==="dark"? "rgba(255, 255, 255, 0.7)": "rgba(0, 0, 0, 0.6)"}`}}>{group.group_leader}</div>
                                                            </div>
                                                            <div className="item-actions">
                                                                <Tooltip title="Mail Leader">
                                                                    <Link to="#" onClick={e => {
                                                                        window.location.href = `mailto:${group.group_leader}`;
                                                                        e.preventDefault();
                                                                    }}>
                                                                        <IconButton edge="end" aria-label="mail" style={{marginRight: "0"}}>
                                                                            <MailIcon />
                                                                        </IconButton>
                                                                    </Link>
                                                                </Tooltip>
                                                                <Tooltip title="Leave Team">
                                                                    <IconButton edge="end" aria-label="delete" onClick={() => deletememberof(group.group_code,{
                                                                        name: localStorage.getItem("name"),
                                                                        email: localStorage.getItem("email")
                                                                    })} style={{marginRight: "0"}}>
                                                                        <LogoutIcon />
                                                                    </IconButton>
                                                                </Tooltip>
                                                            </div>
                                                        </div>
                                                    </li>
                                                ))
                                            }
                                        </ul>
                                    </div>
                                )}
                            </div>
                        </div>
                    </Collapse>
                </div>
                <div className="create-team">
                    <h3>{team===null? "Create a Team" : "Your Team"}</h3>
                    <div className="create-team-div">
                        {team===null? (
                            <div>
                                <p>Haven't any team? Create One!!</p>
                                <button className="login__create-container__form-container__form--submit create-team-btn" onClick={handleCreateTeam}>Create Team</button>
                            </div>
                        ) : (
                            <div className="team-list-div">
                                <div className="team-details-div">
                                    <h5>Team Details:</h5>
                                    <h6>Code: {TeamCode}</h6>
                                    <h6>Total Members: {team.length}</h6>
                                </div>
                                <List className="team-list">
                                    {
                                        team.map((member,index) => (
                                            <ListItem key={index}
                                                secondaryAction={
                                                    <div>
                                                        <Tooltip title="Mail">
                                                            <Link to="#" onClick={e => {
                                                                window.location.href = `mailto:${member.email}`;
                                                                e.preventDefault();
                                                            }}>
                                                                <IconButton edge="end" aria-label="mail" style={{marginRight: "0"}}>
                                                                    <MailIcon />
                                                                </IconButton>
                                                            </Link>
                                                        </Tooltip>
                                                        <Tooltip title="Delete Member">
                                                            <IconButton edge="end" aria-label="delete" onClick={() => handleDeleteMember(member)} style={{marginRight: "0"}}>
                                                                <DeleteIcon />
                                                            </IconButton>
                                                        </Tooltip>
                                                    </div>
                                                }
                                                className="team-list-item"
                                            >
                                            <ListItemAvatar>
                                                    <Tooltip title={member.name}>
                                                        <Avatar>
                                                            <AccountCircleIcon />
                                                        </Avatar>
                                                    </Tooltip>
                                            </ListItemAvatar>
                                            <ListItemText
                                                primary={member.name}
                                                secondary={member.email}
                                            />
                                            </ListItem>
                                        ))
                                    }
                                </List>
                                <div className="add-button-div">
                                    <button className="login__create-container__form-container__form--submit add-member-btn" onClick={handleOpen}>Add Member</button>
                                </div>
                            </div>
                        )}
                    </div>
                </div>

                <Modal
                    open={open}
                    onClose={handleClose}
                    aria-labelledby="modal-modal-title"
                    aria-describedby="modal-modal-description"
                >
                    <div id="member-modal">
                        <div onClick={handleClose} style={{textAlign: "right", cursor: "pointer", padding: "5px 10px", color: "var(--main-color-2)"}}>
                            <CloseIcon />
                        </div>
                        <input placeholder="User Name" value={memberName} onChange={e => setMemberName(e.target.value)} />
                        <input placeholder="User Mail" value={memberMail} onChange={e => setMemberMail(e.target.value)} />
                        <div className="member-modal-btn-div">
                            <button className="login__create-container__form-container__form--submit" onClick={handleAddMember}>Add</button>
                        </div>
                    </div>
                </Modal>
            </div>
        </>
    );
}

export default MyTeams;