const express = require("express");
const app = express();
const port = 3000;

app.listen(3000,function(){
    console.log("server is listening on port "+port)
});

app.get("/",(req, res)=>
{
    res.send('hello express')
});