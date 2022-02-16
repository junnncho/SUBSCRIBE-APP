import argparse
import crawler
import sys

CRAWLER_TYPES = ["Naver", "velog"]

def CreateCrawler(crawler_type, url, numPosts):
    if crawler_type == "Naver":
        return crawler.naverCrawler.NaverCrawler(url, numPosts)
    if crawler_type == "velog":
        return crawler.velogCrawler.VelogCrawler(url, numPosts)

import json


if __name__ == "__main__":
    argparser = argparse.ArgumentParser(description="Board Crawler")
    argparser.add_argument("--crawler_type", "-t",  help="Crawler type [Naver|velog]", required=True)
    argparser.add_argument("--url", "-u", help="url to crawl", required=True)
    argparser.add_argument("--num", "-n", help="Number of posts to crawl", type=int, default=10)

    args = argparser.parse_args()

    assert args.crawler_type in CRAWLER_TYPES
    
    crawler = CreateCrawler(args.crawler_type, args.url, args.num)

    sys.stdout.write(json.dumps(crawler.crawl()))
    



