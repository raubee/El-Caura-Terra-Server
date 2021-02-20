var MongoClient = require('mongodb').MongoClient;
var url = "mongodb://localhost:27017/";
var client = new MongoClient(url, { useUnifiedTopology: true });

client.connect(function (err) {
    if (err) throw err;

    console.log('connected to database');

    var dbo = client.db('terradb');
    setupDatabase(dbo, function () {
        // client.close();
    });
});

function setupDatabase(dbo, callback) {
    dbo.createCollection('sensors', function (err, res) {
        callback();
    });
}

module.exports = client;