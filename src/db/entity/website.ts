import { Column, Entity, OneToMany } from "typeorm";
import { Base } from "./base";
import { Post } from "./post";
import { Subscribe } from "./subscribe";

@Entity()
export class Website extends Base {
    @Column({ type: "text" })
    domain: string;

    @OneToMany(() => Post, post => post.website)
    posts: Post[];

    @OneToMany(() => Subscribe, subscribe => subscribe.website)
    subscribes: Subscribe[];
}
