import axios from 'axios';
import pixabay_config from '../config/pixabay_config';
import { submitMessage } from './toast';
import IPixabayData from '../interfaces/IPixabayData';

export function getImageByPlace(name: string) {
    return axios.get<IPixabayData>(`${pixabay_config.defaultURL}/?key=${pixabay_config.auth_key}&q=${name}&per_page=${pixabay_config.per_page}`).catch(err => submitMessage(err.message));
}