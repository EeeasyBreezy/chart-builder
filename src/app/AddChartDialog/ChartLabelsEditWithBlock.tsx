import ChartLabelsEdit from '@/Components/ChartLabelsEdit';
import { Stack, useTheme } from '@mui/material';
import { useAddChartDialogContext } from './useAddChartDialogContext';

export default function ChartLabelsEditWithBlock(): JSX.Element {
    const { selectedChart } = useAddChartDialogContext();
    const disabled = selectedChart.id === '';
    const theme = useTheme();

    return (
        <Stack
            sx={{
                opacity: disabled ? 0.5 : 1,
                pointerEvents: disabled ? 'none' : 'auto',
            }}
            spacing={theme.spacing(2)}
        >
            <ChartLabelsEdit />
        </Stack>
    );
}
