import { Bar } from 'react-chartjs-2';
import BaseChartProps from './ChartProps';

export interface BarChartProps extends BaseChartProps {}

export default function BarChart(props: BarChartProps): JSX.Element {
    const { id, points, title, plotColor, xLabel, yLabel, hideXLabel, hideYLabel, xAxisColor, yAxisColor, onClick } =
        props;

    const handleClick = () => {
        if (onClick) {
            onClick(id);
        }
    };

    return (
        <Bar
            onClick={handleClick}
            data={{
                labels: points.map((p) => p.x),
                datasets: [
                    {
                        label: title,
                        animation: false,
                        data: points.map((p) => p.y),
                        borderColor: plotColor || 'red',
                    },
                ],
            }}
            options={{
                scales: {
                    x: {
                        type: 'time',
                        time: {
                            parser: 'yyyy-MM-dd',
                        },
                        title: {
                            display: !hideXLabel,
                            text: xLabel,
                        },
                        ticks: {
                            color: xAxisColor ?? 'black',
                        },
                    },
                    y: {
                        title: {
                            display: !hideYLabel,
                            text: yLabel,
                        },
                        ticks: {
                            color: yAxisColor ?? 'black',
                        },
                    },
                },
                plugins: {
                    legend: {
                        onClick: () => {},
                        labels: {
                            boxHeight: 0,
                            boxWidth: 0,
                        },
                        title: { display: true },
                    },
                    tooltip: {
                        enabled: true,
                        callbacks: {
                            title: function (context) {
                                const date = new Date(context[0].parsed.x);
                                const year = date.getFullYear();
                                const month = (date.getMonth() + 1).toString().padStart(2, '0');
                                const day = date.getDate().toString().padStart(2, '0');
                                return `${year}-${month}-${day}`;
                            },
                            label: function (context) {
                                return `Value: ${context.parsed.y}`;
                            },
                        },
                    },
                },
            }}
        />
    );
}
