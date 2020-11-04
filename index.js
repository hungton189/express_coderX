const express = require("express");
const app = express();
const port = 3000;

app.set('view engine', 'pug');
app.set('views', './views');
app.use(express.json()) // for parsing application/json
app.use(express.urlencoded({ extended: true })) 
// for parsing application/x-www-form-urlencoded

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

app.get('/user/create',(req,res)=>
{
    res.render('users/createUser');
});

app.post('/user/create',(req,res)=>
{
    users.push(req.body);
    res.redirect('/user');
});