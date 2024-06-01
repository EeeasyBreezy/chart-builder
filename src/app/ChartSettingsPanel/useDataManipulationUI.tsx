import { useChartContext } from '@/State/useChartContext';
import UIStrings from '@/utils/UIStrings';
import { aggregationsToUIStrings, frequencytoUIStrings, unitsToUIStrings } from '@/utils/UIStringsMapping';
import { MenuItem } from '@mui/material';

interface DataManipulationUIItem {
    label: string;
    options: Array<JSX.Element>;
}

export default function useDataManipulationUI(): Array<DataManipulationUIItem> {
    const { selectedChart } = useChartContext();

    return [
        {
            label: UIStrings.Units,
            options: [
                ...selectedChart.units.map((u) => {
                    return (
                        <MenuItem id={u} key={u} selected={selectedChart.currentUnit === u}>
                            {unitsToUIStrings(u)}
                        </MenuItem>
                    );
                }),
            ],
        },
        {
            label: UIStrings.Frequency,
            options: [
                ...selectedChart.frequencies.map((u) => {
                    return (
                        <MenuItem id={u} key={u} selected={selectedChart.currentFrequency === u}>
                            {frequencytoUIStrings(u)}
                        </MenuItem>
                    );
                }),
            ],
        },
        {
            label: UIStrings.Aggregate,
            options: [
                ...selectedChart.aggregations.map((u) => {
                    return (
                        <MenuItem id={u} key={u} selected={selectedChart.currentAggregation === u}>
                            {aggregationsToUIStrings(u)}
                        </MenuItem>
                    );
                }),
            ],
        },
    ];
}
