import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity({name: 'todo'})

export class todo{
    @PrimaryGeneratedColumn()
    id: bigint;

    @Column()
    title: string;

    @Column()
    createdAt: Date;
}