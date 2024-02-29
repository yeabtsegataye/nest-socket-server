import { Module } from '@nestjs/common';
import { TodoModule } from './todo/todo.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { todo } from './typeorm/entitiy/todo';
// import { MyWebSocketGateway } from './socket/websocket.gateway';
import { UserModule } from './user/user.module';
import { User } from './user/entities/user.entity';
import { MessageModule } from './message/message.module';
import { Message } from './message/entities/message.entity';
import { ChatModule } from './chat/chat.module';
import { Chat } from './chat/entities/chat.entity';
import { NotificationModule } from './notification/notification.module';
import { Notification } from './notification/entities/notification.entity';
import { NotificationGateway } from './notification/notification.controller';
import { AdminModule } from './admin/admin.module';

@Module({
  imports: [TypeOrmModule.forRoot({
    type: 'mysql',
    host: 'mysql-159caac8-tatitaye0-03ac.a.aivencloud.com',//'localhost',
    port: 26637,//3306,
    username:'avnadmin', //'tati', 
    password: 'AVNS_luoZzR5b1SjmKg9dNor',//'123',  
    database: 'defaultdb',//'test',
    entities: [todo, User,Message,Chat,Notification],
    synchronize: true,
  }),TodoModule, UserModule, MessageModule, ChatModule, NotificationModule, AdminModule],
  providers:[NotificationGateway] // this is for websoket connection 
})
export class AppModule {}
