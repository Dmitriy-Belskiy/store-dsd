const router = require("express").Router();
const { response } = require("express");
const res = require("express/lib/response");
const dbConnect = require("./connect");
const mongo = require("mongodb");

const dbQuery = function(cb, queryParam = {}, dataObj = null){
    const client = dbConnect();
    client.connect(function(err){
        if (err) {
            res.send({"message": "Ошибка соединения с базой данных"})
            client.close();
        }
        const col = client.db("myshop").collection("clothers");
        cb(col, client, response, queryParam, dataObj);
    });
};

const queryFindAll = function(col, cl, response, obj = {}) {
    col.find(obj).toArray(function (err, result) {
        if (err) {
            response.send({"message": "База данных не отвечает"});
            cl.close();
        } else {
            response.send({"message": "ok", "data": result});
            cl.close();
        }
    });
}
const queryDelete = function(col, cl, response, obj) {
    col.deleteOne(obj, function(err, result){
        if (err) {
            response.send({"message": "База данных не отвечает"});
            cl.close();
        } else {
            response.send({"message": "ok", "data": result});
            cl.close();
        }
    });
}
const queryAdd = function(col, cl, response, param = null,obj){
    col.insertOne(obj, function(err){
        if (err) {
            response.send({"message": "База данных не отвечает"});
            cl.close();
        } else {
            response.send({"message": "ok"});
            cl.close();
        }
    });
}
const queryUpdate = function(col, cl, response, param, newData){
    col.updateOne(param, {$set: newData}, function(err, result){
        if (err) {
            response.send({"message": "База данных не отвечает"});
            cl.close();
        } else {
            response.send({"message": "ok", "data": result});
            cl.close();
        }
    });
}


router.get("/db", function(request, response){
    dbQuery(queryFind);
});

router.delete("/db/:article", function(request, response){
    dbQuery(queryDelete, {"article": request.params.article});
});

router.put("/db/:article", function(request, response){
    dbQuery(queryUpdate, {"article": request.params.article}, request.body);
});


router.get("/", function(request, response){
    response.render("all");
});




module.exports = router;