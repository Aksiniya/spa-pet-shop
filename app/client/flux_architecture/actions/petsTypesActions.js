import appDispatcher from '../dispatcher/appDispatcher';
import constants from "../constants/constants";

import api from '../api/petTypesAPI';

const petTypesActions = {
    loadPetTypes() {
        appDispatcher.dispatch({
            type: constants.LOAD_PET_TYPES_REQUEST
        });

        api.getPetTypes()
            .then(({ data }) =>
                appDispatcher.dispatch({
                    type: constants.LOAD_PET_TYPES_SUCCESS,
                    petTypes: data
                })
            )
            .catch(err =>
                appDispatcher.dispatch({
                    type: constants.LOAD_PET_TYPES_FAIL,
                    error: err
                })
            );
    },

    createPetType(petType) {
        api.createPetType(petType)
            .then(() =>
                this.loadPetTypes()
            )
            .catch(err =>
                console.error(err)
            );
    },

    deletePetType(typename) {
        api.deletePetType(typename)
            .then(() =>
                this.loadPets()
            )
            .catch(err =>
                console.error(err)
            );
    }
};

export default petTypesActions;