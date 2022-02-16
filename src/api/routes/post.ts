import { Post } from "@/db/entity/post";
import { Router } from "express";
import PostService from "@/services/PostService";
import PostRepository from "@/db/repository/PostRepository";
import { getCustomRepository } from "typeorm";
const route = Router();

export default (app: Router) => {
  app.use("/post", route);
  const service: PostService = new PostService(
    getCustomRepository(PostRepository)
  );
  route.get("/:postid", service.fromId);
  route.get("/", service.fromQuery);
};
