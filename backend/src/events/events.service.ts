import { Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { EventEntity } from './entities/event.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { EventRegistrationDto } from './dtos/event-registration.dto';
import { ParticipantEntity } from './entities/participant.entity';
import SortByEnum from './enums/sort-by.enum';
import OrderByEnum from './enums/order-by.enum';

@Injectable()
export class EventsService {
    constructor(
        @InjectRepository(EventEntity)
        private readonly eventsRepository: Repository<EventEntity>,
        @InjectRepository(ParticipantEntity)
        private readonly participantsRepository: Repository<ParticipantEntity>
    ) {}

    public async getEvents(page: number, sortBy: SortByEnum, orderBy: OrderByEnum) {
        const take: number = 8;
        const skip: number = (page-1) * take;
        const [events, total]: [EventEntity[], number] = await this.eventsRepository.findAndCount(
            { 
                order: { [sortBy]: orderBy === OrderByEnum.asc ? "ASC" : "DESC" },
                take, 
                skip
        });
        return {
            events,
            total
        };
    }

    public async submitEventRegistration(body: EventRegistrationDto) {
        await this.participantsRepository.insert(body);
        return {
            state: 'created',
            data: {...body}
        };
    }

    public async getEventParticipants(eventId: number) {
        const participants = await this.participantsRepository.find({
            where: {
                eventId
            }
        });
        const eventTitle = (await this.eventsRepository.findOneBy({ id: eventId })).title;
        return {
            eventTitle,
            participants
        };    
    }

    public async getEventParticipantsByFullNameOrEmail(eventId: number, value: string) {
        const emailPattern: RegExp = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|.(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        const isEmail: boolean = emailPattern.test(value);
        const property: string = isEmail ? "email" : "fullName";
        const participants: ParticipantEntity[] = await this.participantsRepository.find({
            where: {
                [property]: value,
                eventId
            }
        });
        return participants;
    }

}
