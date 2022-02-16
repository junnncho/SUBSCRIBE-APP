import { IPost } from "@/interfaces/IPost";
import { spawn } from "child_process";
import { cwd } from "process";

// python3 main.py -t "Naver" -u "https://news.naver.com/main/list.naver?mode=LS2D&mid=shm&sid1=101&sid2=259" -n 3
export type CRAWLER_TYPE = "Naver" | "velog";

export class Crawler {
  public crawlerType: CRAWLER_TYPE;
  public url: string;
  public numPosts: number;
  public crawler: any;
  public result: string;

  constructor(crawlerType: CRAWLER_TYPE, url: string, numPosts: number) {
    this.crawlerType = crawlerType;
    this.url = url;
    this.numPosts = numPosts;
    this.result = "";
  }

  print() {
    console.log("----------- Print Crawler Info --------------");
    console.log(`Type: ${this.crawlerType}`);
    console.log(`Url: ${this.url}`);
  }

  run(): Promise<IPost[]> {
    return new Promise((resolve, reject) => {
      console.log("Spawn crawler");
      this.print();
      this.crawler = spawn(
        "python3",
        [
          "./main.py",
          "-t",
          this.crawlerType,
          "-u",
          this.url,
          "-n",
          this.numPosts.toString()
        ],
        { cwd: "./src/jobs/crawler" }
      );

      this.crawler.stdout.on("data", data => {
        this.result += data;
        console.log(data.toString());
      });

      this.crawler.stderr.on("data", data => {
        reject(data);
        console.error(data.toString());
      });

      this.crawler.on("exit", code => {
        console.log(`Child exited with code ${code}`);
        let parsed = JSON.parse(this.result) as IPost[];
        resolve(parsed);
      });
    });
  }
}
