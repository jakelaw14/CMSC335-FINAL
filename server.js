require("dotenv").config();

const express = require("express");
const mongoose = require("mongoose");
const path = require("path");

const playersRouter = require("./routes/players");

const app = express();

app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static(path.join(__dirname, "public")));

mongoose.connect(process.env.MONGO_CONNECTION_STRING)
    .then(() => console.log("Connected to MongoDB"))
    .catch(err => console.log("MongoDB Error:", err));
app.use("/players", playersRouter);

app.get("/", (req, res) => {
    res.render("index");
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server running on ${PORT}`));
