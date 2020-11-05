const express = require("express");
const app = express();
const low = require('lowdb');
const shortid = require("shortid");
const FileSync = require('lowdb/adapters/FileSync');
const adapter = new FileSync('db.json');
const db = low(adapter);

db.defaults({ users:[]})
  .write()

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

app.get("/user",(req, res)=>
{
    res.render('users/index',
    {
        users:db.get("users").value()
    })
});


app.get("/user/search",(req,res)=>
{
    const q = req.query.q;
    const users = db.get("users").value();
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
    const id = shortid.generate();
    req.body.id = id;
    db.get("users").push(req.body).write();
    res.redirect('/user');
});

app.get('/user/:id',(req, res)=>
{
    const id=req.params.id;
    const user = db.get("users").find({id:id}).value();
    res.render('users/view',
    {
        name:user.name
    });
});