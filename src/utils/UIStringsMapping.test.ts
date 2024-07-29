import { Aggregations, Frequencies, LineStyle, Units } from '@/Models/Chart';
import UIStrings from './UIStrings';
import {
    frequencytoUIStrings,
    lineStyleToUIStrings,
    aggregationsToUIStrings,
    chartTypeToUIStrings,
    unitsToUIStrings,
    stringToFrequency,
} from './UIStringsMapping';

describe('frequencytoUIStrings', () => {
    test.each([
        ['d', UIStrings.Daily],
        ['w', UIStrings.Weekly],
        ['m', UIStrings.Monthly],
        ['q', UIStrings.Quarterly],
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

describe('chartTypeToUIStrings', () => {
    test.each([
        ['line', UIStrings.Line],
        ['area', UIStrings.Area],
        ['bar', UIStrings.Bar],
        ['other', 'other'],
    ])('returns correct string for type %s', (type, expected) => {
        const result = chartTypeToUIStrings(type);
        expect(result).toEqual(expected);
    });
});

describe('stringToFrequency', () => {
    test.each([
        [UIStrings.Daily, 'd'],
        [UIStrings.DailyClose, 'd'],
        [UIStrings.Weekly, 'w'],
        [UIStrings.Monthly, 'm'],
        [UIStrings.Quarterly, 'q'],
        [UIStrings.SemiAnnualy, 'sa'],
        [UIStrings.Annualy, 'a'],
    ])('returns correct frequency for string %s', (input, expected) => {
        const result = stringToFrequency(input);
        expect(result).toEqual(expected);
    });
});
