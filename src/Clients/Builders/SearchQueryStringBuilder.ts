import BaseQueryStringBuilder from "./BaseQueryStringBuilder";

export default class SearchQueryStringBuilder extends BaseQueryStringBuilder {
    constructor() {
        super();
    }

    withSearch(text: string): SearchQueryStringBuilder {
        this.params.append('text', text);
        return this;
    }

    withLimit(limit: number): SearchQueryStringBuilder {
        this.params.append('limit', limit.toString());
        return this;
    }
}