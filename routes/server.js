

const router = require("express").Router();
const dbConnect = require("./connect.js")

const fs = require("fs")

let goodsNames = ["Название", "Категория", "Артикул", "Цвет", "Размер", "Кол-во", "Цена", "Бренд"];
let filetext = fs.readFileSync("./data/goods.csv", "utf-8");
// console.log(filetext);
let goods = filetext.split("\n");

for(let i = 0; i < goods.length; i++){
    goods[i] = goods[i].split(";");
}
// console.log(goods);

router.get("/", function(request, response){
    // response.send("<h1>Магазин одежды</h1>");

    const client = dbConnect();
    client.connect(function(err){
        if (err) {
            console.log("Ошибка!");
        }
        console.log("Соединение с БД успешно");
        const col = client.db("myshop").collection("clothers");
        col.find({}).toArray(function(err, data){
            if (err){
                console.log("Ошибка получения данных");
            }
            console.log(data[0]);
            client.close();
        })
    })


    response.render("index", {
        names: goodsNames,
        goods: goods
    })
})

module.exports = router;