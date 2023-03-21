import { useState, useEffect, useContext } from "react";
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import { List, ListItem, ListItemAvatar, Avatar, ListItemText, IconButton } from "@mui/material";
import DeleteIcon from '@mui/icons-material/Delete';
import Modal from '@mui/material/Modal';
import CloseIcon from "@mui/icons-material/Close";
import axios from "axios";
import httpClient from "../httpClient";
import commonContext from "../Context/commonContext";

const MyTeams = () => {

    const [team, setTeam] = useState(null);
    const [joinTeamCode, setJoinTeamCode] = useState("");
    const [TeamCode, setTeamCode] = useState("");

    const { setLoading } = useContext(commonContext); 

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
        const fetchTeam = async () => {
            const res = await httpClient.get("http://localhost:8000/get_groups");
            // console.log(res.data.groups);
            setTeam(res.data.groups);
            setTeamCode(res.data.code)
        };
        fetchTeam();
    }, []);

    const handleCreateTeam = () => {
        axios.post("http://localhost:8000/create_group", {email: localStorage.getItem("email")} )
    };
    
    const handleJoinTeam = () => {
        axios.post("http://localhost:8000/add_members", {group_code: joinTeamCode, members: [{
            name: localStorage.getItem("name"),
            email: localStorage.getItem("email")
        }]})
    };

    const handleDeleteMember = (e) => {
        axios.post("http://localhost:8000/delete_members", {group_code: TeamCode, member: e})
    };

    const handleAddMember = () => {
        axios.post("http://localhost:8000/add_members", {group_code: TeamCode, members: [{
            name: memberName,
            email: memberMail
        }]})
        alert("Member Added");
        handleClose();
    };

    return (
        <div id="my-teams">
            <div className="join-team-div">
                <input placeholder="Team Code" value={joinTeamCode} onChange={e => setJoinTeamCode(e.target.value)} />
                <button className="login__create-container__form-container__form--submit"onClick={handleJoinTeam}>Join</button>
            </div>
            <div className="create-team-div">
                {team===null? (
                    <div>
                        <p>Haven't any team?</p>
                        <button className="login__create-container__form-container__form--submit" onClick={handleCreateTeam}>Create Team</button>
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
                                        <IconButton edge="end" aria-label="delete" onClick={() => handleDeleteMember(member)}>
                                            <DeleteIcon />
                                        </IconButton>
                                    }
                                    >
                                    <ListItemAvatar>
                                        <Avatar>
                                        <AccountCircleIcon />
                                        </Avatar>
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
                            <button className="login__create-container__form-container__form--submit" onClick={handleOpen}>Add Member</button>
                        </div>
                    </div>
                )}
            </div>
            <Modal
                open={open}
                onClose={handleClose}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
            >
                <div id="member-modal">
                    <div onClick={handleClose} style={{textAlign: "right", cursor: "pointer", padding: "5px 10px"}}>
                        <CloseIcon />
                    </div>
                    <input placeholder="Member Name" value={memberName} onChange={e => setMemberName(e.target.value)} />
                    <input placeholder="Member Mail" value={memberMail} onChange={e => setMemberMail(e.target.value)} />
                    <div className="member-modal-btn-div">
                        <button className="login__create-container__form-container__form--submit" onClick={handleAddMember}>Add</button>
                    </div>
                </div>
            </Modal>
        </div>
    );
}

export default MyTeams;