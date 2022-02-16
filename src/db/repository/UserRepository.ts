import { AbstractRepository, EntityRepository } from "typeorm";
import { User } from "../entity/user";
import { Searchlist } from "../entity/search";

@EntityRepository(User)
export class UserRepository extends AbstractRepository<User> {
  public saveUser(email: string, password: string): Promise<User> {
    return this.repository.save({ email, password });
  }
  public drop() {
    return this.repository
      .createQueryBuilder()
      .delete()
      .where("id > 0")
      .execute();
  }

  public findOneByEmail(email: string): Promise<User | undefined> {
    return this.repository.findOne({ email });
  }
  public saveUserInfo(email: string, password: string): Promise<User> {
    const newUser = new User();
    newUser.email = email;
    newUser.password = password;
    // 나머지는 비워두면 되나?
    //  newUser.searchlists = ;
    //  newUser.subscribes = ;
    //  newUser.bookmarks = ;
    return this.repository.save(newUser);
  }
  public updateUser(
    userId: number,
    email: string,
    password: string
  ): Promise<User | undefined> {
    return this.manager.transaction(async transactionManager => {
      const user: User = await transactionManager.findOne(User, {
        where: { id: userId },
        relations: ["searchlists"]
      });
      user.email = email ?? user.email;
      user.password = password ?? user.password;
      return await transactionManager.save(user);
    });
  }
  public existSearch(
    userId: number,
    searchWord: string
  ): Promise<User | undefined> {
    return this.repository.findOne({
      relations: ["searchlists"],
      where: qb =>
        qb.where({ id: userId,{userId: userId} }).andWhere("searchlists.word = :searchWord", {
          searchWord: searchWord
        })
    });
  }

  public updateSearch(
    userId: number,
    searchWord: string
  ): Promise<User | undefined> {
    return this.manager.transaction(async transactionManager => {
      const user: User = await transactionManager.findOne(User, userId);
      const search: Searchlist = new Searchlist();
      search.word = searchWord;
      search.user = user;
      await transactionManager.save(search);
      return await transactionManager.findOne(User, {
        where: { id: userId },
        relations: ["searchlists"]
      });
    });
  }

  public getUser(userId: number): Promise<User | undefined> {
    return this.repository.findOne({
      select: ["email"],
      relations: ["searchlists", "bookmarks", "subscribes"],
      where: { id: userId }
    });
  }

  public delete(userId: number) {
    this.repository.delete(userId);
  }
}

export default UserRepository;
