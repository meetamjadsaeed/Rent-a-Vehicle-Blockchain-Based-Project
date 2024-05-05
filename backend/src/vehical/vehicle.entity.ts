import { Entity, Column, ObjectIdColumn } from "typeorm";

@Entity()
export class Vehicle {
  @ObjectIdColumn()
  id: string;

  @Column()
  brand: string;

  @Column()
  model: string;

  @Column()
  year: number;

  @Column()
  available: boolean;

  // Add other properties as needed
}
