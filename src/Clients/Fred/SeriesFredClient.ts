import BaseFredClient from './BaseFredClient';

class SeriesFredClient extends BaseFredClient {

    async getSeries(id: string): Promise<any> {
        const response = await this.client.series.getSeries(id);
        // have to use key "seriess" because this key is returned by the API
        // and node-fred uses "series" in types declaration resulting in underfined property
        return response["seriess"][0]; 
    }
}

export default SeriesFredClient;