import appDispatcher from '../dispatcher/appDispatcher';
import constants from "../constants/constants";

import api from '../api/petsAPI';

const petsActions = {
    loadPets() {
        appDispatcher.dispatch({
            type: constants.LOAD_PETS_REQUEST
        });

        api.getPets()
            .then(({ data }) =>
                appDispatcher.dispatch({
                    type: constants.LOAD_PETS_SUCCESS,
                    notes: data
                })
            )
            .catch(err =>
                appDispatcher.dispatch({
                    type: constants.LOAD_PETS_FAIL,
                    error: err
                })
            );
    },

    createPet(pet) {
        api.createPet(pet)
            .then(() =>
                this.loadPets()
            )
            .catch(err =>
                console.error(err)
            );
    },

    deletePet(id) {
        api.deletePet(id)
            .then(() =>
                this.loadPets()
            )
            .catch(err =>
                console.error(err)
            );
    }
};

export default petsActions;