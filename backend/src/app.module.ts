import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { EventsController } from './events/events.controller';
import { EventsService } from './events/events.service';
import { EventsModule } from './events/events.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { EventEntity } from './events/entities/event.entity';
import { ParticipantEntity } from './events/entities/participant.entity';

@Module({
    imports: [
        TypeOrmModule.forRoot({
            type: "sqlite",
            database: './database/database.sqlite',
            entities: [EventEntity, ParticipantEntity],
            synchronize: false
        }),
        EventsModule
    ],
    providers: [AppService, EventsService],
    controllers: [AppController, EventsController]
})
export class AppModule {}