
import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity()

export class Todo {
    @PrimaryGeneratedColumn()
    id: bigint;

    @Column()
    title: string;

    @Column()
    createdAt: Date;
}

