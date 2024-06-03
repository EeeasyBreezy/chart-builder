import { AreaChartProps } from '@/Charts/AreaChart';
import { LineChartProps } from '@/Charts/LineChart';
import { Chart } from '@/Models/Chart';

interface ChartMapping {
    convertToProps: (chart: Chart) => LineChartProps;
    convertToAreaChartProps: (chart: Chart) => AreaChartProps;
}
export default function useMapping(): ChartMapping {
    const convertToProps = (chart: Chart): LineChartProps => {
        const result: LineChartProps = {
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
            hidePoints: chart.hidePoints,
            chartLoading: chart.chartLoading,
        };

        return result;
    };

    const convertToAreaChartProps = (chart: Chart): AreaChartProps => {
        const result: AreaChartProps = convertToProps(chart);
        result.backgroundColor = chart.backgroundColor;

        return result;
    };

    return {
        convertToProps,
        convertToAreaChartProps,
    };
}
