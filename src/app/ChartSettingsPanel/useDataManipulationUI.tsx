import { useChartContext } from '@/State/useChartContext';
import UIStrings from '@/utils/UIStrings';
import { aggregationsToUIStrings, frequencytoUIStrings, unitsToUIStrings } from '@/utils/UIStringsMapping';
import { MenuItem } from '@mui/material';

interface DataManipulationUIItem {
    label: string;
    selectedValue?: string;
    options: Array<JSX.Element>;
}

export default function useDataManipulationUI(): Array<DataManipulationUIItem> {
    const { selectedChart } = useChartContext();

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
        },
    ];
}
