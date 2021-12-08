require("dotenv").config();
const express = require("express");
var bodyParser = require("body-parser");
var axios = require("axios");
const cors = require("cors");
const { User, items, cart } = require("./models/model.js");
const mongoose = require("./db/db.js");

const app = express();
const port = process.env.PORT || 3000;

app.use(bodyParser.urlencoded({ extended: false }));

// parse application/json
app.use(bodyParser.json());

app.use(express.urlencoded({ extended: true }));

app.use(express.json());

const corsOptions = {
  origin: "*",
  credentials: true,
  optionSuccessStatus: 200,
};

app.use(cors(corsOptions));

app.listen(port, () => {
  console.log("Server is up on the port " + port + " !");
});

app.get("/", (req, res) => {
  console.log("Welcome to backend server");
  res.send("Hello this is backend server for medscape website");
});

app.post("/signup", async (req, res) => {
  const user = new User(req.body);
  user.password = user.generateHash(userInfo.password);
  try {
    await user.save();
    console.log("New user added");
    console.log(item);
    res.status(201).send("Successfully Saved");
  } catch (error) {
    res.status(400).send(error);
  }
});

app.post("/login", async (req, res) => {
  try {
    const user = await User.findOne({
      email: req.body.email,
      password: req.body.password,
    })
      .then((found) => {
        console.log(found);
        res.status(200).json(found);
      })
      .catch((err) => {
        console.log("2");
        console.log(err);
      });
  } catch (error) {
    console.log("1");
    res.status(400).send(error);
  }
});

app.get("/items", async (req, res) => {
  try {
    const item = await items.find({});

    res.status(201).send(item);
  } catch (error) {
    res.status(400).send(error);
  }
});

app.post("/cart", async (req, res) => {
  const mycart = new cart(req.body);
  try {
    await mycart.save();
    res.status(201).send("Successfully added");
  } catch (error) {
    res.status(400).send(error);
  }
});

app.post("/findcart", async (req, res) => {
  try {
    const mycart = await cart.find({ userid: req.body.userid });
    res.status(201).send(mycart);
  } catch (error) {
    res.status(400).send(error);
  }
});

app.post("/finditem", async (req, res) => {
  try {
    const myitem = await items.find({ elecid: req.body.elecid });
    console.log(myitem);
    res.status(200).send(myitem);
  } catch (error) {
    res.status(400).send(error);
  }
});

app.post("/findbyname", async (req, res) => {
  try {
    console.log(req.body.title);
    const item = await items.find({ title: req.body.title });
    console.log(item);
    res.status(200).send(item);
  } catch (error) {
    res.status(400).send(error);
  }
});

app.delete("/delete/:userid/:elecid", async (req, res) => {
  try {
    const userid = req.params.userid;
    const elec_id = req.params.elecid;
    const item = await cart.find({ elec_id, userid });
    if (!item) {
      return res.status(201).send("Error");
    }
    cart.findOneAndDelete(elec_id, () => {
      console.log("Item Deleted!");
      return res.status(200).send("Item Deleted!");
    });
  } catch (error) {
    return res.status(500).send(error);
  }
});
