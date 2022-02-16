import { IPost } from "@/interfaces/IPost";
import { AbstractRepository, EntityRepository } from "typeorm";
import { Image } from "../entity/image";

@EntityRepository(Image)
export class ImageRepository extends AbstractRepository<Image> {
  public saveImage(post: IPost): Promise<Image> {
    const newImage = new Image();
    newImage.src = post.img_link;
    return this.repository.save(newImage);
  }
}
