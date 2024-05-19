import React from "react";
import RegistrationForm from "../components/EventRegistration/RegistrationForm";

const EventRegistration = () => {

    const eventId: number = Number(window.location.pathname.match(/[0-9]+/)?.[0]);

    return (
        <div>
            <header><h1>Event registration</h1></header>
            <RegistrationForm eventId={eventId}/>
        </div>
    );
};

export default EventRegistration;