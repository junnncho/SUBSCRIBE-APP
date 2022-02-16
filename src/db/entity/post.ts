import { Column, Entity, OneToOne, JoinColumn, ManyToOne } from "typeorm";
import { Base } from "./base";
import { Image } from "./image";
import { Website } from "./website";

@Entity()
export class Post extends Base {
  @Column({ type: "text" })
  title: string;

  @Column({ type: "longtext" })
  body: string;

  @Column({ type: "text" })
  url: string;

  @ManyToOne(() => Website, website => website.posts)
  website: Website;

  @OneToOne(() => Image)
  @JoinColumn()
  imageSrc: Image;
}
