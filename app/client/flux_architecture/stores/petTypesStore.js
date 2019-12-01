import {EventEmitter} from 'events';
import appDispatcher from '../dispatcher/appDispatcher';
import constants from "../constants/constants";

let petTypes = [];
let loadingError = null;
let isLoading = true;

const CHANGE_EVENT = 'change';

function formatPetType(data) {
    return {
        typename: data.type,
        count: data.count,
        iconURL: data.iconURL
    }
}

class tasksStore extends EventEmitter {
    isLoading() {
        return isLoading;
    }

    getPetsTypes() {
        return petTypes;
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
    console.log(action.type)
    switch (action.type) {
        case constants.LOAD_PET_TYPES_REQUEST: {
            isLoading = true;
            taskStoreConst.emitChange();
            break;
        }

        case constants.LOAD_PET_TYPES_SUCCESS: {
            isLoading = false;
            petTypes = action.petTypes.map(formatPetType);

            loadingError = false;

            taskStoreConst.emitChange();
            break;
        }

        case constants.LOAD_PET_TYPES_FAIL: {
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