const router = require("express").Router();

router.get("/", function(require, response){
    // response.send("<h1>Магазин одежды</h1>");
    response.render("index")
})

module.exports = router;