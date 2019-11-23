const router_assistant = require('../routes/router_assistant');
const petsTypesCollectionName = 'PetsTypes';

function createPetType(data) {
    return {
        type : data.type,
        count : 0,
    }
}

function petTypeIsCorrectPromise(petType, db, res) {

    if (petType.type === '' || petType.type === undefined ) {
        router_assistant.HttpError(400, 'Type field is empty.', res);
        return false;
    }
    return petTypeInDatabasePromise(petType, db).then(
        result => {
            if (result) {
                router_assistant.HttpError(400, 'Type already exist in database.', res);
                return false;
            }
            return true;
        }
    );
}

function petTypeInDatabasePromise(type, db) {
    return db.collection(petsTypesCollectionName).findOne({'type' : type}).then(
        result => {
            return result != null;
        },
        error => {
            console.log('[DB ERROR]');
            console.log(error);
            return false;
        }
    );
}

function incrementPetTypeCounterPromise(type, db) {
    return db.collection(petsTypesCollectionName).findOne({'type': type}).then(
        result => {
            isNaN(result.count) ? result.count = 1 : ++result.count;
            return db.collection(petsTypesCollectionName).replaceOne({'type' : type}, result);
        },
        error => {
            console.log('[DB ERROR]');
            console.log(error);
        }
    );
}

function decrementPetTypeCounterPromise(type, db) {
    return db.collection(petsTypesCollectionName).findOne({'type': type}).then(
        result => {
            result.count <= 0 ? result.count = 0 : --result.count;
            return db.collection(petsTypesCollectionName).replaceOne({'type' : type}, result);
        },
        error => {
            console.log('[DB ERROR]');
            console.log(error);
        }
    );
}

module.exports = {
    petsTypesCollectionName: petsTypesCollectionName,
    petTypeInDatabasePromise: petTypeInDatabasePromise,
    createPetType: createPetType,
    petTypeIsCorrectPromise: petTypeIsCorrectPromise,
    increasePetTypeCounterPromise: incrementPetTypeCounterPromise,
    decrementPetTypeCounterPromise: decrementPetTypeCounterPromise
};