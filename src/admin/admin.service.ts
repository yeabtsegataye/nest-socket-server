import { Injectable } from '@nestjs/common';
import { CreateAdminDto } from './dto/create-admin.dto';
import { UpdateAdminDto } from './dto/update-admin.dto';
import { NotificationGateway } from '../notification/notification.controller'; // Import your WebSocketGateway

@Injectable()
export class AdminService {
  constructor(    private readonly notificationGateway: NotificationGateway, // Inject NotificationGateway
  ){}
  create(createAdminDto: CreateAdminDto) {

    console.log(createAdminDto ,"the admin dto")
    this.notificationGateway.emitNotificationToGroups(createAdminDto.message ,createAdminDto.role);
    return 'This action adds a new admin';
  }

  findAll() {
    return `This action returns all admin`;
  }

  findOne(id: number) {
    return `This action returns a #${id} admin`;
  }

  update(id: number, updateAdminDto: UpdateAdminDto) {
    return `This action updates a #${id} admin`;
  }

  remove(id: number) {
    return `This action removes a #${id} admin`;
  }
}
