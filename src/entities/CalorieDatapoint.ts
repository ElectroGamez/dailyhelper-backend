import {
    Entity,
    BaseEntity,
    PrimaryGeneratedColumn,
    Column,
    ManyToOne,
} from "typeorm";
import { User } from "./User";

@Entity()
export class CalorieDatapoint extends BaseEntity {
    constructor(title: string, calories: number, owner: User) {
        super();
        this.title = title;
        this.calories = calories;
        this.owner = owner;
    }

    @PrimaryGeneratedColumn("uuid")
    id!: string;

    @Column()
    title!: string;
    
    @Column()
    calories!: number;

    @Column({ type: "timestamp", default: () => "CURRENT_TIMESTAMP"})
    timestamp!: string

    @ManyToOne(() => User, (user) => user.calorieDatapoints)
    owner!: User;
}
