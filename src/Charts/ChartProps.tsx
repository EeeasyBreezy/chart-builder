import Point from '@/Models/Point';

export default interface BaseChartProps {
    title: string;
    id: string;
    plotColor?: string;
    xAxisColor?: string;
    yAxisColor?: string;
    xLabel: string;
    yLabel: string;
    hideXLabel?: boolean;
    hideYLabel?: boolean;
    points: Array<Point>;
    selected?: boolean;
    onClick?: (id: string) => void;
}
