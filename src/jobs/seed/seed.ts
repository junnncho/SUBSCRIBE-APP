import user from "@/api/routes/user";
import config from "@/config";
import { Subscribe } from "@/db/entity/subscribe";
import { Website } from "@/db/entity/website";
import { SubscribeRepository } from "@/db/repository/SubscribeRepository";
import { UserRepository } from "@/db/repository/UserRepository";
import { WebsiteRepository } from "@/db/repository/WebsiteRepository";
import { createConnection } from "typeorm";

const urls = [
  //정치
  "https://news.naver.com/main/list.naver?mode=LSD&mid=sec&sid1=100",
  //경제
  "https://news.naver.com/main/list.naver?mode=LSD&mid=sec&sid1=101",
  //사회
  "https://news.naver.com/main/list.naver?mode=LSD&mid=sec&sid1=102"
];

const users: { email: string; password: string }[] = [
  {
    email: "user1",
    password: "1234"
  }
];

async function dropDatabase() {
  console.log(
    "******* This will drop the whole database. Will you precede? *******"
  );

  // TODO: get imput to precede or not

  const connection = await createConnection(config.db);
  await connection.dropDatabase();
  await connection.close();
}

async function seed() {
  const connection = await createConnection(config.db);
  const websiteRepository = connection.getCustomRepository(WebsiteRepository);
  const userRepository = connection.getCustomRepository(UserRepository);
  const subscribeRepository =
    connection.getCustomRepository(SubscribeRepository);

  const userData = await Promise.all(
    users.map(user => userRepository.saveUser(user.email, user.password))
  );

  for (const url of urls) {
    const website = new Website();
    website.domain = url;
    const savedWebsite = await websiteRepository.saveWebsite(website);

    const subscribe = await subscribeRepository.createSubscribe(
      url,
      "Red",
      userData[0],
      savedWebsite
    );
  }

  console.log("Finished Seeding");
}

dropDatabase().then(() => seed());
