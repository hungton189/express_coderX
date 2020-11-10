var db = require("../db");

module.exports.index = (req,res,next) =>
{
    var page = req.query.page || 1;
    const perPage = 12;
    var products = db.get("products").value();
    
    const maxPages = Math.ceil(products.length/perPage);
    let previous = parseInt(page) - 1 ;
    let nextPage = parseInt(page) + 1;
    if(page == 1)
    {
        previous = 1;
        page = 2,
        nextPage = 3
    }
    if(page == maxPages)
    {
        previous = maxPages-2;
        page = maxPages-1,
        nextPage = maxPages
    }
    res.render("products/index",
    {
        products:products.slice(( page - 1 ) * perPage,page * perPage),
        length : Math.ceil(products.length/perPage),
        previous,
        page,
        nextPage 
    });
}