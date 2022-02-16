## How to run server

```sh
// install dependencies
yarn
// make create .env file
cp .env.example .env
// start db
docker-compose up
// start server in dev env
yarn dev
```

If the server returns to `GET /status` with code `200`, the server is running successfully.

## Seed Dummy Data

Seed dummy data to the database.  
Works only when db process is running.  
Look at [seed.ts](/src/jobs/seed/seed.ts) to add/modify seeded dummy data.

```
yarn seed
```

## Run crawler

Crawl posts with all websites in db.  
Works only when db process is running.  
Look at [Crawler folder](/src/jobs/crawler).  
This will be deployed to seperate server later.  
But now, to share entities and db logic, this lives in this repository.

```
yarn crawl
```
