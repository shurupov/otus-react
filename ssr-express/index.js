import express from "express";
import React from "react";
import ReactDOMServer from "react-dom/server.js";
import { App } from "../src/App.tsx";

const app = express();
const port = 3000;

app.use("/static", express.static("../dist"));

app.get("/*", (req, res) =>
  res.send(`
    <!DOCTYPE html>
    <html lang="en">
      <head>
        <title>Router example</title>
      </head>
      <body>
        <div id="root">${ReactDOMServer.renderToString(
          React.createElement(App)
        )}</div>
        <script src="/static/index.js"></script>
      </body>
    </html>

`)
);

app.listen(port, () =>
  console.log(`Example app listening at http://localhost:${port}`)
);
