var db = require("../db");
var md5 = require("md5");

module.exports.authRequire = (req, res, next)=>
{
    const userId = req.signedCookies.userId;
    if(!userId)
    {
        res.render("auth/login");
        return;
    }
    const admin = db.get("admin").find({id:userId}).value();
    if(!admin)
    {
        res.render("auth/login");
        return;
    }
    res.locals.admin = admin;
    next();
}