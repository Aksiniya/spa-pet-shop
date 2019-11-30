const router_assistant = require('../router_assistant');
const petModel = require('../../models/pet');
const petTypeModel = require('../../models/petType');
const upload = require('./multer_assistant').upload;
const fs = require('fs');

const petsCollections = petModel.petsCollectionName;

module.exports = function (app, db) {

    app.post('/api/pets', upload.single('petImage') ,(req, res) => {
        const pet = petModel.createPet(req);
        petModel.petDataIsCorrectPromise(pet, db, res).then(
          isCorrect => {
              if ( isCorrect === false) return;

              db.collection(petsCollections).findOne({}, {sort:{$natural:-1}}, (err, result) => {
                  if (err) {
                      router_assistant.DatabaseError(err, res);
                      return;
                  }
                  let lastId;
                  if (result == null) {
                      lastId = 0;
                  } else  {
                      lastId = result.petId;
                  }
                  let petId = lastId + 1;
                  pet.petId = petId;

                  db.collection(petsCollections).insertOne(pet, (err) => {
                      if (err) {
                          router_assistant.DatabaseError(err, res);
                      } else {
                          petTypeModel.increasePetTypeCounterPromise(pet.type, db);
                          res.status(201);
                          res.send({'answer' : 'Pet was successfully added to database. Pet id=' + petId, 'id' : petId});
                      }
                  });

              });
          }
        );
    });

    app.get('/api/pets', (req, res) => {
        let limit = Number(req.query.limit);
        if (isNaN(limit) || limit < 0) limit = 0;
        let offset = Number(req.query.offset);
        if (isNaN(offset) || offset < 0) offset = 0;

        db.collection(petsCollections).find({}).limit(limit).skip(offset).toArray( (err, result) => {
            if (err) {
                router_assistant.DatabaseError(err, res);
            } else {
                router_assistant.OK(result, res);
            }
        });
    });

    app.get('/api/pets/:id', (req, res) => {
        let petId = Number(req.params.id);

        if (isNaN(petId)) {
            router_assistant.HttpError(400, 'ID should be number.', res);
            return;
        }
        db.collection(petsCollections).findOne({'petId' : petId}, (err, item) => {
            if (err) {
                router_assistant.DatabaseError(err, res);
                return;
            }
            if (item == null) {
                router_assistant.HttpError(404, 'Pet with specified id not found.', res);
                return;
            }
            res.send(item);
        });
    });

    app.delete('/api/pets/:id', (req, res) => {
        let petId = Number(req.params.id);

        if (isNaN(petId)) {
            router_assistant.HttpError(400, 'ID should be number.', res);
            return;
        }

        db.collection(petsCollections).findOne({'petId': petId}, (err, findResult) => {
            if (err) {
                router_assistant(err,res);
                return;
            }
            const type = findResult.type;
            db.collection(petsCollections).deleteOne({'petId' : petId}, (err, result) => {
                if (err) {
                    router_assistant.DatabaseError(err, res);
                } else {
                    if ( result.deletedCount > 0) {
                        petTypeModel.decrementPetTypeCounterPromise(type, db);
                        router_assistant.OK(`Pet with id=${petId} was successfully deleted from database.`, res);

                        let filepath = findResult.imageURL.match(/\/images\/petsImages\/.+$/)[0];
                        filepath = './app/public' + filepath;
                        fs.unlink(filepath, (err) => {
                            if (err) throw err;
                        });

                    } else {
                        router_assistant.HttpError(404, "Can't delete pet from database due to pet with specified id not found", res);
                    }
                }
            });
        });
    });

    // TODO: make PUT method (but do not fot update !type!)

};