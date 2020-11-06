var db = require("../db");
var md5 = require("md5");

module.exports.authRequire = (req, res, next)=>
{
    const userId = req.cookies.userId;
    if(!userId)
    {
        res.render("auth/login");
    }
    const users = db.get("admin").value();
    for(user of users)
    {
        console.log("ccheck");
        console.log(md5(user.id));
        console.log(userId);
        if(md5(user.id) === userId)
        {
            next();
            console.log("có");
            return;
        }
    }
    res.render("auth/login");
}