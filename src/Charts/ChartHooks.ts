import { LineStyle } from "@/Models/Chart";
import Point from "@/Models/Point";
import { ChartData } from "chart.js";

function useData(label: string, points: Array<Point> ) {
    return {
        labels: points.map((p) => p.x),
        datasets: [
            {
                label: label,
                animation: false as false,
                data: points.map((p) => p.y),
            },
        ],
    }
}

export function useLineData(label: string, points: Array<Point>, lineStyle?: LineStyle, hidePoints?: boolean, plotColor?: string): ChartData<"line", number[], string> {
    const dataset = useData(label, points);
    return {
        ...dataset,
        datasets: [
            {
                ...dataset.datasets[0],
                borderColor: plotColor || 'red',
                pointRadius: !hidePoints ? 3 : 0,
                borderDash: lineStyle === 'dashed' ? [5, 5] : [],
            },
        ],
    }
}

export function useBarData(label: string, points: Array<Point>, plotColor?: string) {
    const dataset = useData(label, points);
    return {
        ...dataset,
        datasets: [
            {
                ...dataset.datasets[0],
                backgroundColor: plotColor || 'red',
            },
        ],
    }
}

export function useScales(xLabel: string, yLabel: string, hideXLabel?: boolean, hideYLabel?: boolean, xAxisColor?: string, yAxisColor?: string): any {
    return {
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
    }
}

function useLegend() {
    return {
        onClick: () => {},
        labels: {
            boxHeight: 0,
            boxWidth: 0,
        },
        title: { display: true },
    }
}

function useTooltip() {
    return {
        enabled: true,
        callbacks: {
            title: function (context: any) {
                const date = new Date(context[0].parsed.x);
                return date.toISOString().split('T')[0];
            },
            label: function (context: any) {
                return `Value: ${context.parsed.y}`;
            },
        },
    }
}

export function usePlugins() {
    return {
        legend: useLegend(),
        tooltip: useTooltip(),
    }
}