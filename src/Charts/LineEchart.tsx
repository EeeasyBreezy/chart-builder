import { LineStyle } from "@/Models/Chart";
import ReactECharts from 'echarts-for-react';
import * as echarts from 'echarts';
import BaseChartProps from "./ChartProps";
import { Box } from "@mui/material";

export interface LineChartProps extends BaseChartProps {
    lineStyle?: LineStyle;
    hidePoints?: boolean;
}

export default function LineEChart(props: LineChartProps): JSX.Element {
    const {
        id,
        lineStyle: newLineStyle,
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

    const chart: echarts.EChartsOption = {
        legend: {
            data: [yLabel]
        },
        title: {
            text: title,
        },
        xAxis: {
            type: 'category',
            data: points.map(p => p.x),
            name: xLabel,
            axisLine: {
                lineStyle: {
                    color: xAxisColor,
                }
            }
        },
        yAxis: {
            type: 'value',
            name: yLabel,
            axisLine: {
                lineStyle: {
                    color: yAxisColor,
                }
            }
        },
        series: [
            {
                name: title,
                type: 'line',
                data: points.map(p => p.y),
                itemStyle: {color: plotColor},
                lineStyle: newLineStyle === "dashed" ? {
                    type: 'dashed'
                } : {
                    type: 'solid'
                }
            },
        ],
    };
    
    return (
        <Box sx={{
            width: '100%',
            height: "100%",
        }}
        onClick={() => {if(id && onClick) { onClick(id)}}} >
            <ReactECharts option={chart} />
        </Box>
    );
}