const express = require("express");
const app = express();

var userRouter = require("./routes/user.route");

const port = 3000;

app.set('view engine', 'pug');
app.set('views', './views');
app.use(express.json()) // for parsing application/json
app.use(express.urlencoded({ extended: true })) 
// for parsing application/x-www-form-urlencoded

app.use("/user",userRouter);

app.get("/",(req, res)=>
{
    res.render('index',
    {
        name:"abc"
    })
});

app.listen(3000,function(){
    console.log("server is listening on port "+port)
});


