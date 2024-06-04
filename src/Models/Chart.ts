import Point from './Point';

export type ChartType = 'line' | 'area' | 'bar';
export type LineStyle = 'solid' | 'dashed';
export type Frequencies = 'd' | 'w' | 'm' | 'q' | 'sa' | 'a';
export type Aggregations = 'sum' | 'avg' | 'eop';
export type Units = 'lin' | 'chg' | 'pch' | 'pca' | 'log';

export interface Chart {
    type: ChartType;
    id: string;
    chartTypeId: string;
    title: string;
    plotColor: string;
    xAxisColor: string;
    yAxisColor: string;
    xLabel: string;
    yLabel: string;
    hideXLabel: boolean;
    hideYLabel: boolean;
    points: Array<Point>;
    lineStyle: LineStyle;
    hidePoints: boolean;
    frequencies: Array<Frequencies>;
    units: Array<Units>;
    aggregations: Array<Aggregations>;
    currentFrequency: Frequencies;
    currentUnit: Units;
    currentAggregation?: Aggregations;
    chartLoading?: boolean;
    areaColor?: string;
    backgroundColor?: string;
}

export const DefaultChart: Chart = {
    type: 'line',
    id: '',
    chartTypeId: '',
    title: '',
    plotColor: 'red',
    xAxisColor: 'black',
    yAxisColor: 'black',
    xLabel: '',
    yLabel: '',
    hideXLabel: false,
    hideYLabel: false,
    points: [],
    lineStyle: 'solid',
    hidePoints: true,
    frequencies: [],
    units: [],
    aggregations: [],
    currentFrequency: 'a',
    currentUnit: 'lin',
};
