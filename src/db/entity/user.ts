import { Column, Entity, OneToMany } from "typeorm";
import { Base } from "./base";
import { Bookmark } from "./bookmark";
import { Searchlist } from "./search";
import { Subscribe } from "./subscribe";

@Entity()
export class User extends Base {
  @Column({ unique: true, type: "varchar", length: 100 })
  email!: string;

  @Column({ type: "varchar", length: 100 })
  password!: string;

  @OneToMany(() => Subscribe, subscribe => subscribe.user)
  subscribes?: Subscribe[];

  @OneToMany(() => Bookmark, bookmark => bookmark.user)
  bookmarks?: Bookmark[];

  @OneToMany(() => Searchlist, searchlist => searchlist.user)
  searchlists?: Searchlist[];
}
