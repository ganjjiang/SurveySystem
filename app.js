require("dotenv").config();
const express = require("express");
const connectDB = require("./config/db");
const path = require("path");
const session = require("express-session");
const cookieParser = require("cookie-parser");
const passport = require("passport");
const passportConfig = require("./passport");
//const MongoStore = require("connect-mongodb-session")(session);
const methodOverride = require("method-override");




const app = express();

//const CookieStore = MongoStore(session);
passportConfig();
const port = process.env.PORT || 3000;

//DB 연결
connectDB();

//header에 있는 cookie를 req.cookie에 저장 
app.use(cookieParser());

//파싱
app.use(express.json());
app.use(express.urlencoded({ extended: true }));



//session -> req.session 저장
app.use(session({
    key: 'gaeun-survey',
    secret: 'ganiiii',
    resave: false,
    saveUninitialized: true,
    // store: new MongoStore({
    //     mongoUrl: process.env.MONGODB_URL,
    //     collection: 'mySessions'
    // }),
    rolling: true,
    cookie: { maxAge: 60 * 60 * 24 * 5 * 1000 }
}));




//passport 사용 
app.use(passport.initialize());
app.use(passport.session());

//뷰 엔진 설정 
app.set("view engine", "ejs");
app.set("views", "./views");


//정적파일 
app.use(express.static("public"));

//PUT 요청방식 사용하기 
app.use(methodOverride("_method"));

//jquery 
app.use('/node_modules', express.static(path.join(__dirname, "/node_modules")));

//route 연결  
app.use("/", require("./routes/indexRoutes"));
app.use("/user", require("./routes/userRoutes"));
app.use("/auth", require("./routes/authRoutes"));
app.use("/student", require("./routes/studentRoutes"));
app.use("/admin", require("./routes/adminRoutes"));

app.listen(port, () => {
    console.log(`App listening on port ${port}`);
});



