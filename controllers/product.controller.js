var db = require("../db");

module.exports.index = (req,res,next) =>
{
    var page = req.query.page || 1;
    const perPage = 12;
    var products = db.get("products").value();
    
    const maxPages = Math.ceil(products.length/perPage);
    let previous = parseInt(page) - 1 ;
    let nextPage = parseInt(page) + 1;
    products = products.slice(( page - 1 ) * perPage,page * perPage);
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
        products ,
        length : Math.ceil(products.length/perPage),
        previous,
        page,
        nextPage 
    });
}

module.exports.search = (req,res,next) =>
{
    var page = req.query.page || 1;
    const q = req.query.q;
    let products = db.get("products").value();
    const matchedProducts = products.filter(product=>
        {
            return product.name.toLowerCase().indexOf(q.toLowerCase()) !==-1;
        });

    const perPage = 12;
    const maxPages = Math.ceil(matchedProducts.length/perPage);
    let previous = parseInt(page) - 1 ;
    let nextPage = parseInt(page) + 1;
    products = matchedProducts.slice(( page - 1 ) * perPage,page * perPage);
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
    res.render('products/index',
        {
            products ,
            length : Math.ceil(matchedProducts.length/perPage),
            previous,
            page,
            nextPage 
        })
}