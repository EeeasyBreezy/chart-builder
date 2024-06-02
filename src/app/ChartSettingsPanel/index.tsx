import { Paper, Stack, Typography, useTheme } from '@mui/material';
import EditLabelsForm from './EditLabelsForm';
import { useChartContext } from '@/State/useChartContext';
import UIStrings from '@/utils/UIStrings';
import EditColors from './EditColors';
import VisibilityManagement from './VisibilityManagement';
import DataManipulationPanel from './DataManipulationPanel';
import EditChartType from './EditChartType';

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
                position: 'relative',
                height: '100%',
                display: 'flex',
                flexDirection: 'column',
            }}
        >
            <Typography
                variant="h6"
                sx={{
                    position: 'sticky',
                    top: 0,
                    backgroundColor: 'white',
                    zIndex: 1000,
                    padding: theme.spacing(1),
                    boxShadow: '0 2px 4px rgba(0,0,0,0.1)',
                    marginBottom: theme.spacing(4), // Ensure there's space between header and content
                }}
            >
                {`${UIStrings.ChartOptions}: ${selectedChart?.title || ''}`}
            </Typography>
            <Stack
                direction="column"
                spacing={theme.spacing(2)}
                sx={{
                    overflowY: 'auto',
                    flex: 1,
                }}
            >
                <EditLabelsForm />
                <EditChartType />
                <EditColors />
                <VisibilityManagement />
                <DataManipulationPanel />
            </Stack>
        </Paper>
    );
}
