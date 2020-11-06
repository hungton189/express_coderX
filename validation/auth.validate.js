module.exports.postLogin = (req, res, next)=>
{
    let errors = [];
    if(!req.body.email)
    {
        errors.push("Chưa nhập email.");
    }
    if(!req.body.password)
    {
        errors.push("Chưa nhập password.");
    }
    if(errors.length)
    {
        res.render('auth/login',
        {
            errors:errors,
            values:req.body
        });
        return;
    }
    next();
}