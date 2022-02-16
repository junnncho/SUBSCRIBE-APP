import { Column, Entity } from "typeorm";
import { Base } from "./base";

@Entity()
export class Image extends Base {
    @Column({ type: "text" })
    src: string;
}
