const shortid = require("shortid");
var db = require('../db');

module.exports.index = (req, res)=>
{
    res.render('users/index',
    {
        users:db.get("users").value()
    })
}

module.exports.search = (req,res)=>
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
}

module.exports.viewUser = (req, res)=>
{
    const id=req.params.id;
    const user = db.get("users").find({id:id}).value();
    res.render('users/view',
    {
        user:user
    });
}

module.exports.create = (req,res)=>
{
    res.render('users/createUser');
}


module.exports.postCreate = (req,res)=>
{
    const id = shortid.generate();
    let errors = [];
    if(!req.body.name)
    {
        errors.push("Chưa nhập name.");
    }
    if(!req.body.phone)
    {
        errors.push("Chưa nhập phone.");
    }
    if(errors.length)
    {
        res.render('users/createUser',
        {
            errors:errors,
            values:req.body
        });
        return;
    }
    req.body.id = id;
    db.get("users").push(req.body).write();
    res.redirect('/user');
}