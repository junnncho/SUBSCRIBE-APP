import cron from "node-cron";

export default () => {
  cron.schedule("* * * * * *", function () {
    console.log("node-cron 실행 테스트");
  });
};
