import BaseChartProps from "./ChartProps";

export interface LineChartProps extends BaseChartProps {
    lineStyle: string;
    showPoints: boolean;
}