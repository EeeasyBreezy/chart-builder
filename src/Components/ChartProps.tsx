import { ObservationDTO } from '@/DTO/ObservationDTO';
import Point from '@/Models/Point';

export default interface BaseChartProps {
    title: string;
    plotColor?: string;
    xAxisColor?: string;
    yAxisColor?: string;
    xLabel: string;
    yLabel: string;
    hideXLabel?: boolean;
    hideYLabel?: boolean;
    points: Array<Point>;
}
