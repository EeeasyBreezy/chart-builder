import Point from "./Point";

export type ChartType = "line" | "bar";
export type LineStyle = "solid" | "dashed";
export type Frequencies = "daily" | "weekly" | "monthly" | "quarterly" | "semi-annualy" | "annualy";
export type Aggregations = "sum" | "average";
export type Units = "raw" | "percentageChange" | "compoundedRateOfChange";

export interface Chart {
    type: ChartType;
    id: string;
    title: string;
    plotColor: string;
    xAxisColor: string;
    yAxisColor: string;
    xLabel: string;
    yLabel: string;
    hideXLabel: boolean;
    hideYLabel: boolean;
    points: Array<Point>;
    lineStyle: LineStyle;
    showPoints: boolean;
    frequencies: Array<Frequencies>;
    units: Array<Units>;
    aggregations: Array<Aggregations>
}

export const DefaultChart: Chart = {
    type: "line",
    id: "",
    title: "",
    plotColor: "red",
    xAxisColor: "black",
    yAxisColor: "black",
    xLabel: "",
    yLabel: "",
    hideXLabel: false,
    hideYLabel: false,
    points: [],
    lineStyle: "solid",
    showPoints: true,
    frequencies: [],
    units: [],
    aggregations: []
};