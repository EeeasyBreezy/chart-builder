import { Aggregations, Frequencies, LineStyle, Units } from "@/Models/Chart";
import UIStrings from "@/utils/UIStrings";

export function frequencytoUIStrings(frequency: Frequencies) {
    switch(frequency) {
        case "d": return UIStrings.Daily;
        case "w": return UIStrings.Weekly;
        case "m": return UIStrings.Monthly;
        case "q": return UIStrings.Quaterly;
        case "sa": return UIStrings.SemiAnnualy;
        case "a": return UIStrings.Annualy;
    }
}

export function lineStyleToUIStrings(style: LineStyle) {
    switch(style)
    {
        case "solid": return UIStrings.Solid;
        case "dashed": return UIStrings.Dashed;
    }
}

export function aggregationsToUIStrings(aggregation: Aggregations) {
    switch(aggregation) {
        case "avg": return UIStrings.Average;
        case "eop": return UIStrings.EndOfPeriod;
        case "sum": return UIStrings.Sum;
    }
}

export function unitsToUIStrings(unit: Units) {
    switch(unit) {
        case "lin": return UIStrings.Linear;
        case "chg": return UIStrings.Change;
        case "log": return UIStrings.NaturalLog;
        default: return unit;
    }
}

export function chartTypeToUIStrings(type: string) {
    switch(type) {
        case "line": return UIStrings.Line;
        case "bar": return UIStrings.Bar;
        default: return type;
    }
}