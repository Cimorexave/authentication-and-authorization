//import from typeorm
import { Entity, PrimaryGeneratedColumn, Column, BaseEntity } from "typeorm";

//defining entity
@Entity()
class User extends BaseEntity {
    @PrimaryGeneratedColumn() 
    id: number;

    @Column()
    name: string;

    @Column()
    password: string;
}

export default User;