import { Injectable } from '@nestjs/common';
import { CreateTodoDto } from './dto/create-todo.dto';
import { UpdateTodoDto } from './dto/update-todo.dto';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { todo } from 'src/typeorm/entitiy/todo';
import { MyWebSocketGateway } from '../socket/websocket.gateway';
import { Notification } from 'src/notification/entities/notification.entity';
import { NotificationGateway } from '../notification/notification.controller'; // Import your WebSocketGateway

@Injectable()
export class TodoService {
  ///////////
  constructor(
    @InjectRepository(todo)
    private todoRepository: Repository<todo>,
    @InjectRepository(Notification)
    private notifRepository: Repository<Notification>,
    private readonly notificationGateway: NotificationGateway, // Inject NotificationGateway
  ) {}
/////////////////
  async create(createTodoDto: CreateTodoDto) {
    // Create a new todo entity with the data from createTodoDto
    const todo = await this.todoRepository.create({
      title: createTodoDto.title,
      createdAt: new Date(),
    });
  
    // Save the new todo entity to the database
    const savedTodo = await this.todoRepository.save(todo);

    // Create a new notification entity
    const notification = await this.notifRepository.create({
      message: createTodoDto.title, // Adjust this according to your data structure
    });
    console.log(notification.message)
    // Save the new notification entity to the database
    const savedNotification = await this.notifRepository.save(notification);
    const role = "admin"

    // Emit notification to admins using NotificationGateway
    await this.notificationGateway.emitNotificationToAdmins(savedNotification,role);

    return savedTodo;
  }
  

  async findAll() {
    const data = await this.todoRepository.find({
      select:{
        title: true,
        createdAt: true,
        id:true
      }
    })
    return data;
  }

  async findOne(id: number) {
    const data = await this.todoRepository
    .createQueryBuilder("todo")
    .where("todo.id = :id", { id })
    .getOne()
    return data;
}


  update(id: number, updateTodoDto: UpdateTodoDto) {
    const updatetodo = this.todoRepository.createQueryBuilder()
    .update(todo)
    .set({title: updateTodoDto.title})
    .where("id = :id",{id})
    .execute()
    return updatetodo;
  }

  remove(id: number) {
    const deletetodo = this.todoRepository.createQueryBuilder()
    .delete()
    .from(todo)
    .where('id = :id',{id})
    .execute()
  }
}
