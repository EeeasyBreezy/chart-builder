import { Line } from "react-chartjs-2";
import BaseChartProps from "./ChartProps";

export interface LineChartProps extends BaseChartProps {
    lineStyle?: string;
    showPoints?: boolean;
}

export default function LineChart(props: LineChartProps): JSX.Element {
    const { lineStyle, showPoints, points, title, plotColor, xLabel, yLabel, showXLabel, showYLabel } = props;

    return (
        <Line
            data={{
                labels: points.map(p => p.x),
                datasets: [
                    {
                        label: title,
                        animation: false,
                        data: points.map(p => p.y),
                        borderColor: plotColor,
                    }
                ]
            }}
            options={{
                scales: {
                    x: {
                        type: 'time',
                        time: {
                            parser: 'yyyy-mm-dd',
                            unit: 'day'
                        },
                        title: {
                            display: showXLabel,
                            text: xLabel
                        }
                    },
                    y: {
                        title: {
                            display: showYLabel,
                            text: yLabel
                        }
                    }
                },
                plugins: {
                    tooltip: {
                        enabled: true,
                        callbacks: {
                            title: function(context) {
                                return `Date: ${context[0].label}`;
                            },
                            label: function(context) {
                                return `Value: ${context.parsed.y}`;
                            }
                        }
                    }
                }
            }}
        />
    );
}