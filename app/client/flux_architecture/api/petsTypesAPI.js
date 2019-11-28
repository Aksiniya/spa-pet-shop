import axios from 'axios';
import {apiPrefix} from '../../../server/config';

export default {
    getPetsTypes() {
        return axios.get(`${apiPrefix}/petsTypes`);
    },

    createPetType(data) {
        return axios.post(`${apiPrefix}/petsTypes`);
    },

    deletePetType(petType) {
        return axios.delete(`${apiPrefix}/petTypes?petType=${petType}`);
    }
}