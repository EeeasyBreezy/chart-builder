import { Bar } from 'react-chartjs-2';
import BaseChartProps from './ChartProps';
import { useScales, usePlugins, useBarData } from './ChartHooks';

export interface BarChartProps extends BaseChartProps {}

export default function BarChart(props: BarChartProps): JSX.Element {
    const { id, points, title, plotColor, xLabel, yLabel, hideXLabel, hideYLabel, xAxisColor, yAxisColor, onClick } =
        props;

    const handleClick = () => {
        if (onClick) {
            onClick(id);
        }
    };

    const data = useBarData(title, points, plotColor);
    const scales = useScales(xLabel, yLabel, hideXLabel, hideYLabel, xAxisColor, yAxisColor);
    const plugins = usePlugins();

    return (
        <Bar
            onClick={handleClick}
            data={data}
            options={{
                scales,
                plugins,
            }}
        />
    );
}
