import { Module } from '@nestjs/common';
import { EventsService } from './events.service';
import { EventsController } from './events.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { EventEntity } from './entities/event.entity';
import { ParticipantEntity } from './entities/participant.entity';

@Module({
    imports: [
        TypeOrmModule.forFeature([EventEntity, ParticipantEntity])
    ],
    providers: [EventsService],
    controllers: [EventsController],
    exports: [TypeOrmModule]
})
export class EventsModule {}
