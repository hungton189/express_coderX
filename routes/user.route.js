var express = require('express');
var router = express.Router();
const shortid = require("shortid");
var db = require('../db');


router.get("/",(req, res)=>
{
    res.render('users/index',
    {
        users:db.get("users").value()
    })
});

router.get("/search",(req,res)=>
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

router.get('/create',(req,res)=>
{
    res.render('users/createUser');
});

router.get('/:id',(req, res)=>
{
    const id=req.params.id;
    const user = db.get("users").find({id:id}).value();
    res.render('users/view',
    {
        name:user.name
    });
});

router.post('/create',(req,res)=>
{
    const id = shortid.generate();
    req.body.id = id;
    db.get("users").push(req.body).write();
    res.redirect('/user');
});

module.exports = router;