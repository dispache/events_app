import React from "react";

import '../../css/EventParticipants/Participant.css';

type ParticipantProps = {
    id: number;
    fullName: string;
    email: string;
};

const Participant = ({ id, fullName, email } : ParticipantProps) => {
    return (
        <div className="participant_block">
            <p className="participant_fullname">{fullName}</p>
            <p className="participant_email">{email}</p>
        </div>
    );
};

export default Participant;