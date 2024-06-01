import { Paper, Stack, Typography, useTheme } from '@mui/material';
import EditLabelsForm from './EditLabelsForm';
import { useChartContext } from '@/State/useChartContext';
import UIStrings from '@/utils/UIStrings';
import EditColors from './EditColors';
import VisibilityManagement from './VisibilityManagement';
import DataManipulationPanel from './DataManipulationPanel';

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
                pointerEvents: selectedChart.chartLoading ? 'none' : 'auto',
                opacity: selectedChart.chartLoading ? 0.5 : 1,
                position: 'sticky',
                top: 0,
            }}
        >
            <Stack direction="column" spacing={theme.spacing(2)}>
                <Typography variant="h6">{`${UIStrings.ChartOptions}: ${selectedChart?.title || ''}`}</Typography>
                <EditLabelsForm />
                <EditColors />
                <VisibilityManagement />
                <DataManipulationPanel />
            </Stack>
        </Paper>
    );
}
