import { Aggregations, Chart, Frequencies, Units } from '@/Models/Chart';
import { useChartContext } from '@/State/useChartContext';
import UIStrings from '@/utils/UIStrings';
import { aggregationsToUIStrings, frequencytoUIStrings, unitsToUIStrings } from '@/utils/UIStringsMapping';
import { MenuItem, SelectChangeEvent } from '@mui/material';

interface DataManipulationUIItem {
    label: string;
    selectedValue?: string;
    options: Array<JSX.Element>;
    onChange: (event: SelectChangeEvent<string>, child: React.ReactNode) => void;
}

export default function useDataManipulationUI(): Array<DataManipulationUIItem> {
    const { selectedChart, reloadChart } = useChartContext();

    return [
        {
            label: UIStrings.Units,
            selectedValue: selectedChart.currentUnit,
            options: [
                ...selectedChart.units.map((u) => {
                    return (
                        <MenuItem id={u} key={u} value={u}>
                            {unitsToUIStrings(u)}
                        </MenuItem>
                    );
                }),
            ],
            onChange: async (event, child) => {
                const chart: Chart = {
                    ...selectedChart,
                    currentUnit: event.target.value as Units,
                };
                await reloadChart(chart);
            },
        },
        {
            label: UIStrings.Frequency,
            selectedValue: selectedChart.currentFrequency,
            options: [
                ...selectedChart.frequencies.map((u) => {
                    return (
                        <MenuItem id={u} key={u} value={u}>
                            {frequencytoUIStrings(u)}
                        </MenuItem>
                    );
                }),
            ],
            onChange: async (event, child) => {
                const chart: Chart = {
                    ...selectedChart,
                    currentFrequency: event.target.value as Frequencies,
                };
                await reloadChart(chart);
            },
        },
        {
            label: UIStrings.Aggregate,
            selectedValue: selectedChart.currentAggregation,
            options: [
                ...selectedChart.aggregations.map((u) => {
                    return (
                        <MenuItem id={u} key={u} value={u}>
                            {aggregationsToUIStrings(u)}
                        </MenuItem>
                    );
                }),
            ],
            onChange: async (event, child) => {
                const chart: Chart = {
                    ...selectedChart,
                    currentAggregation: event.target.value as Aggregations,
                };
                await reloadChart(chart);
            },
        },
    ];
}
