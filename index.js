const express = require("express");
const app = express();
const port = 3000;

app.set('view engine', 'pug');
app.set('views', './views')

app.listen(3000,function(){
    console.log("server is listening on port "+port)
});

app.get("/",(req, res)=>
{
    res.render('index',
    {
        name:"abc"
    })
});
const users = 
        [
            {id:1, name:"Hưng tôn"},
            {id:2, name:"tôn thất hưng"}
        ];

app.get("/user",(req, res)=>
{
    res.render('users/index',
    {
        users:users
    })
});

app.get("/user/search",(req,res)=>
{
    const q = req.query.q;
    const matchedUsers = users.filter(user=>
        {
            return user.name.toLowerCase().indexOf(q.toLowerCase()) !==-1;
        });
    res.render('users/index',
        {
            users:matchedUsers,
            query:q
        })
});