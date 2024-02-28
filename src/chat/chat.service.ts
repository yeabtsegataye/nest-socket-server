import { Injectable } from '@nestjs/common';
import { CreateChatDto } from './dto/create-chat.dto';
import { UpdateChatDto } from './dto/update-chat.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Chat } from './entities/chat.entity';
import { Repository } from 'typeorm';

@Injectable()
export class ChatService {
  constructor(@InjectRepository(Chat)private chat : Repository<Chat>){}
  async create(createChatDto: CreateChatDto) {
    const data = await this.chat.createQueryBuilder()
      .insert()
      .into(Chat)
      .values([
        {
          sender: createChatDto.sender, 
          receiver: createChatDto.receiver,
        },
      ])
      .execute()
return data.identifiers[0].id
  }

  findAll() {
    return `This action returns all chat`;
  }

  findOne(id: number) {
    return `This action returns a #${id} chat`;
  }

  update(id: number, updateChatDto: UpdateChatDto) {
    return `This action updates a #${id} chat`;
  }

  remove(id: number) {
    return `This action removes a #${id} chat`;
  }
}
