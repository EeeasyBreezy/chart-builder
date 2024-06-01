import ColorPicker from '@/Components/ColorPicker';
import { Chart } from '@/Models/Chart';
import { useChartContext } from '@/State/useChartContext';
import UIStrings from '@/utils/UIStrings';
import { Stack, Typography } from '@mui/material';
import { ColorResult } from 'react-color';

export default function EditColors(): JSX.Element {
    const { updateChart, selectedChart } = useChartContext();

    const onChangeHandler = (color: ColorResult, event: React.ChangeEvent<HTMLInputElement>) => {
        const chart: Chart = {
            ...selectedChart!,
            plotColor: color.hex,
        };
        updateChart(chart);
    };
    return (
        <Stack>
            <Typography variant="body1">{UIStrings.EditColors}</Typography>
            <ColorPicker
                label={UIStrings.PlotColor}
                color={selectedChart?.plotColor || '#000000'}
                onChange={onChangeHandler}
            />
        </Stack>
    );
}
