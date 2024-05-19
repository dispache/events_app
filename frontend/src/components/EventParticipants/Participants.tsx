import React, { useEffect, useRef, useState } from "react";
import InformedFromEnum from "../../enums/informed-from.enum";
import axios from "axios";
import Participant from "./Participant";

import '../../css/EventParticipants/Participants.css';

import { TextField, Button } from "@mui/material";

type ParticipantType = {
    id: number;
    fullName: string;
    email: string;
    dateOfBirth: string;
    informedFrom: InformedFromEnum;
    eventId: number;
};

type ParticipantsProps = {
    eventId: number;
}

const Participants = ({ eventId } : ParticipantsProps) => {

    const [eventTitle, setEventTitle] = useState<string>("");
    const [participants, setParticipants] = useState<ParticipantType[]>([]);

    const searchFormRef = useRef(null);

    useEffect(() => {
        fetchEventParticipants();
    }, []);

    const fetchEventParticipants = () => {
        axios.get(`http://localhost:8000/events/${eventId}/participants`)
            .then((response) => {
                setEventTitle(response.data.eventTitle);
                setParticipants(response.data.participants);
            }, (err) => {
                alert(err);
            });
    };

    const handleSearchBtnClick = () => {
        const searchForm: any = searchFormRef.current;
        const value: string = searchForm.searchInput.value;
        axios.get(`http://localhost:8000/events/${eventId}/participants/search?value=${value}`)
            .then((response) => {
                setParticipants(response.data);
            }, (err) => {
                alert(err);
            });
    };

    const handleResetBtnClick = () => {
        fetchEventParticipants();
    };

    return (
        <div>
            <div className="event_title_block">
                <h1>"{eventTitle}" participants</h1>
            </div>
            <div className="search_block">
                <form ref={searchFormRef}>
                    <TextField 
                        id="outlined-basic" 
                        label="Search" 
                        variant="outlined"
                        className="search_input"
                        name="searchInput"
                    />
                </form>
                <div className="search_block_btns">
                    <Button variant="contained" onClick={handleSearchBtnClick}>
                        Search
                    </Button>
                    <Button variant="outlined" onClick={handleResetBtnClick}>
                        Reset
                    </Button>
                </div>
            </div>
            <div className="participants_block">
                {
                    participants.length > 0 ?
                        participants.map(participant => <Participant {...participant} key={participant.id}/>) :
                        <h3>Participants were not found...</h3>
                }
            </div>
        </div>
    );
};

export default Participants;