import { Column, Entity, ManyToOne } from "typeorm";
import { Base } from "./base";
import { User } from "./user";

@Entity()
export class Searchlist extends Base {
  @Column({ type: "text" })
  word: string;

  @ManyToOne(() => User, user => user.searchlists)
  user: User;
}
