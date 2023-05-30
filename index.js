const express = require("express") ;
const mongoose = require("mongoose") ;
const path = require("path") ;
const cookieParser = require("cookie-parser") ;
const app = express() ;
const PORT = 8000 ;
const userRoutes = require("./routes/user") ;
const { checkForAuthenticationCookie } = require("./middlewares/authentication");

mongoose.connect("mongodb://127.0.0.1:27017/blog-hub")
.then( (e) => console.log("MongoDB connected.")) ;

app.set("view engine" , "ejs") ;
app.set("views" , path.resolve("./views"))

app.use(express.urlencoded({ extended: false })) ;
app.use(cookieParser()) ;
app.use(checkForAuthenticationCookie("token")) ;

app.get("/", (req , res) => {
    res.render("home" , {
        user: req.user ,
    }) ;
})

app.use("/user" , userRoutes) ;

app.listen(PORT , () => { console.log(`Server started at PORT : ${PORT}`) }) ;