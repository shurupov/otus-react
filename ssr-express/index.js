const express = require("express");
const app = express();
const port = 3000;

app.use(express.static("../dist"));

/*app.use(function(request, response) {
  response.redirect("/");
});*/

app.listen(port, () =>
  console.log(`Example app listening at http://localhost:${port}`)
);
