const petRoutes = require('./pet_routes');
const apiPetsTypesRoutes = require('./api/api_pets_types_routes');
const apiPetsRoutes = require('./api/api_pets_routes');
module.exports = function(app, db) {
    petRoutes(app, db);
    apiPetsTypesRoutes(app, db);
    apiPetsRoutes(app, db);
};