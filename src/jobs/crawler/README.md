# Board_crawler

## Requirement & Version

python 3.9.6 <br>
selenium 3.141.0

## How to use

```
python3 main.py -t [crawler-type] -u [url] -n [number of posts to crawl]
```

### URL condition

Naver news : 카테고리의 카테고리 까지 들어가서 ㅇㅇ <br>
Velog : 특정 저자의 홈페이지 (저자 이름 링크 눌렀을때)

## Result Data Structure

Crawled data will be dumped to stdout in json array of following json object.

{ <br>
"title" : String, <br>
"summary" : String, <br>
"link" : String, <br>
"img_link: String, <br>
"content": String <br>
}
