require("dotenv").config();
const app = require("./src/app.js");
const connectToDb = require("./src/config/db.js");

connectToDb();

const port = process.env.PORT;

app.listen(port, () => {
      console.log(`Server is running on port ${port}`);
});