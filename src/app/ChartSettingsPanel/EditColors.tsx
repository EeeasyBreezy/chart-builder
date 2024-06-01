import ColorPicker from '@/Components/ColorPicker';
import { Chart } from '@/Models/Chart';
import { useChartContext } from '@/State/useChartContext';
import UIStrings from '@/utils/UIStrings';
import { Stack, Typography, useTheme } from '@mui/material';
import { ColorResult } from 'react-color';
import useEditColors from './useEditColors';

export default function EditColors(): JSX.Element {
    const { updateChart, selectedChart } = useChartContext();
    const theme = useTheme();

    const pickers = useEditColors();

    const onChangeHandler = (color: ColorResult, event: React.ChangeEvent<HTMLInputElement>) => {
        const chart: Chart = {
            ...selectedChart!,
            plotColor: color.hex,
        };
        updateChart(chart);
    };
    return (
        <Stack direction="column" spacing={theme.spacing(2)}>
            <Typography variant="body1">{UIStrings.EditColors}</Typography>
            {pickers.map((item) => (
                <ColorPicker label={item.label} color={item.selectedColor} onChange={item.onChange} />
            ))}
        </Stack>
    );
}
