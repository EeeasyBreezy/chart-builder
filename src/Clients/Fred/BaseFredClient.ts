import Fred from 'node-fred';

export default class BaseFredClient {
    client: Fred;

    constructor(apiKey: string) {
        this.client = new Fred(apiKey);
    }
}
