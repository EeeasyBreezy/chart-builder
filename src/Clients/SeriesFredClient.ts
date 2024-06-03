import { Aggregations, Frequencies, Units } from '@/Models/Chart';

import Fred from 'node-fred';

class SeriesFredClient {
    client: Fred;

    constructor(apiKey: string) {
        this.client = new Fred(apiKey);
    }

    async getSeries(id: string): Promise<any> {
        const response = await this.client.series.getSeries(id);
        // have to use key "seriess" because this key is returned by the API
        // and node-fred uses "series" in types declaration resulting in underfined property
        // we also need to mute typescript here because the key is not in the types declaration
        //@ts-ignore
        return response.seriess[0];
    }

    async getObservations(id: string, unit: Units, frequency: Frequencies, aggregate: Aggregations): Promise<any> {
        const response = await this.client.series.getObservationsForSeries(id, {
            frequency: frequency,
            units: unit,
            aggregation_method: aggregate,
        });
        return response.observations;
    }

    async search(text: string, limit: number): Promise<any> {
        const response = await this.client.series.getSeriesThatMatchesSearch(text, {
            limit,
        });
        return response;
    }
}

export default SeriesFredClient;
