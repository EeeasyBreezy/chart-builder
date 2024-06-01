import { Line } from 'react-chartjs-2';
import BaseChartProps from './ChartProps';
import { Box, useTheme } from '@mui/material';

export interface LineChartProps extends BaseChartProps {
    lineStyle?: string;
    showPoints?: boolean;
}

export default function LineChart(props: LineChartProps): JSX.Element {
    const {
        lineStyle,
        showPoints,
        points,
        title,
        plotColor,
        xLabel,
        yLabel,
        hideXLabel,
        hideYLabel,
        xAxisColor,
        yAxisColor,
        selected,
    } = props;
    const theme = useTheme();

    return (
        <Box
            sx={{
                padding: theme.spacing(2),
                borderWidth: '1px',
                borderStyle: 'solid',
                borderColor: selected ? 'green' : 'black',
                ':hover': {
                    borderColor: 'red',
                },
            }}
        >
            <Line
                onClick={() => {
                    alert('Hello!');
                }}
                data={{
                    labels: points.map((p) => p.x),
                    datasets: [
                        {
                            label: title,
                            animation: false,
                            data: points.map((p) => p.y),
                            borderColor: plotColor || 'red',
                            pointRadius: showPoints ? 3 : 0,
                            borderDash: lineStyle === 'dashed' ? [5, 5] : [],
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
        </Box>
    );
}
