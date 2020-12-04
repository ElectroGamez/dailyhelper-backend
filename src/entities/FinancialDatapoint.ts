import {
    Entity,
    BaseEntity,
    PrimaryGeneratedColumn,
    Column,
    ManyToOne,
} from "typeorm";
import { FinancialDatapointType } from "./FinancialDatapointType";
import { User } from "./User";

@Entity()
export class FinancialDatapoint extends BaseEntity {
    constructor() {
        super();
    }

    @PrimaryGeneratedColumn("uuid")
    id!: string;

    @Column()
    title!: string;
    
    @Column("float")
    price!: number;

    @ManyToOne(() => FinancialDatapointType, (datapointType) => datapointType.datapoints)
    type!: FinancialDatapointType;

    @Column({ type: "timestamp", default: () => "CURRENT_TIMESTAMP"})
    timestamp!: string

    @ManyToOne(() => User, (user) => user.financialDatapoints)
    owner!: User;
}
