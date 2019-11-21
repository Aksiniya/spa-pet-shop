const router_assistant = require('./router_assistent');
const petModel = require('../models/pet');

module.exports = function(app, db) {

    app.get('/pets', (req, res) => {
       // TODO: /pets.html
       res.send('Hello from /pets');
    });

};