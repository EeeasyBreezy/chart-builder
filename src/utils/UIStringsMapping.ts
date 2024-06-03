import { Aggregations, Frequencies, LineStyle, Units } from '@/Models/Chart';
import UIStrings from '@/utils/UIStrings';

export function frequencytoUIStrings(frequency: Frequencies) {
    switch (frequency.toLowerCase()) {
        case 'd':
            return UIStrings.Daily;
        case 'w':
            return UIStrings.Weekly;
        case 'm':
            return UIStrings.Monthly;
        case 'q':
            return UIStrings.Quarterly;
        case 'sa':
            return UIStrings.SemiAnnualy;
        case 'a':
            return UIStrings.Annualy;
    }
}

export function stringToFrequency(frequency: string) {
    switch (frequency) {
        case UIStrings.Daily:
        case UIStrings.DailyClose:
            return 'd';
        case UIStrings.Weekly:
            return 'w';
        case UIStrings.Monthly:
            return 'm';
        case UIStrings.Quarterly:
            return 'q';
        case UIStrings.SemiAnnualy:
            return 'sa';
        case UIStrings.Annualy:
            return 'a';
    }
}

export function lineStyleToUIStrings(style: LineStyle) {
    switch (style) {
        case 'solid':
            return UIStrings.Solid;
        case 'dashed':
            return UIStrings.Dashed;
    }
}

export function aggregationsToUIStrings(aggregation: Aggregations) {
    switch (aggregation) {
        case 'avg':
            return UIStrings.Average;
        case 'eop':
            return UIStrings.EndOfPeriod;
        case 'sum':
            return UIStrings.Sum;
    }
}

export function unitsToUIStrings(unit: Units) {
    switch (unit) {
        case 'lin':
            return UIStrings.Linear;
        case 'chg':
            return UIStrings.Change;
        case 'log':
            return UIStrings.NaturalLog;
        default:
            return unit;
    }
}

export function chartTypeToUIStrings(type: string) {
    switch (type) {
        case 'line':
            return UIStrings.Line;
        case 'area':
            return UIStrings.Area;
        case 'bar':
            return UIStrings.Bar;
        default:
            return type;
    }
}
