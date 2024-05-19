import { 
    Body, Controller, Get, Param, ParseIntPipe, 
    Post, Query, ValidationPipe 
} from '@nestjs/common';
import { EventsService } from './events.service';

import { EventRegistrationDto } from './dtos/event-registration.dto';
import SortByEnum from './enums/sort-by.enum';
import OrderByEnum from './enums/order-by.enum';

type GetEventsQueryString = {
    page: string;
    sortBy: SortByEnum;
    orderBy: OrderByEnum;
};

@Controller('events')
export class EventsController {
    constructor(private readonly eventsService: EventsService) {}

    @Get()
    public getEvents(@Query() query: GetEventsQueryString) {
        const page: number = +query['page'] || 1;
        const sortBy: SortByEnum = query['sortBy'];
        const orderBy: OrderByEnum = query['orderBy'];
        return this.eventsService.getEvents(page, sortBy, orderBy);
    }

    @Post("/:eventId/registration")
    public submitEventRegistration( 
        @Body(new ValidationPipe()) body: EventRegistrationDto
    ) {
        return this.eventsService.submitEventRegistration(body);
    }

    @Get("/:eventId/participants")
    public getEventParticipants(@Param("eventId", ParseIntPipe) eventId: number) {
        return this.eventsService.getEventParticipants(eventId);
    }

    @Get("/:eventId/participants/search")
    public getEventParticipantsByFullNameOrEmail(
        @Param("eventId", ParseIntPipe) eventId: number,
        @Query("value") value: string
    ) {
        return this.eventsService.getEventParticipantsByFullNameOrEmail(eventId, value);
    }
}
