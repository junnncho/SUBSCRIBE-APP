import { PrimaryGeneratedColumn, CreateDateColumn } from "typeorm";

export class Base {
  @PrimaryGeneratedColumn()
  public id: number;
  @CreateDateColumn()
  public createdAt?: string;
}
