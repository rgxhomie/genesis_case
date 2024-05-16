import { Injectable, InternalServerErrorException } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { RateProviders } from './rateProviders.enum';
import axios from 'axios';
import * as _ from 'lodash';

@Injectable()
export class RateService {
    constructor(
        private configService: ConfigService
    ) {}

    async getCurrentRate(): Promise<Number> {
        const cahedRate = await this.getCachedRate();
        if (cahedRate) return cahedRate;

        const rate = await this.getNewRate(RateProviders.excr);

        this.cacheNewRate(rate);

        return rate;
    }

    private async getCachedRate(): Promise<Number | null> {
        return null;
    }

    private async cacheNewRate(value: Number): Promise<void> {
        return;
    }

    private async getNewRate(provider: RateProviders): Promise<Number> {
        try {
            const apiUrl = this.configService.getOrThrow(`api.${provider}.url`);
            const ratePath = this.configService.getOrThrow(`api.${provider}.ratePath`);
            const apiKey = this.configService.get(`api.${provider}.key`);

            const data = await axios.get(apiUrl, {
                headers: {
                    "Authorization": apiKey ? `Bearer ${apiKey}` : undefined
                }
            });

            const rate = _.get(data, ratePath, null);

            if (_.isNil(rate)) throw new Error('Bad response path');

            return rate;
        } catch (error) {
            console.log(`RateProvider Error: `, { error });

            throw new InternalServerErrorException('Provider Error');
        }
    }
}
