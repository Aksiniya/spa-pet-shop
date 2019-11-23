const router_assistant = require('../router_assistant');
const petTypeModel = require('../../models/petType');

const petsTypesCollection = petTypeModel.petsTypesCollectionName;

module.exports = function (app, db) {

    app.post('/api/petsTypes', (req, res) => {
        const petType = petTypeModel.createPetType(req.body);

        petTypeModel.petTypeIsCorrectPromise(petType, db, res).then(
            result => {
                if (result === false) return;

                petTypeModel.petTypeInDatabasePromise(petType.type, db).then(
                    result => {
                        if (result) {
                            router_assistant.HttpError(400, 'This type already exist in database.', res);
                            return;
                        }
                        db.collection(petsTypesCollection).insertOne(petType, (err) => {
                            if (err) {
                                router_assistant.DatabaseError(err, res);
                                return;
                            }
                            res.status(201);
                            res.send('PetType was successfully created.');
                        });
                    }
                );
            }
        )

    });

    app.get('/api/petsTypes', (req, res) => {
        db.collection(petsTypesCollection).find({}).toArray( (err, result) => {
           if (err) {
               router_assistant.DatabaseError(err, res);
               return;
           }
           router_assistant.OK(result, res);
        });
    });

    app.delete('/api/petsTypes', (req, res) => {
        const petType = req.query.petType;

        db.collection(petsTypesCollection).findOne({'type' : petType}, (err, result) => {
            if (err) {
                router_assistant.DatabaseError(err, res);
                return;
            }
            if (result == null) {
                router_assistant.HttpError(404, "Can't delete pet type from database due to pet type with specified name not found.", res);
            } else if ( result.count > 0) {
                router_assistant.HttpError('400', 'Unable delete pet type cause pets with this type exists. Please delete all pets with this type from database before delete pet type.', res);
            } else {
                db.collection(petsTypesCollection).deleteOne( {'type': petType}, (err, result) => {
                    if (err) {
                        router_assistant.DatabaseError(err, res);
                        return;
                    }
                    if ( result.deletedCount > 0) {
                        router_assistant.OK(`PetType "${petType}" was successfully deleted from database.`, res);
                    } else {
                        res.status(500);
                        res.send('Unknown error. Pet type has not been deleted.');
                    }
                });
            }
        });
    });


};
