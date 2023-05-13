const express = require("express");
const app = express();

const rateLimit = require("express-rate-limit");

// const cors = require("cors");
const bodyParser = require("body-parser");
const path = require("path");

const errorMiddleware = require("./middleware/error")

//config
if(process.env.NODE_ENV!=="PRODUCTION"){
    require("dotenv").config({ path: "backend/config/config.env" })
}
// dotenv.config({path:"backend/config/config.env"});

// app.use(cors({
//     origin:"*",
//     credentials:true,
// }))

// create a limiter object
const limiter = rateLimit({
    windowMs: 15 * 60 * 1000, // 15 minutes
    max: 50, // limit each IP to 100 requests per windowMs
  });

// apply the limiter to all requests to the API
app.use(limiter);
app.use(express.json());
app.use(bodyParser.urlencoded({ extended: true }))
// Route Imports 

const quizzes = require("./routes/quizzesRoute");
const cronjob = require("./middleware/cronjob");

app.use("/api",cronjob);
app.use("/api", quizzes);

app.use(express.static(path.join(__dirname,"../frontend/build")))

app.get("*",(req,res)=>{
    app.use(express.static(path.resolve(__dirname,"../frontend/build")))
    res.sendFile(path.resolve(__dirname,"../frontend/build/index.html"))
})


//Middleware of Errors 
app.use(errorMiddleware);

module.exports = app