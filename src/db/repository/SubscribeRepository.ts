import { AbstractRepository, EntityRepository } from "typeorm";
import { Subscribe } from "../entity/subscribe";
import { User } from "../entity/user";
import { Website } from "../entity/website";

@EntityRepository(Subscribe)
export class SubscribeRepository extends AbstractRepository<Subscribe> {
  public createSubscribe(
    customName: string,
    customColor: string,
    user: User,
    website: Website
  ): Promise<Subscribe> {
    return this.repository.save({ customName, customColor, user, website });
  }
}
