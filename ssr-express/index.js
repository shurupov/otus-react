const express = require("express");
const puppeteerRenderer = require("puppeteer-renderer-middleware");
const app = express();
const port = 8000;

app.use(function (request, response, next) {
  console.log(request.headers["user-agent"]);
  request.headers["user-agent"] = "vkShare";
  console.log(request.headers["user-agent"]);
  return next();
});

app.use(
  puppeteerRenderer({
    url: "http://localhost:3333/renderer",
    // userAgentPattern: /My-Custom-Agent/i,
    // excludeUrlPattern: /*.html$/i
    // timeout: 30 * 1000,
  })
);

app.use(express.static("../dist"));

app.use(function (request, response) {
  response.redirect("/");
});

app.listen(port, () =>
  console.log(`Example app listening at http://localhost:${port}`)
);
