const snakeCase = require("lodash/snakeCase");
const express = require("express");

module.exports = (app) => {
    require("fs")
        .readdirSync(__dirname)
        .forEach((file) => {
            if (file === "index.js") return;
            const path =
                "/" +
                (file !== "root.js" ? snakeCase(file.replace(".js", "")) : ""); // root.js file will map to /
            const router = express.Router();
            const route = require(require("path").join(__dirname, file))(router);
            app.use(path, route);
        });

        app.use(function (req, res, next) {
            res.status(404);
        
            // respond with html page
            if (req.accepts('html')) {
                res.render('layout', { body: '404' });
                return;
            }
        
            // respond with json
            if (req.accepts('json')) {
                res.send({ error: 'Not found' });
                return;
            }
        
            // default to plain-text. send()
            res.type('txt').send('Not found');
        });
};