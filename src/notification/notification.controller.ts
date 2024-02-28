import { WebSocketGateway, WebSocketServer, SubscribeMessage } from '@nestjs/websockets';
import { OnModuleInit } from '@nestjs/common';
import { Server, Socket } from 'socket.io';
import { JwtService, TokenExpiredError } from '@nestjs/jwt';
import { NotificationService } from './notification.service';

interface JwtPayload {
  id: string;
  role: string;
  iat?: number;
  exp?: number;
}

interface SocketMetaPayload extends JwtPayload {
  socketId: string;
}

interface GroupedNotification extends JwtPayload {
  socketId: string;
}

@WebSocketGateway({ cors: '*' })
export class NotificationGateway implements OnModuleInit {

  @WebSocketServer()
  server: Server;
  socketMap = new Map<string, SocketMetaPayload>();
  socketMapGroup = new Map<string, GroupedNotification[]>(); // Changed to an array for multiple sockets per role

  constructor(
    private readonly notificationService: NotificationService,
    private readonly jwt: JwtService
  ) { }

  onModuleInit() {
    this.server.on('connection', async (socket) => {
      console.log(`Socket connected: ${socket.id}`);
      const token = socket.handshake.headers.authorization?.split(' ')[1];
      if (!token) {
        socket.disconnect(true);
        console.log('Returned');
        return;
      }

      try {
        const payload = this.jwt.verify(token);
        console.log("My payload", payload);

        this.socketMap.set(payload.id, {
          ...payload,
          socketId: socket.id,
        });

        // Check if role exists in the group map
        if (!this.socketMapGroup.has(payload.role)) {
          // If role doesn't exist, create a new entry with an empty array
          this.socketMapGroup.set(payload.role, []);
        }

        // Push the socket info to the array for the corresponding role
        const group = this.socketMapGroup.get(payload.role);
        group.push({
          ...payload,
          socketId: socket.id,
        });

        // Update the map with the modified array
        this.socketMapGroup.set(payload.role, group);
      } catch (error) {
        if (error instanceof TokenExpiredError) {
          console.log('Token expired');
        } else {
          console.error('Error verifying token:', error);
        }
        return;
      }
    });
  }

  handleDisconnect(client: Socket) {
    console.log(`Client disconnected: ${client.id}`);
    // Remove disconnected client from the socketMap
    this.socketMap.forEach((value, key) => {
      if (value.socketId === client.id) {
        this.socketMap.delete(key);
      }
    });

    // Remove disconnected client from the socketMapGroup
    this.socketMapGroup.forEach((group, key) => {
      const updatedGroup = group.filter(socket => socket.socketId !== client.id);
      this.socketMapGroup.set(key, updatedGroup);
    });
  }

  async emitNotificationToAdmins(notification, role) {
    // Get admin sockets from the group map based on the 'admin' role
    const adminSockets = this.socketMapGroup.get('admin') || [];

    // Send notification to admin sockets
    adminSockets.forEach(socketMeta => {
      this.server.to(socketMeta.socketId).emit('notification', notification);
    });

    // Log if no admin sockets found
    if (adminSockets.length === 0) {
      console.log('No admin users online at the moment!');
    }
  }

  async emitNotificationToGroups(notification, role: string) {
    // Get sockets from the group map based on the provided role
    const sockets = this.socketMapGroup.get(role) || [];

    // Send notification to sockets in the specified group
    sockets.forEach(socketMeta => {
      this.server.to(socketMeta.socketId).emit('notification', notification);
    });

    // Log if no sockets found in the group
    if (sockets.length === 0) {
      console.log(`No ${role} users online at the moment!`);
    }
  }

  @SubscribeMessage('currentUsers')
  async currentUsers(client: Socket) {
    client.emit('currentUsers', Array.from(this.socketMap.values()));
  }
}
