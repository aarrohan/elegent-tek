const express = require("express");
const path = require("path");
const nodeMailer = require("nodemailer");
const multer = require("multer");
const dotenv = require("dotenv");
const app = express();

dotenv.config();

const fs = require("fs");
const uploadsDir = path.join(__dirname, "/uploads");

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    if (!fs.existsSync(uploadsDir)) {
      fs.mkdirSync(uploadsDir);
    }
    return cb(null, "./uploads");
  },
  filename: function (req, file, cb) {
    return cb(null, `${Date.now()}-${file.originalname}`);
  },
});

const upload = multer({ storage });

var livereload = require("livereload");
var connectLiveReload = require("connect-livereload");

const liveReloadServer = livereload.createServer();
liveReloadServer.server.once("connection", () => {
  setTimeout(() => {
    liveReloadServer.refresh("/");
  }, 100);
});

app.use(express.urlencoded({ extended: false })); // to parse the body of the request (POST)
app.use(express.static(path.join(__dirname, "/public")));
app.use(connectLiveReload());

app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "/views"));

app.get("/", (req, res) => {
  res.render("home");
});

app.get("/about", (req, res) => {
  res.render("about");
});

app.get("/careers", (req, res) => {
  const fakeJobsJSON = require("./fakeJobs.json");

  res.render("careers", { fakeJobsJSON });
});

app.post("/contact", (req, res) => {
  const { name, email, message } = req.body;

  // res.send({ Name: name, Email: email, Message: message });
  const transporter = nodeMailer.createTransport({
    host: "smtp.gmail.com",
    service: "gmail",
    port: 587,
    secure: false,
    auth: {
      user: process.env.EMAIL,
      pass: process.env.PASSWORD,
    },
  });

  const mailOPtions = {
    from: email,
    to: process.env.CONTACTMAIL,
    replyTo: email,
    subject: `${name} <${email}> left message through online web platform.`,
    text: message,
  };

  transporter.sendMail(mailOPtions, (error, info) => {
    if (error) {
      res.redirect("/?deliverStatus=error");
    } else {
      res.redirect("/?deliverStatus=success");
    }
  });
});

app.get("*", (req, res) => {
  res.render("404");
});

const port = process.env.PORT || 3000;
app.listen(port, () => console.log(`Server listening on port ${port}!`));
