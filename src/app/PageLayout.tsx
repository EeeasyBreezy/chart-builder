import { Box, Grid, Stack, useTheme } from '@mui/material';
import { useChartContext } from '@/State/useChartContext';
import AddChartButton from '@/Components/AddChartButton';
import AddChartDialog from './AddChartDialog';
import ChartList from './ChartList';
import ChartSettingsPanel from './ChartSettingsPanel';

export default function PageLayout(): JSX.Element {
    const { openDialog } = useChartContext();
    const theme = useTheme();
    return (
        <Stack direction="column" spacing={theme.spacing(2)} sx={{ height: '100vh' }}>
            <AddChartButton onClick={openDialog} />

            <Grid
                container
                direction="row"
                spacing={theme.spacing(1)}
                paddingX={theme.spacing(2)}
                sx={{ flex: 1, overflow: 'hidden' }}
            >
                <Grid item xs={8} sx={{ height: '100%', overflowY: 'auto' }}>
                    <ChartList />
                </Grid>
                <Grid item xs={4} sx={{ height: '100%', overflowY: 'auto' }}>
                    <ChartSettingsPanel />
                </Grid>
            </Grid>

            <AddChartDialog />
        </Stack>
    );
}
