import {
    Entity,
    BaseEntity,
    PrimaryGeneratedColumn,
    Column,
    OneToMany,
} from "typeorm";
import { FinancialDatapoint } from "./FinancialDatapoint";

@Entity()
export class FinancialDatapointType extends BaseEntity {
    constructor() {
        super();
    }

    @PrimaryGeneratedColumn("uuid")
    id!: string;

    @Column()
    title!: string;

    @OneToMany(() => FinancialDatapoint, (datapoint) => datapoint.type)
    datapoints!: FinancialDatapoint[];
}
