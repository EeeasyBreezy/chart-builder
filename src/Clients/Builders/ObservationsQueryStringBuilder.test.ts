import { Aggregations, Frequencies, Units } from "@/Models/Chart";
import ObservationsQueryStringBuilder from "./ObservationsQueryStringBuilder";

describe('ObservationsQueryStringBuilder', () => {
    let builder: ObservationsQueryStringBuilder;

    beforeEach(() => {
        builder = new ObservationsQueryStringBuilder();
    });

    test.each([
        ['id', 'withId', 'test-id'],
        ['unit', 'withUnits', "lin"],
        ['frequency', 'withFrequencies', "d"],
        ['aggregate', 'withAggregate', "avg"],
    ])('adds %s parameter correctly', (paramName, methodName, value) => {
        // @ts-ignore
        builder[methodName](value);
        expect(builder.build()).toContain(`${paramName}=${value}`);
    });

    test('does not add aggregate parameter if it is null', () => {
        builder.withAggregate(undefined);
        expect(builder.build()).not.toContain('aggregate=');
    });
});