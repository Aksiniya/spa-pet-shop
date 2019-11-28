import axios from 'axios';
import {apiPrefix} from '../../../server/config';

export default {
    getPets(limit=0, offset=0) {
        return axios.get(`${apiPrefix}/pets?limit=${limit}&offset=${offset}`);
    },

    getPet(id) {
        return axios.get(`${apiPrefix}/pets/${id}`);
    },

    createPet(data) {
        return axios.post(`${apiPrefix}/pets`, data);
    },

    deletePet(id) {
        return axios.delete(`${apiPrefix}/pets/${id}`);
    },

    // updatePet() {
    //     return axios.put();
    // },
}