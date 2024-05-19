import React from "react";
import Participants from "../components/EventParticipants/Participants";

const EventParticipants = () => {

    const eventId: number = Number(window.location.pathname.match(/[0-9]+/)?.[0]);

    return (
        <div>
            <Participants eventId={eventId} />
        </div>
    );
};

export default EventParticipants;