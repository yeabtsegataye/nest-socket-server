// chat.controller.ts

import { Controller, Post, Body } from '@nestjs/common';
import { NotificationGateway } from '../notification/notification.controller';

@Controller('chat')
export class ChatController {
  constructor(private readonly wsGateway: NotificationGateway) {}

  @Post('join-room')
  joinRoom(@Body() data: { userId: string, roomId: string }) {
    this.wsGateway.server.to(data.roomId).emit('userJoined', data.userId);
  }
}
