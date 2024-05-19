import React from "react";

import '../../css/EventsBoard/Event.css';

type EventProps = {
    id: number;
    title: string;
    description: string;
    event_date: string;
    organizer: string;
}

const Event = ({ id, title, description, event_date, organizer } : EventProps) => {
    
    const handleRegisterClick = () => {
        window.location.href = `/event/${id}/registration`;
    };

    const handleViewClick = () => {
        window.location.href = `/event/${id}/participants`;
    };
    
    return (
        <div className="event_block">
            <h2 className="event_title">{title}</h2>
            <h5 className="event_description">
                {
                    description === null ?
                        "Empty description" :
                        description.length < 46 ?
                        description :
                        description.slice(0, 46) + "..."
                }
            </h5>
            <h5>({event_date})</h5>
            <h5>
                {
                    organizer.length < 46 ?
                        organizer :
                        organizer.slice(0,46) + "..."
                }   
            </h5>
            <div className="event_btns">
                <button className="register_btn" onClick={handleRegisterClick}>Register</button>
                <button className="view_btn" onClick={handleViewClick}>View</button>
            </div>
        </div>
    );
};

export default Event;