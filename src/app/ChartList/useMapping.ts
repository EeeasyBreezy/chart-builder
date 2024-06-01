import BaseChartProps from "@/Charts/ChartProps";
import { LineChartProps } from "@/Charts/LineChart";
import { Chart } from "@/Models/Chart";

interface ChartMapping {
    convertToProps: (chart: Chart) => LineChartProps;
}
export default function useMapping():ChartMapping {

    const convertToProps = (chart: Chart): LineChartProps => {
        const result: LineChartProps ={
            id: chart.id,
            title: chart.title,
            plotColor: chart.plotColor,
            xAxisColor: chart.xAxisColor,
            yAxisColor: chart.yAxisColor,
            xLabel: chart.xLabel,
            yLabel: chart.yLabel,
            hideXLabel: chart.hideXLabel,
            hideYLabel: chart.hideYLabel,
            points: chart.points,
            lineStyle: chart.lineStyle,
            showPoints: chart.showPoints
        };

        return result;
    };

    return {
        convertToProps,
    };
}