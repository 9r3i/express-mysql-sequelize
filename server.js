const express = require("express");
const cors = require("cors");
const app = express();
const db = require("./app/models");

/* set cross origin option */
var corsOptions = {
  origin: "*",
};
app.use(cors(corsOptions));

/* parse requests of content-type - application/json */
app.use(express.json());

/* parse requests of content-type - application/x-www-form-urlencoded */
app.use(express.urlencoded({ extended: true }));

/* set client as static page
 * to view client front-end test
 */
app.use(express.static('public'))

/* production mode */
db.sequelize.sync();//*/

/* development mode *
db.sequelize.sync({ force: true }).then(() => {
  console.log("drop and re-sync database");
});//*/

/* default route */
app.get("/", (req, res) => {
  res.json({ message: "Welcome to Olympic Winners API" });
});

/* set another routes */
require("./app/routes/winners.routes")(app);

/* set port and listen for requests */
const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`Server is running on port ${port}.`);
});
