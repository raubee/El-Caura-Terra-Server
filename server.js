const arduino = '192.168.1.34';
const port = 8080;

var express = require('express');
var request = require('request');
var bodyParser = require('body-parser');
var path = require('path');

var app = express();
var jsonParser = bodyParser.json();

app.set('view engine', 'ejs');
app.set('views', './views');

app.use('/', express.static(path.join(__dirname, '/dist'), { index: '_' }));
app.use(bodyParser.json({ type: 'application/*+json' }));

app.get('/', jsonParser, function (req, res) {
    res.render('index');
});

app.get('/sensors', function (req, res) {
    request('http://' + arduino + '/sensors', function (err, res2) {
        
        if (!err && res2.statusCode == 200) {
            console.log('Data retrieved!');
        }
        else {
            console.log('Failed to retrieved data');
        }

        res.render('sensors');
    })
});

app.get('*', jsonParser, function (req, res) {
    res.render('404');
});

app.listen(port, () => {
    console.log(`Example app listening at http://localhost:${port}`)
});