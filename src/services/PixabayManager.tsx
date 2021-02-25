import Axios from 'axios';
import { inject, injectable } from 'inversify';
import qs from 'qs';
import { PixabayConfig } from '../config/PixabayConfig';
import { IQuery } from '../interfaces/interfaces';
import { ErrorManager } from './ErrorManager';
import type from './../Types';

@injectable()
export class Pixabay {
    @inject(type.PixabayConfig) private config!: PixabayConfig;
    @inject(type.ErrorManager) private errorMananger!: ErrorManager;

    getImage (query: IQuery = {}) {
        const newQuery = { ...query };

        if (!newQuery.per_page) {
            newQuery.per_page = this.config.per_page;
        }

        if (!newQuery.key) {
            newQuery.key = this.config.auth_key;
        }

        return Axios
            .get(`${this.config.defaultURL}/?${qs.stringify(newQuery)}`)
            .catch(err => {
                this.errorMananger.submitError(err);
            })
    }
}
