export default class BaseQueryStringBuilder {
    params: URLSearchParams;

    constructor() {
        this.params = new URLSearchParams();
    }

    build(): string {
        return this.params.toString();
    }
}