import {EventEmitter} from 'events';
import appDispatcher from '../dispatcher/appDispatcher';
import constants from "../constants/constants";

let pets = [];
let loadingError = null;
let isLoading = true;

const CHANGE_EVENT = 'change';

function formatPet(data) {
    return {
        name: data.name,
        age: data.age,
        gender: data.gender,
        species: data.species,
        type: data.type,
        id: data.petId,
        imageURL: data.imageURL
    }
}

class tasksStore extends EventEmitter {
    isLoading() {
        return isLoading;
    }

    getPets() {
        return pets;
    }

    emitChange()  { // change data due for update data in component
        this.emit(CHANGE_EVENT);
    }

    addChangeListener(callback) {
        this.on(CHANGE_EVENT, callback);
    }

    removeChangeListener(callback) {
        this.removeListener(CHANGE_EVENT, callback);
    }
}

const taskStoreConst = new tasksStore();

appDispatcher.register(function (action) {
    switch (action.type) {
        case constants.LOAD_PETS_REQUEST: {
            isLoading = true;
            taskStoreConst.emitChange();
            break;
        }

        case constants.LOAD_PETS_SUCCESS: {
            isLoading = false;
            pets = action.pets.map(formatPet);

            loadingError = false;

            taskStoreConst.emitChange();
            break;
        }

        case constants.LOAD_PETS_FAIL: {
            loadingError = action.error;

            taskStoreConst.emitChange();
            break;
        }

        // default: {
        //     console.log('No such handler.')
        // }
    }
});

export default taskStoreConst;