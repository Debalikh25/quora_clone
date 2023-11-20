const express = require("express");
const path = require("path");
const port = process.env.PORT || 7000;
const connectDB = require("./config/db")
const passport = require("passport");
const middlewares = require('./middlewares/middlewares')
const passportLocalStrategy  = require('./config/auth-strategies/passport-local-auth-strategy')
const passportGoogleStrategy = require('./config/auth-strategies/passport-google-auth-strategy')
const expressEJSLayout = require("express-ejs-layouts");
const session = require("express-session");
const MongoStore = require("connect-mongo");

const app = express();
const rootRouter = require("./routes/root-route");

connectDB()
app.use(express.urlencoded({ extended: true }));
app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));

app.use(expressEJSLayout);
app.set("layout extractStyles", true);
app.set("layout extractScripts", true);



app.use(express.urlencoded({ extended: true }));

app.use(express.static("assets"));

app.use(
  session({
    name: "Quora-Clone",
    secret: "zyxabcDC12",
    resave: false,
    saveUninitialized: false,
    cookie: {
      maxAge: 1000 * 60 * 60,
    },

    store: MongoStore.create({
      mongoUrl: "mongodb://0.0.0.0:27017/quora",
      autoRemove: "disabled",
    }),
  })
);

app.use(passport.initialize());

app.use(passport.session());

app.use(middlewares.setLoggedInUser)

app.use("/", rootRouter);


app.listen(port, (err) => {
  if (err) {
    console.log("There was an error running the server: ", err);
    return;
  }
  console.log(`Server is listening on ${port}`);
});
