var createError = require("http-errors");
var express = require("express");
var cookieParser = require("cookie-parser");
var logger = require("morgan");

const path = require("path");

var indexRouter = require("./routes/index");
var usersRouter = require("./routes/users");
var authRouter = require("./routes/auth");
var imgRouter = require("./routes/img");
var categorieRouter = require("./routes/categorie");
var productRouter = require("./routes/product");
var courseRouter = require("./routes/course");
var stripeRouter = require("./routes/payment");

var lessonRouter = require("./routes/lesson");

var quizRouter = require("./routes/quiz");

var enrollRouter = require("./routes/Enroll");

var completedLessonRouter = require("./routes/completedLesson");

require("dotenv").config();

// var { expressjwt: jwt } = require("express-jwt");

var app = express();

var cors = require("cors");
const corsOptions = {
  origin: "http://localhost:3000",
  credentials: true,
  methods: ["POST", "GET", "PUT", "DELETE"],
};
app.use(cors(corsOptions));
app.use(
  "/images/categories",
  express.static(path.join(__dirname, "public/images/categories"))
);
app.use(
  "/images/cours",
  express.static(path.join(__dirname, "public/images/cours"))
);
app.use(
  "/images",
  express.static(path.join(__dirname, "public/images/carousel"))
);

app.use(
  "/images/product",
  express.static(path.join(__dirname, "public/images/product"))
);

app.use(
  "/images/users",
  express.static(path.join(__dirname, "public/images/users"))
);

app.use(
  "/lesson/video",
  express.static(path.join(__dirname, "public/images/lesson/video"))
);
app.use(
  "/lesson/img",
  express.static(path.join(__dirname, "public/images/lesson/img"))
);

// view engine setup
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "jade");

app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use("/images", express.static(path.join(__dirname, "public")));

app.use(express.static("public"));

app.use("/", indexRouter);
app.use("/users", usersRouter);
app.use("/auth", authRouter);
app.use("/img", imgRouter);
app.use("/categorie", categorieRouter);
app.use("/product", productRouter);
app.use("/courses", courseRouter);
app.use("/payment", stripeRouter);
app.use("/lesson", lessonRouter);
app.use("/quiz", quizRouter);

app.use("/enroll", enrollRouter);

app.use("/completedLesson", completedLessonRouter);

// catch 404 and forward to error handler
app.use(function (req, res, next) {
  next(createError(404));
});

// error handler
app.use(function (err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get("env") === "development" ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render("error");
});

module.exports = app;
