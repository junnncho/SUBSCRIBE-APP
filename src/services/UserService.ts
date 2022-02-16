import UserRepository from "@/db/repository/UserRepository";
import { NextFunction, Request, Response } from "express";
import { User } from "@/db/entity/user";
//Login 만들 때 req.user에 {id:~~~,email:~~~~,search_list:~~~~}이렇게 넣어주면 됨
interface ChangeProfileRequest {
  email?: string;
  password?: string;
}

class UserService {
  private userRepository: UserRepository;

  constructor(userRepository: UserRepository) {
    this.userRepository = userRepository;
  }

  public login = async (req: Request, res: Response, next: NextFunction) => {
    try {
      // req에 아이디가 없던데 이메일로 로그인/회원가입 하는거임?? userpayload.id 는 뭐냐..
      // req : 이메일 비밀번호 들어오면
      // User DB 에서 이메일로 비밀번호 맞는지 체크 한뒤
      // 아이디가 있으면 req.user 에 id, email , searsh_list 보내주기
      // 아이디가 없으면, 아이디 없다고 오류 ㄱㄱ
      // 아이디가 있는데 비번이 틀렸으면, 비번 틀렸다고 오류 ㄱㄱ
      const userEmail: string = req.body.user.email;
      // const userId: number = req.userPayload.id; // id 는 왜 entity에 없음??
      const userPassword: string = req.body.user.password;
      const userInfo = await this.userRepository.findOneByEmail(userEmail);
      if (userInfo) {
        if (userInfo.password == userPassword) {
          req.user = {
            id: userInfo.id,
            email: userInfo.email,
            search_list: userInfo.searchlists
          };
          next();
        } else {
          return next(`Email Don't Exist:${userEmail}`);
        }
      } else {
        return next(`Email Don't Exist:${userEmail}`);
      }
    } catch (e) {
      // next 함수인 Access token 에서 에러가 왔을때를 처리해야 할것 같은데 아닌가.. ?
      //middleware에서 바로 response가 가능한가??
      // next.status(`User Login Error: ${e}`);
      next(`Login Error: ${e}`);
    }
  };

  public signin = async (req: Request, res: Response, next: NextFunction) => {
    try {
      // req : 비밀번호 이메일
      // 1. 존재하는 이메일인지 확인 => 존재하면 이미 존재 오류
      // 2. (패스워드 조건 넣어? 일단 안넣음)
      // 3. DB에 저장
      const userEmail: string = req.body.user.email;
      const userPassword: string = req.body.user.password;
      console.log("AA");
      const userInfo = await this.userRepository.findOneByEmail(userEmail);
      if (userInfo) {
        return next(`Already Exist Email:${userEmail}`);
      } else {
        const userInfo2 = await this.userRepository.saveUserInfo(
          userEmail,
          userPassword
        );
        res.status(200).json({ email: userInfo2.email });
      }
    } catch (e) {
      next(`SignIn Error: ${e}`);
    }
  };

  public changeProfile = async (
    req: Request,
    res: Response,
    next: NextFunction
  ) => {
    try {
      const userId: number = req.userPayload.id;
      const { email, password }: ChangeProfileRequest = req.body.user;
      //req.user에는 id,email,searchlists 들어있음
      req.user = await this.userRepository.updateUser(userId, email, password);

      next();
    } catch (e) {
      next(`User Update Error: ${e}`);
    }
  };

  public addSearchword = async (
    req: Request,
    res: Response,
    next: NextFunction
  ) => {
    try {
      const userId: number = req.userPayload.id;
      const searchWord: string = req.body.searchWord;
      const userInfo = await this.userRepository.existSearch(
        userId,
        searchWord
      );
      console.log(userInfo);
      //req.user에는 id,email,searchlists 들어있음
      if (userInfo) {
        return next(`Search Word Already Exist:${searchWord}`);
      } else {
        req.user = await this.userRepository.updateSearch(userId, searchWord);
        next();
      }
    } catch (e) {
      next(`Add Search Word Error: ${e}`);
    }
  };

  public getCurrentUser = async (
    req: Request,
    res: Response,
    next: NextFunction
  ) => {
    try {
      const userId: number = req.userPayload.id;
      const user: User = await this.userRepository.getUser(userId);
      if (user) {
        res
          .json({
            user: user
          })
          .status(200);
      } else {
        next(`User Don't Exist:${userId}`);
      }
    } catch (e) {
      next(`Get User Error: ${e}`);
    }
  };

  public deleteUser = async (
    req: Request,
    res: Response,
    next: NextFunction
  ) => {
    try {
      const userId: number = req.userPayload.id;
      await this.userRepository.delete(userId);
      res.status(200);
    } catch (e) {
      next(`Delete user Error: ${e}`);
    }
  };
}

export default UserService;
