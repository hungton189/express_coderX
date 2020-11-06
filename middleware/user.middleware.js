module.exports.postCreate = (req, res, next)=>
{
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
    next();
}