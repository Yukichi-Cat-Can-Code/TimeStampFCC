require("dotenv").config();
const myApp = require("./myApp");
const port = process.env.PORT || 4000;

myApp.listen(port, () => {
  console.log("Your app is listening on port: " + port);
});
