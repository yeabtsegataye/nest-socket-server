import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity({name: "notification"})

export class Notification {
    @PrimaryGeneratedColumn()
    id : bigint

    @Column()
    message : string

}
