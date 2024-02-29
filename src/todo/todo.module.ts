import { Module } from '@nestjs/common';
import { TodoService } from './todo.service';
import { TodoController } from './todo.controller';
import { todo } from 'src/typeorm/entitiy/todo';
import { TypeOrmModule } from '@nestjs/typeorm';
import { NotificationGateway } from '../notification/notification.controller';
import { Notification } from '../notification/entities/notification.entity';
import { NotificationModule } from '../notification/notification.module';


@Module({
  imports: [TypeOrmModule.forFeature([todo,]),TypeOrmModule.forFeature([Notification]),NotificationModule], 
  controllers: [TodoController],
  providers: [TodoService,NotificationGateway],
})
export class TodoModule {}
