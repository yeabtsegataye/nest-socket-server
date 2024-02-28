// chat.controller.ts

import { Controller, Post, Body } from '@nestjs/common';
import { MyWebSocketGateway } from './websocket.gateway';

@Controller('chat')
export class ChatController {
  constructor(private readonly wsGateway: MyWebSocketGateway) {}

  @Post('join-room')
  joinRoom(@Body() data: { userId: string, roomId: string }) {
    this.wsGateway.server.to(data.roomId).emit('userJoined', data.userId);
  }
}
