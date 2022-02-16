import { Router } from "express";
import { getCustomRepository } from "typeorm";
import AuthService from "@/services/AuthService";
import UserService from "@/services/UserService";
import UserRepository from "@/db/repository/UserRepository";
const route = Router();

export default (app: Router) => {
  app.use("/user", route);
  const authService: AuthService = new AuthService();
  const userService: UserService = new UserService(
    getCustomRepository(UserRepository)
  );
  route.post("/login", userService.login, authService.addAccessToken);
  route.post("/", userService.signin);
  route.put(
    "/profile",
    authService.checkAccessToken,
    userService.changeProfile,
    authService.addAccessToken
  );
  route.put(
    "/search_list",
    authService.checkAccessToken,
    userService.addSearchword
  );
  route.delete("/", authService.checkAccessToken, userService.deleteUser);
};
