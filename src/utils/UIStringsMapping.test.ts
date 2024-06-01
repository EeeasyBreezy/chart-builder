import { Aggregations, Frequencies, LineStyle, Units } from "@/Models/Chart";
import UIStrings from "./UIStrings";
import { frequencytoUIStrings, lineStyleToUIStrings, aggregationsToUIStrings, unitsToUIStrings } from "./UIStringsMapping";

describe('frequencytoUIStrings', () => {
    test.each([
        ['d', UIStrings.Daily],
        ['w', UIStrings.Weekly],
        ['m', UIStrings.Monthly],
        ['q', UIStrings.Quaterly],
        ['sa', UIStrings.SemiAnnualy],
        ['a', UIStrings.Annualy],
    ])('returns correct string for frequency %s', (frequency, expected) => {
        const result = frequencytoUIStrings(frequency as Frequencies);
        expect(result).toEqual(expected);
    });
});

describe('lineStyleToUIStrings', () => {
    test.each([
        ['solid', UIStrings.Solid],
        ['dashed', UIStrings.Dashed],
    ])('returns correct string for style %s', (style, expected) => {
        const result = lineStyleToUIStrings(style as LineStyle);
        expect(result).toEqual(expected);
    });
});

describe('aggregationsToUIStrings', () => {
    test.each([
        ['avg', UIStrings.Average],
        ['eop', UIStrings.EndOfPeriod],
        ['sum', UIStrings.Sum],
    ])('returns correct string for aggregation %s', (aggregation, expected) => {
        const result = aggregationsToUIStrings(aggregation as Aggregations);
        expect(result).toEqual(expected);
    });
});

describe('unitsToUIStrings', () => {
    test.each([
        ['lin', UIStrings.Linear],
        ['chg', UIStrings.Change],
        ['log', UIStrings.NaturalLog],
    ])('returns correct string for unit %s', (unit, expected) => {
        const result = unitsToUIStrings(unit as Units);
        expect(result).toEqual(expected);
    });
});