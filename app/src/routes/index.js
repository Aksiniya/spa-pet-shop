const petRoutes = require('./pet_routes');
module.exports = function(app, db) {
    petRoutes(app, db);
    // ...
};