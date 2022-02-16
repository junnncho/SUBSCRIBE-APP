import { OneToOne, Entity, JoinColumn, ManyToOne } from "typeorm";
import { Base } from "./base";
import { Post } from "./post";
import { User } from "./user";
@Entity()
export class Bookmark extends Base {
    @OneToOne(() => Post)
    @JoinColumn()
    post: Post;

    @ManyToOne(() => User, user => user.bookmarks)
    user: User;
}
