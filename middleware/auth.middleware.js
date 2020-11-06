var db = require("../db");

module.exports.authRequire = (req, res, next)=>
{
    const userId = req.cookies.userId;
    if(!userId)
    {
        res.render("auth/login");
    }
    const user = db.get("users").find({id:userId}).value();
    if(!user)
    {
        res.render("auth/login");
    }
    next();
}