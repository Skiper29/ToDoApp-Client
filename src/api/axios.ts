import axios from 'axios';
import {API_ROUTES} from '@constants/api-routes.constants';

export const axiosInstance = axios.create({
    baseURL: API_ROUTES.BASE,
    headers: {
        'Content-Type': 'application/json',
    },
});