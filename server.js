const express = require("express");
const mongoose = require("mongoose");
const app = express();
const UserModel = require("./models/User");
const cors = require("cors");
app.use(cors());
app.use(express.json());

mongoose.connect(process.env.sec);

// get request
app.get("/users", async (req, res) => {
  const users = await UserModel.find();
  res.json(users);
});

// create User
app.post("/createUser", async (req, res) => {
  const newUser = new UserModel(req.body);
  await newUser.save();
  res.json(newUser);
});

// Delete User
app.post("/deleteUser", async (req, res) => {
  try {
    const deleUser = req.body;
    const deletedUser = await UserModel.findOneAndDelete({ _id: deleUser });
    res.send(deletedUser);
  } catch (error) {
    res.send(error);
  }
});
// Update User
app.post("/updateUser", async (req, res) => {
  try {
    const updateUser = req.body;
    console.log(updateUser)
    const oldprice = (await UserModel.findOne({ tel: updateUser.tel }).exec()).price;
    const updatedUser = await UserModel.findOneAndUpdate(
      { tel: updateUser.tel },
      { price: Number(updateUser.price) + Number(oldprice) }
    );
    res.send(updatedUser);
  } catch (error) {
    res.send(error);
  }
});

app.listen("3001", () => {
  console.log("The Server Is Working !!!!");
});
