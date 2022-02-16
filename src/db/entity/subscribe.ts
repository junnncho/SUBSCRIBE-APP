import { Column, Entity, ManyToOne, OneToOne, JoinColumn } from "typeorm";
import { Base } from "./base";
import { User } from "./user";
import { Website } from "./website";

@Entity()
export class Subscribe extends Base {
    @Column({ type: "varchar", length: 100 })
    customName: string;

    @Column({ type: "varchar", length: 10 })
    customColor: string;

    @ManyToOne(() => User, user => user.subscribes)
    user: User;

    @ManyToOne(() => Website, website => website.subscribes)
    website: Website;
}