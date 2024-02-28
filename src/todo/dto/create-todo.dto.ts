import { IsString } from "class-validator";

export class CreateTodoDto {
    id: number
    @IsString()
    title: string;
    adminID : number
}
