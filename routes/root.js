module.exports = (router) => {
    router
        .get("/", (req, res) => res.render('layout', { body: 'index' }));
    return router;
};