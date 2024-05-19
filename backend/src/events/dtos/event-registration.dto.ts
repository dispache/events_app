import { IsEmail, IsEnum, IsNotEmpty, IsNumber, Length, Matches, MaxLength } from "class-validator";

import InformedFromEnum from "../enums/informed-from.enum";

export class EventRegistrationDto {
    
    @IsNotEmpty()
    @Length(3, 50, {
        message: "Full name length should be from 3 to 50 characters"
    })
    @Matches(/[a-zA-Z]+\s[a-zA-Z]+/, {
        message: "Full name format should be: Firstname Lastname (ex: Jason Statham)"
    })
    fullName: string;
    
    @IsEmail()
    @IsNotEmpty()
    @MaxLength(50, {
        message: "Max length of email is 50 characters"
    })
    email: string;
    
    @IsNotEmpty()
    @Matches(/[0-9]{4,4}\-[0-9]{2,2}\-[0-9]{2,2}/, {
        message: "Please provide 'date of birth' field in format YYYY-MM-DD"
    })
    dateOfBirth: string;
    
    @IsNotEmpty()
    @IsEnum(InformedFromEnum, {
        message: "Possible values: Social media, Friends and Found myself"
    })
    informedFrom: InformedFromEnum;
    
    @IsNotEmpty()
    @IsNumber()
    eventId: number;
}