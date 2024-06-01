import { Line } from 'react-chartjs-2';
import BaseChartProps from './ChartProps';
import { useLineData, usePlugins, useScales } from './ChartHooks';
import { LineStyle } from '@/Models/Chart';

export interface LineChartProps extends BaseChartProps {
    lineStyle?: LineStyle;
    hidePoints?: boolean;
}

export default function LineChart(props: LineChartProps): JSX.Element {
    const {
        id,
        lineStyle,
        hidePoints,
        points,
        title,
        plotColor,
        xLabel,
        yLabel,
        hideXLabel,
        hideYLabel,
        xAxisColor,
        yAxisColor,
        onClick,
    } = props;

    const handleClick = () => {
        if (onClick) {
            onClick(id);
        }
    };

    const data = useLineData(title, points, lineStyle, hidePoints, plotColor);
    const scales = useScales(xLabel, yLabel, hideXLabel, hideYLabel, xAxisColor, yAxisColor);
    const plugins = usePlugins();

    return (
        <Line
            onClick={handleClick}
            data={data}
            options={{
                scales,
                plugins,
            }}
        />
    );
}
