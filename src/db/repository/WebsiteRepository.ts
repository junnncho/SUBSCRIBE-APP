import { AbstractRepository, EntityRepository, FindManyOptions } from "typeorm";
import { User } from "../entity/user";
import { Website } from "../entity/website";

@EntityRepository(Website)
export class WebsiteRepository extends AbstractRepository<Website> {
  public fetchAll(): Promise<Website[]> {
    return this.repository.find();
  }

  public saveWebsite(website: Website) {
    return this.repository.save(website);
  }
}
