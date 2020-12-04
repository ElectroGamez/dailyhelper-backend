import {
    Entity,
    BaseEntity,
    PrimaryGeneratedColumn,
    OneToMany,
} from "typeorm";
import { CalorieDatapoint } from "./CalorieDatapoint";
import { FinancialDatapoint } from "./FinancialDatapoint";

@Entity()
export class User extends BaseEntity {
    constructor() {
        super();
    }

    @PrimaryGeneratedColumn("uuid")
    id!: string;

    @OneToMany(() => FinancialDatapoint, (datapoint) => datapoint.owner)
    financialDatapoints!: FinancialDatapoint[];

    @OneToMany(() => CalorieDatapoint, (datapoint) => datapoint.owner)
    calorieDatapoints!: CalorieDatapoint[];
}
