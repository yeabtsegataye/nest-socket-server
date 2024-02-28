import { Module } from '@nestjs/common';
import { NotificationService } from './notification.service';
import { NotificationGateway } from './notification.controller'; // Assuming this is the correct import path
import { Notification } from '../notification/entities/notification.entity';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [TypeOrmModule.forFeature([Notification])],
  controllers: [], // You don't need to list NotificationGateway as a controller here
  providers: [NotificationService, NotificationGateway], // NotificationGateway should be listed as a provider
  exports: [NotificationGateway, NotificationService] // Export the providers if needed in other modules
})
export class NotificationModule {}
