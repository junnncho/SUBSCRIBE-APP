import PostRepository from "@/db/repository/PostRepository";
import { NextFunction, Request, Response } from "express";
import { Post } from "../db/entity/post";

class PostService {
  private postRepository: PostRepository;

  constructor(postRepository: PostRepository) {
    this.postRepository = postRepository;
  }

  public fromId = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const postId: number = Number(req.params.postid);
      const post = await this.postRepository.findById(postId);

      if (post === undefined) {
        return next(`Find Post Error: no such post ${postId}`);
      }
      console.log(post);
      return res.json({ post: post }).status(200);
    } catch (e) {
      next(`Find Post Error: ${e}`);
    }
  };

  public fromQuery = async (
    req: Request,
    res: Response,
    next: NextFunction
  ) => {
    try {
      if (!("limit" in req.query)) {
        return next(`Limit Post Error: no limit`);
      }
      const userId: number = Number(1); //user api 추가한뒤 req.user.id로 수정
      const limit: number = Number(req.query.limit);
      const offset: number =
        "offset" in req.query ? Number(req.query.offset) : 0;
      const subscribe: string =
        "subscribe" in req.query ? String(req.query.subscribe) : null;
      const post = await this.postRepository.findByQuery(
        userId,
        limit,
        offset,
        subscribe
      );
      if (post.length === 0) {
        return next(`Empty Post In ${userId}`);
      }
      if ("search" in req.query) {
        const result: Post[] = post.filter(v =>
          v.title.includes(String(req.query.search))
        );
        if (result.length === 0) {
          return next(
            `Search Post Error: no result from search word ${req.query.search}`
          );
        }
        console.log(result);
        return res.json({ posts: result }).status(200);
      }
      console.log(post);
      return res.json({ posts: post }).status(200);
    } catch (e) {
      next(`Find Post Error: ${e}`);
    }
  };
}

export default PostService;
