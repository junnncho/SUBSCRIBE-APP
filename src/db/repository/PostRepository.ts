import { IPost } from "@/interfaces/IPost";
import { EntityRepository, AbstractRepository } from "typeorm";
import { Image } from "../entity/image";
import { Post } from "../entity/post";
import { Subscribe } from "../entity/subscribe";
import { Website } from "../entity/website";

@EntityRepository(Post)
class PostRepository extends AbstractRepository<Post> {
  //postid가 주어졌을 때 해당 포스트 반환
  public findById(id: number): Promise<Post | undefined> {
    return this.repository.findOne({ id });
  }
  //쿼리스트링으로 주어진 조건으로 포스트 배열 반환
  public findByQuery(
    id: number,
    limit: number,
    offset: number,
    subscribe: string
  ): Promise<Post[] | undefined> {
    return this.repository
      .createQueryBuilder("post")
      .where(qb => {
        const subQuery =
          subscribe === null
            ? qb
                .subQuery()
                .select("subscribe.website")
                .from(Subscribe, "subscribe")
                .where("subscribe.user.id = :userId")
                .getQuery()
            : qb
                .subQuery()
                .select("subscribe.website")
                .from(Subscribe, "subscribe")
                .where("subscribe.user.id = :userId")
                .andWhere("subscribe.website = :subscribeName", { subscribe })
                .getQuery();
        return "post.website IN " + subQuery;
      })
      .setParameter("userId", id)
      .orderBy("post.createdAt")
      .limit(limit)
      .offset(offset)
      .getMany();
  }

  public savePost(post: IPost, img: Image, webSite: Website): Promise<Post> {
    const newPost = new Post();
    newPost.title = post.title;
    newPost.body = post.content;
    newPost.imageSrc = img;
    newPost.url = post.link;
    newPost.website = webSite;
    return this.repository.save(newPost);
  }
}

export default PostRepository;
