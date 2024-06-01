import { Paper, Stack, Typography, useTheme } from '@mui/material';
import EditLabelsForm from './EditLabelsForm';
import { useChartContext } from '@/State/useChartContext';
import UIStrings from '@/utils/UIStrings';

export default function ChartSettingsPanel(): JSX.Element {
    const { selectedChart } = useChartContext();
    const theme = useTheme();

    return (
        <Paper
            sx={{
                minWidth: '30%',
                alignSelf: 'flex-end',
                elevation: 1,
                padding: theme.spacing(2),
            }}
        >
            <Stack direction="column" spacing={theme.spacing(2)}>
                <Typography variant="h6">{`${UIStrings.ChartOptions}: ${selectedChart?.title || ''}`}</Typography>
                <EditLabelsForm />
            </Stack>
        </Paper>
    );
}
