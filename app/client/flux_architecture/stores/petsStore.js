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
        id: data.id
    }
}

const tasksStore = Object.assign({}, EventEmitter.prototype, {
    isLoading() {
        return isLoading;
    },

    getPets() {
        return pets;
    },

    emitChange()  { // change data due for update data in component
        this.emit(CHANGE_EVENT);
    },

    addChangeListener(callback) {
        this.addEventListener(CHANGE_EVENT, callback);
    },

    removeChangeListener(callback) {
        this.removeEventListener(CHANGE_EVENT, callback);
    }
});

appDispatcher.register(function (action) {
    switch (action) {
        case constants.LOAD_PETS_REQUEST: {
            isLoading = true;
            tasksStore.emitChange();
            break;
        }

        case constants.LOAD_PETS_SUCCESS: {
            isLoading = false;
            pets = action.pets.map(formatPet());
            loadingError = false;

            tasksStore.emitChange();
            break;
        }

        case constants.LOAD_PETS_FAIL: {
            loadingError = action.error;

            tasksStore.emitChange();
            break;
        }

        default: {
            console.log('No such handler.')
        }
    }
});