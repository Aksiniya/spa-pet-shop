const router_assistant = require('../routes/router_assistant');
const petModel = require('./petType');

const petCollectionName = 'Pets';

function createPet(data) {
    return{
        name: data.name,
        age: Number(data.age),
        gender: data.gender,
        species: data.species,
        type: data.type,
        petId: data.petId,
    };
}

function petDataIsCorrectPromise(pet, db, res) {
    if (res === undefined) {
        console.log(new Error('[ERROR]: Unable to send error message due to missing response reference.'));

    }

    if (pet.name === '' || pet.name === undefined ||
        pet.gender === '' || pet.gender === undefined ||
        pet.species === '' || pet.species === undefined ||
        pet.type === '' || pet.type === undefined
    ) {
        router_assistant.HttpError(400, 'Name, gender, species or type field is empty.', res);
    } else if (isNaN(pet.age)) {
        router_assistant.HttpError(400, 'Age must be number.', res);
        return false;
    } else  if (pet.age === 0) {
        router_assistant.HttpError(400, "Age can't be zero", res);
        return false;
    } else if (pet.name.length > 60 || pet.species.length > 60 || pet.type.length > 60 ) {
        router_assistant.HttpError(400, 'Name, species or type too long. String must be less than 60 symbols.', res);
        return false;
    } else if (pet.gender !== 'male' && pet.gender !== 'female') {
        router_assistant.HttpError(400, 'Gender error. Value must be male or female.', res);
        return false;
    }

    return petModel.petTypeInDatabasePromise(pet.type, db).then(
        result => {
            if (result === false) {
                router_assistant.HttpError(400, 'Type does not exist in database.', res);
                return false;
            } else {
                return true;
            }
        },
        err => {
            router_assistant.DatabaseError(err, res);
            return false;
        }
    );
}

module.exports = {
    petsCollectionName: petCollectionName,
    petDataIsCorrectPromise: petDataIsCorrectPromise,
    createPet: createPet,
};

