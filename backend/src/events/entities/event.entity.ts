import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity("events")
export class EventEntity {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({
        nullable: false
    })
    title: string;

    @Column()
    description: string;

    @Column({
        nullable: false
    })
    event_date: string;

    @Column({
        nullable: false
    })
    organizer: string;
}