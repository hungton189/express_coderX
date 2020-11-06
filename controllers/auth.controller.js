var db = require("../db");

module.exports.login = (req, res)=>
{
    res.render('auth/login');
}

module.exports.postLogin = (req, res)=>
{
    let email = req.body.email;
    let user = db.get("users").find({email:email}).value();
    if(!user)
    {
        res.render('auth/login',
        {
            errors:["Email " + email + " không tồn tại."],
            values:req.body
        });
        return;
    }

    let password = req.body.password;
    if(user.password !== password)
    {
        res.render('auth/login',
        {
            errors:["Password không đúng."],
            values:req.body
        });
        return;
    }
    res.cookie("userId",user.id);
    res.redirect("/user");

}