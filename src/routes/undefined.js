module.exports = function(app) {
    app.use(function(req, res) {
        res.sendfile('./public/index.html');
    });
};
