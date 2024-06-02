import SearchQueryStringBuilder from './SearchQueryStringBuilder';

describe('SearchQueryStringBuilder', () => {
    let builder: SearchQueryStringBuilder;

    beforeEach(() => {
        builder = new SearchQueryStringBuilder();
    });

    it('should append text parameter', () => {
        const text = 'test';
        builder.withSearch(text);
        expect(builder.params.get('text')).toEqual(text);
    });

    it('should append limit parameter', () => {
        const limit = 10;
        builder.withLimit(limit);
        expect(builder.params.get('limit')).toEqual(limit.toString());
    });
});