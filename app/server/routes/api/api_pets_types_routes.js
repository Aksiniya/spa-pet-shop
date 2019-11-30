const router_assistant = require('../router_assistant');
const petTypeModel = require('../../models/petType');
const upload = require('./multer_assistant').upload;
const fs = require('fs');

const petsTypesCollection = petTypeModel.petsTypesCollectionName;

module.exports = function (app, db) {

    app.post('/api/petsTypes', upload.single('petTypeIcon') , (req, res) => {
        let petType = petTypeModel.createPetType(req);

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

    app.get('/api/petsTypes/:petType', (req, res) => {
        const petType = req.params.petType;

        db.collection(petsTypesCollection).findOne({'type': petType}, (err, item) => {
            if (err) {
                router_assistant.DatabaseError(err, res);
                return;
            }
            if (item == null) {
                router_assistant.HttpError(404, 'PetType with specified typename not found.', res);
                return;
            }
            res.send(item);
        });
    });

    app.delete('/api/petsTypes', (req, res) => {
        const petType = req.query.petType;

        db.collection(petsTypesCollection).findOne({'type' : petType}, (err, findResult) => {
            if (err) {
                router_assistant.DatabaseError(err, res);
                return;
            }
            if (findResult == null) {
                router_assistant.HttpError(404, "Can't delete pet type from database due to pet type with specified name not found.", res);
            } else if ( findResult.count > 0) {
                router_assistant.HttpError('400', 'Unable delete pet type cause pets with this type exists. Please delete all pets with this type from database before delete pet type.', res);
            } else {
                db.collection(petsTypesCollection).deleteOne( {'type': petType}, (err, result) => {
                    if (err) {
                        router_assistant.DatabaseError(err, res);
                        return;
                    }
                    if ( result.deletedCount > 0) {
                        router_assistant.OK(`PetType "${petType}" was successfully deleted from database.`, res);

                        const re = new RegExp( 'images/petsTypesIcons/' + findResult.type + '\.(\\w)+$');
                        let filepath = findResult.iconURL.match(re)[0];

                        if (filepath !== 'images/petsTypesIcons/defaultPetTypeIcon.png') {
                            filepath = './app/public/' + filepath;

                            fs.unlink(filepath, (err) => {
                                if (err) throw err;
                            });
                        }

                    } else {
                        res.status(500);
                        res.send('Unknown error. Pet type has not been deleted.');
                    }
                });
            }
        });
    });
};
