const connectDB = require("./db/index.js");
const dotenv = require('dotenv');
dotenv.config({
  path: ".env",
});

const app = require("./app");

connectDB()
  .then(() => {
    app.listen(8000, () => {
      console.log("Server listening on port 8000");
    });
  })
  .catch((err) => {
    console.log("MONGODB Connection failed !! ", err);
  });
