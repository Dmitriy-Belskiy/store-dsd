
function connect(){
    const MongoClient = require("mongodb").MongoClient;
    const db_name = "admin";
    const db_pass = "1234";
    const path = `mongodb+srv://${db_name}:${db_pass}@progectoure.504fc.mongodb.net/myshop?retryWrites=true&w=majority`;
    return new MongoClient(path);
}

module.exports = connect;