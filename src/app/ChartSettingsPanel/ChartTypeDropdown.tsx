import { ChartType } from '@/Models/Chart';
import { useChartContext } from '@/State/useChartContext';
import { chartTypeToUIStrings } from '@/utils/UIStringsMapping';
import { MenuItem, Select, SelectChangeEvent } from '@mui/material';

export default function ChartTypeDropdown(): JSX.Element {
    const types: ChartType[] = ['line', 'area', 'bar'];
    const { selectedChart, updateChart } = useChartContext();

    const onChange = (event: SelectChangeEvent<ChartType>) => {
        updateChart({ ...selectedChart, type: event.target.value as ChartType });
    };

    return (
        <Select value={selectedChart.type} onChange={onChange} data-cy="chartType">
            {types.map((type) => {
                return (
                    <MenuItem key={type} value={type}>
                        {chartTypeToUIStrings(type)}
                    </MenuItem>
                );
            })}
        </Select>
    );
}
