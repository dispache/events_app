import React, { useRef } from "react";

import '../../css/EventRegistration/RegistrationForm.css';

import { 
    TextField, FormControl, FormLabel, RadioGroup, FormControlLabel, 
    Radio, Button 
} from "@mui/material";

import InformedFromEnum from "../../enums/informed-from.enum";

import axios from "axios";

type RegistrationFormProps = {
    eventId: number;
}

const RegistrationForm = ({ eventId } : RegistrationFormProps) => {
    
    const registerFormRef = useRef(null);

    const handleRegisterClick = () => {
        const form: any = registerFormRef.current;
        const fullName: string = form.full_name.value;
        const email: string = form.email.value;
        const dateOfBirth: string = form.date_of_birth.value;
        const informedFrom: InformedFromEnum = form.informed_from.value;
        axios.post(`http://localhost:8000/events/${eventId}/registration`, {
            fullName, email, dateOfBirth, informedFrom, eventId
        }).then(response => {
            alert("Successfully submitted");
            window.location.href = '/';
        }, (err) => {
            alert(err.response.data.message);
        });
    };
    
    return (
        <div>
            <form ref={registerFormRef}>
            <ul className="form_fields">
                <TextField 
                    id="outlined-basic" 
                    label="Full name" 
                    variant="outlined"
                    name="full_name" 
                />
                <TextField 
                    id="outlined-basic" 
                    label="Email" 
                    variant="outlined"
                    name="email" 
                />
                <TextField 
                    id="outlined-basic" 
                    label="Date of birth (YYYY-MM-DD)" 
                    variant="outlined"
                    name="date_of_birth" 
                />
                <FormControl>
                    <FormLabel id="demo-row-radio-buttons-group-label">Where did you hear about this event?</FormLabel>
                    <RadioGroup
                        row
                        aria-labelledby="demo-row-radio-buttons-group-label"
                        name="informed_from"
                    >
                        <FormControlLabel value={InformedFromEnum.socialMedia} control={<Radio />} label="Social media" />
                        <FormControlLabel value={InformedFromEnum.friends} control={<Radio />} label="Friends" />
                        <FormControlLabel value={InformedFromEnum.foundMyself} control={<Radio />} label="Found myself" />
                    </RadioGroup>
                </FormControl>
            </ul>
            <Button variant="contained" className="register_form_btn" onClick={handleRegisterClick}>Register</Button>
            </form>
        </div>
    );
};

export default RegistrationForm;