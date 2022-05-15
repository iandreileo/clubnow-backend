// app.get("/", (req, res) => {
//   res.send("Hello World!");
// });

const express = require("express");
const mongoose = require("mongoose");
const modelsModule = require("./models.js");
const UserSchema = modelsModule.UserSchema;
require('dotenv').config()
const app = express();
app.use(express.json())

const port = process.env.PORT;
const uri = process.env.ATLAS_CONNECTION

mongoose.connect(uri, {})

const connection = mongoose.connection
connection.once('open', () => {
    console.log("DB connected.");
})

app.get("/api/v1/Users", async (req, res) => {
  await UserSchema.find({}, (err, result) => {
    console.log("customer from db: ", result);
    res.send(result);
  }).clone();
});

app.post("/api/v1/Users", async (req, res) => {
  try {
    console.log("req.body: ", req.body);

    const newUser = new UserSchema({
      name: req.body.name,
      type: req.body.type,
      address: req.body.address,
      profileImage: req.body.profileImage
    });

    await UserSchema.create(newUser);
    res.send("User added");
  } catch (err) {
    console.log("error: ", err);
  }
});

app.listen(port, () => {
  console.log(`Example app listening on localhost:${port}`);
});


