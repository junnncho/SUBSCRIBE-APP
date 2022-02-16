import { ImageRepository } from "@/db/repository/ImageRepository";
import PostRepository from "@/db/repository/PostRepository";
import { WebsiteRepository } from "@/db/repository/WebsiteRepository";
import { createConnection, getCustomRepository } from "typeorm";
import { Crawler, CRAWLER_TYPE } from "./crawler";

import config from "@/config";

const NUM_CRAWL = 5;

function getCrawlerType(url: string): CRAWLER_TYPE {
  //TODO: parse url and get Crawler type needed
  return "Naver";
}

async function Crawl() {
  const connection = await createConnection(config.db);

  const websiteRepository = connection.getCustomRepository(WebsiteRepository);
  const postRepository = connection.getCustomRepository(PostRepository);
  const imageRepository = connection.getCustomRepository(ImageRepository);

  const websites = await websiteRepository.fetchAll();

  const crawlPromises = websites.map(async website => {
    const url = website.domain;
    const crawlerType = getCrawlerType(url);
    // TODO: how to decide number of posts
    const crawler = new Crawler(crawlerType, url, NUM_CRAWL);
    const crawledPosts = await crawler.run();

    const savePromises = crawledPosts.map(async post => {
      const image = await imageRepository.saveImage(post);
      return postRepository.savePost(post, image, website);
    });

    return Promise.all(savePromises);
  });

  const posts = await Promise.all(crawlPromises);

  console.log("---------- results ----------");
  console.log(posts);
}

Crawl();
