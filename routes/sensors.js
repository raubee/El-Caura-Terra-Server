module.exports = (router) => {

    router
        .get("/", (req, res) => {
            var client = require('../database');
            var dbo = client.db('terradb');
            dbo.collection('sensors').findOne({}, function (err, data) {
                res.render('layout', { body: 'sensors', data: data });
            });
        });

    return router;
};