const express = require("express");
const app = express();
const cookieParser = require("cookie-parser");
const mongoose = require("mongoose");

//phan tich cookie
app.use(cookieParser());

//nguoi dung se gui json len sever
//no la mot module rieng le
app.use(express.json());

const db = require("./config/key").mongoURI;

mongoose
  .connect(db, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log("MongoDB Connected...."))
  .catch((err) => console.log(err));

//const User = require("./models/User");

//giu lieu gia
// const userInput = {
//   username: "Quoc Liem",
//   password: "123456",
//   role: "admin",
// };

// const user = new User(userInput);

// user.save((err, document) => {
//   if (err) console.log(err);
//   console.log(document);
// });
//giu lieu gia

const userRouter = require("./routers/User");

app.use("/", userRouter);
app.use("/blog", require("./routers/Blog"));
app.use("/uploads", express.static("uploads"));

const PORT = process.env.PORT || 5000;

app.listen(PORT, console.log(`Server Run With Port ${PORT}`));
