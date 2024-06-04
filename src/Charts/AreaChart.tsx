import { Line } from 'react-chartjs-2';
import { LineChartProps } from './LineChart';
import { useLineData, usePlugins, useScales } from './ChartHooks';

export interface AreaChartProps extends LineChartProps {
    fillColor?: string;
}

export default function AreaChart(props: AreaChartProps): JSX.Element {
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
        fillColor,
    } = props;

    const handleClick = () => {
        if (onClick) {
            onClick(id);
        }
    };

    const data = useLineData(title, points, lineStyle, hidePoints, plotColor);
    const scales = useScales(xLabel, yLabel, hideXLabel, hideYLabel, xAxisColor, yAxisColor);
    const plugins = usePlugins();

    data.datasets[0].backgroundColor = fillColor || 'red';
    data.datasets[0].fill = true;
    scales.y.beginAtZero = true;

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
