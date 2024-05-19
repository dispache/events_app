import { Entity, PrimaryGeneratedColumn, Column } from "typeorm";

import InformedFromEnum from "../enums/informed-from.enum";

@Entity("participants")
export class ParticipantEntity {

    @PrimaryGeneratedColumn()
    id: number;

    @Column({
        name: "full_name"
    })
    fullName: string;

    @Column()
    email: string;

    @Column({
        name: "date_of_birth"
    })
    dateOfBirth: string;

    @Column({
        name: "informed_from"
    })
    informedFrom: InformedFromEnum;

    @Column({
        name: "event_id"
    })
    eventId: number;

}