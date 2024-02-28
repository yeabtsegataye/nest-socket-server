import { Module } from '@nestjs/common';
import { TodoService } from './todo.service';
import { TodoController } from './todo.controller';
import { todo } from 'src/typeorm/entitiy/todo';
import { TypeOrmModule } from '@nestjs/typeorm';
import { MyWebSocketGateway } from '../socket/websocket.gateway';
import { Notification } from '../notification/entities/notification.entity';
import { NotificationModule } from '../notification/notification.module';


@Module({
  imports: [TypeOrmModule.forFeature([todo,]),TypeOrmModule.forFeature([Notification]),NotificationModule], 
  controllers: [TodoController],
  providers: [TodoService,MyWebSocketGateway],
})
export class TodoModule {}
