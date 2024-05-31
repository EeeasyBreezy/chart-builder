import Point from "./Point";

export type ChartType = "line" | "bar";
export type LineStyle = "solid" | "dashed";

export interface Chart {
    type: ChartType;
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
}

export const DefaultChart: Chart = {
    type: "line",
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
};