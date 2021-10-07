require("dotenv").config();
const path = require("path");
const express = require("express");
const methodOverride = require("method-override");

const app = express();
const PORT = process.env.PORT || 5000;
const mongoose = require("mongoose");
const visitor = require("./routes/route");
const DB = process.env.DB;
app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));
app.use(express.static(path.join(__dirname, "public")));
app.use(express.urlencoded({ extended: true }));
app.use(express.json({ extended: true }));
app.use(methodOverride("_method"));
mongoose
	.connect(DB, { useNewUrlParser: true, useUnifiedTopology: true })
	.then((res) => console.log("db connected"))
	.catch((e) => console.log(e.message));
app.get("/", (req, res) => {
	res.render("pages/home");
});
app.use(visitor);
app.listen(PORT, () => console.log(`connected to port ${PORT}`));
