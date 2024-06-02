import { LineStyle } from '@/Models/Chart';
import { useChartContext } from '@/State/useChartContext';
import { lineStyleToUIStrings } from '@/utils/UIStringsMapping';
import { MenuItem, Select, SelectChangeEvent } from '@mui/material';

export default function LineStyleDropdown(): JSX.Element {
    const values: LineStyle[] = ['solid', 'dashed'];
    const { selectedChart, updateChart } = useChartContext();

    const onChange = (event: SelectChangeEvent<LineStyle>, child: React.ReactNode) => {
        updateChart({ ...selectedChart, lineStyle: event.target.value as LineStyle });
    };

    return (
        <Select value={selectedChart.lineStyle} onChange={onChange}>
            {values.map((value) => {
                return (
                    <MenuItem key={value} value={value}>
                        {lineStyleToUIStrings(value)}
                    </MenuItem>
                );
            })}
        </Select>
    );
}
