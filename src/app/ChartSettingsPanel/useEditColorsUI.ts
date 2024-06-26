import { Chart } from '@/Models/Chart';
import { useChartContext } from '@/State/useChartContext';
import UIStrings from '@/utils/UIStrings';
import { ChangeEvent } from 'react';
import { ColorResult } from 'react-color';

interface UseEditColors {
    label: string;
    selectedColor: string;
    dataCy: string;
    onChange: (color: ColorResult, event: ChangeEvent<HTMLInputElement>) => void;
}

export default function useEditColorsUI(): Array<UseEditColors> {
    const { selectedChart, updateChart } = useChartContext();
    const { plotColor, xAxisColor, yAxisColor } = selectedChart;

    return [
        {
            label: UIStrings.PlotColor,
            selectedColor: plotColor,
            dataCy: 'plotColor',
            onChange: (color) => {
                const chart: Chart = {
                    ...selectedChart,
                    plotColor: color.hex,
                };
                updateChart(chart);
            },
        },
        {
            label: UIStrings.XAxisColor,
            selectedColor: xAxisColor,
            dataCy: 'xAxisColor',
            onChange: (color) => {
                const chart: Chart = {
                    ...selectedChart,
                    xAxisColor: color.hex,
                };
                updateChart(chart);
            },
        },
        {
            label: UIStrings.YAxisColor,
            selectedColor: yAxisColor,
            dataCy: 'yAxisColor',
            onChange: (color) => {
                const chart: Chart = {
                    ...selectedChart,
                    yAxisColor: color.hex,
                };
                updateChart(chart);
            },
        },
    ];
}
