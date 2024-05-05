import { Entity, Column, ObjectIdColumn } from "typeorm";

@Entity()
export class RentalTransaction {
  @ObjectIdColumn()
  id: string;

  @Column()
  userId: string;

  @Column()
  vehicleId: string;

  @Column()
  startDate: Date;

  @Column()
  endDate: Date;

  // Add other properties as needed
}
