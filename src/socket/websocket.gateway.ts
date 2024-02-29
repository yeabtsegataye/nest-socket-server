// import { WebSocketGateway, WebSocketServer, OnGatewayConnection, OnGatewayDisconnect, SubscribeMessage } from '@nestjs/websockets';
// import { Server, Socket } from 'socket.io';
// import { JwtService, TokenExpiredError } from '@nestjs/jwt'; // Import TokenExpiredError
// // import { jwtConstants } from '../user/containt';
// import {  OnModuleInit } from '@nestjs/common';

// interface JwtPayload {
//   id: string;
//   role: string;
//   iat?: number;
//   exp?: number;
// }
// export interface socketMetaPayload extends JwtPayload {
//   socketId: string;
// }

// @WebSocketGateway({ cors: '*' })
// export class MyWebSocketGateway implements OnGatewayConnection, OnGatewayDisconnect {
//   [x: string]: any;

//   @WebSocketServer()
//    server: Server;
//    socketMap = new Map<string, socketMetaPayload>();

  
//   constructor(
//     private readonly jwt: JwtService
//   ) { }

//   async handleConnection(client: Socket) {
//     console.log(`Client connected: ${client.id}`);
//     const token = client.handshake.headers.authorization?.split(' ')[1];
//     if (!token) {
//       client.disconnect(true);
//       console.log('returned')
//       return;
//     }
//     try {
//       const payload = this.jwt.verify(token);
//       console.log("mypayload",payload);
//        this.socketMap.set(payload._id, {
//         ...payload,
//         socketId: client.id,
//       });
//     } catch (error) {
//       if (error instanceof TokenExpiredError) {
//         console.log('Token expired');
//       } else {
//         console.error('Error verifying token:', error);
//       }
//       client.disconnect(true);
//       return;
//       // this.socketMap.delete(socket.id);

//     }
//   }

//   handleDisconnect(client: Socket) {
//     console.log(`Client disconnected: ${client.id}`);
//   }

//   @SubscribeMessage('joinRoom')
//   handleJoinRoom(client: Socket, room: string) {
//     client.join(room);
//     console.log(`Client ${client.id} joined room ${room}`);
//   }

//   @SubscribeMessage('sendMessage')
//   handleMessage(client: Socket, data: any) {
//     this.server.to(data.room).emit('connection', data.message);
//   }

//   // emitNotification(message: string) {
//   //   this.server.emit('notification', { message });
//   // }

//   async emitNotification(userId: string, notification: Partial<Notification>) {
//     const socketMeta = this.socketMap.get(userId);
//     const notif = await this.TodoService.create(notification);
//     if (socketMeta) {
//       this.server.to(socketMeta?.socketId).emit('notification', notif);
//     } else {
//       console.log('user is not online at the moment!');
//     }
//   }
// }
