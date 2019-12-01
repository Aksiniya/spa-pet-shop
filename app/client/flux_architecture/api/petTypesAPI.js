import axios from 'axios';
import {apiPrefix} from '../../../server/config';

export default {
    getPetTypes() {
        return axios.get(`${apiPrefix}/petsTypes`);
    },

    getPetType(typename) {
        return axios.get(`${apiPrefix}/petsTypes/${typename}`);
    },

    createPetType(data) {
        return axios.post(`${apiPrefix}/petsTypes`);
    },

    deletePetType(petType) {
        return axios.delete(`${apiPrefix}/petTypes?petType=${petType}`);
    }
}