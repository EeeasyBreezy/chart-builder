import { Aggregations, Frequencies, Units } from '@/Models/Chart';
import BaseFredClient from './BaseFredClient';

class SeriesFredClient extends BaseFredClient {
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
}

export default SeriesFredClient;
