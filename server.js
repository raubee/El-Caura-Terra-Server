const arduino = '192.168.1.34';
const port = 80;

var express = require('express');
var bodyParser = require('body-parser');
var path = require('path');
var app = express();

app.set('view engine', 'ejs');
app.set('views', './views');

app.use('/', express.static(path.join(__dirname, '/dist'), { index: '_' }));
app.use(bodyParser.json({ type: 'application/*+json' }));

require("./routes")(app);

app.listen(port, () => {
    console.log(`App listening at http://localhost:${port}`)
});