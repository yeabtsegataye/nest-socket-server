import { Module } from '@nestjs/common';
import { AdminService } from './admin.service';
import { AdminController } from './admin.controller';
import { NotificationModule } from '../notification/notification.module';

@Module({
  imports :[NotificationModule],
  controllers: [AdminController],
  providers: [AdminService],
})
export class AdminModule {}
