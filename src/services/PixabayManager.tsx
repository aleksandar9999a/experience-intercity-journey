import Axios from 'axios';
import { inject, injectable } from 'inversify';
import qs from 'qs';

// Configs
import { PixabayConfig } from '../config/PixabayConfig';

// Interfaces
import { IQuery } from '../interfaces/interfaces';

// Managers
import { ErrorManager } from './ErrorManager';

// Types
import type from './../Types';

@injectable()
export class PixabayManager {
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
