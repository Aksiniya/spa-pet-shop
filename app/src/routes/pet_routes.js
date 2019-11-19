const router_assistant = require('./router_assistent');

function petDataIsCorrect(pet, res) {
    if (res === undefined) {
        console.log(new Error('[ERROR]: Unable to send error message due to missing response reference.'));
        return false;
    }

    if (pet.name === '' || pet.gender === '' || pet.species === '' ) {
        router_assistant.HttpError(400, 'Name, gender or species field is empty.', res);
        return false;
    } else if (isNaN(pet.age)) {
        router_assistant.HttpError(400, 'Age must be number.', res);
        return false;
    } else  if (pet.age === 0) {
        router_assistant.HttpError(400, "Age can't be zero", res);
        return false;
    } else if (pet.name.length > 60 || pet.species.length > 60) {
        router_assistant.HttpError(400, 'Name or species too long. String must be less than 60 symbols.', res);
        return false;
    } else if (pet.gender !== 'male' && pet.gender !== 'female') {
        router_assistant.HttpError(400, 'Gender error. Value must be male or female.', res);
        return false;
    }
    return true;
}

module.exports = function(app, db) {

    app.post('/pets', (req, res) => {
        const pet = { name: req.body.name, age: Number(req.body.age), gender: req.body.gender, species: req.body.species };
        if (petDataIsCorrect(pet, res) === false) return;

        db.collection('pets').findOne({}, {sort:{$natural:-1}}, (err, result) => {
            if (err) {
                console.log('[DATABASE ERROR]:');
                console.log(err);
                router_assistant.HttpError(500, 'An DB-error has occurred.');
            } else {
                let lastId;
                if (result == null) {
                    lastId = 0;
                } else  {
                    lastId = result.pet_id;
                }
                let pet_id = lastId + 1;
                pet.pet_id = pet_id;

                db.collection('pets').insertOne(pet, (err, result) => {
                    if (err) {
                        console.log('[DATABASE ERROR]:');
                        console.log(err);
                        router_assistant.HttpError(500, 'An DB-error has occurred', res);
                    } else {
                        router_assistant.Created('Pet was successfully added to database. Pet id=' + pet_id ,pet_id, res);
                    }
                });
            }
        });

    });

    app.get('/pets', (req, res) => {
        let limit = Number(req.query.limit);
        if (isNaN(limit) || limit < 0) limit = 0;
        let offset = Number(req.query.offset);
        if (isNaN(offset) || offset < 0) offset = 0;

        db.collection('pets').find({}).limit(limit).skip(offset).toArray( (err, result) => {
            if (err) {
                console.log('[DATABASE ERROR]:');
                console.log(err);
                router_assistant.HttpError(500, 'An DB-error has occurred', res);
            } else {
                res.status(200);
                res.send(result);
            }
        });
    });

    app.get('/pets/:id', (req, res) => {
        let pet_id = Number(req.params.id);

        if (isNaN(pet_id)) {
            router_assistant.HttpError(400, 'ID should be number.', res);
            return;
        }
        db.collection('pets').findOne({'pet_id' : pet_id}, (err, item) => {
            if (err) {
                console.log('[DATABASE ERROR]:');
                console.log(err);
                router_assistant.HttpError(500, 'An DB-error has occurred', res);
            } else {
                if (item == null) {
                    router_assistant.HttpError(404, 'Pet with specified id not found.');
                    res.send({});
                } else {
                    // TODO: BD item to 'normal' item
                    res.send(item);
                }
            }
        });
    });

    app.delete('/pets/:id', (req, res) => {
        let pet_id = Number(req.params.id);

        if (isNaN(pet_id)) {
            router_assistant.HttpError(400, 'ID should be number.', res);
            return;
        }
        db.collection('pets').deleteOne({'pet_id' : pet_id}, (err, result) => {
            if (err) {
                console.log('[DATABASE ERROR]:');
                console.log(err);
                router_assistant.HttpError(500, 'An DB-error has occurred', res);
            } else {
                if ( result.deletedCount > 0) {
                    router_assistant.OK(`Pet with id=${pet_id} was successfully deleted from database.`, res);
                } else {
                    router_assistant.HttpError(404, "Can't delete pet from database due to pet with specified id not found", res);
                }
            }
        });
    });

    app.put('/pets/:id', (req, res) => {
        const pet_id = Number(req.params.id);
        const pet = { name: req.body.name, age: Number(req.body.age), gender: req.body.gender, species: req.body.species, pet_id: pet_id };
        if (petDataIsCorrect(pet, res) === false) return;

        db.collection('pets').replaceOne({'pet_id' : pet_id}, pet, false, (err, result) => {
            if (err) {
                console.log('[DATABASE ERROR]:');
                console.log(err);
                router_assistant.HttpError(500, 'An DB-error has occurred', res);
            } else {
                if (result.modifiedCount > 0) {
                    router_assistant.OK(`Pet with id=${pet_id} was successfully updated.`, res);
                } else {
                    router_assistant.HttpError(400, 'Pet with specified id not found.', res);
                }
            }
        });
    });
};