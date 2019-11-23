module.exports = function(app, db) {

    app.get('/pets', (req, res) => {
       // TODO: /pets.html
       res.send('Hello from /pets');
    });

};