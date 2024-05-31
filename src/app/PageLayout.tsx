import { Box, Stack, useTheme } from '@mui/material';
import dateFns from 'chartjs-adapter-date-fns';
import { useChartContext } from '@/State/useChartContext';
import AddChartButton from '@/Components/AddChartButton';
import AddChartDialog from './AddChartDialog';
import ChartList from './ChartList';

export default function PageLayout(): JSX.Element {
    const { openDialog } = useChartContext();
    const theme = useTheme();
    return (
        <Stack direction="column" spacing={theme.spacing(2)}>
            <AddChartButton onClick={openDialog} />
            <ChartList />

            <AddChartDialog />
        </Stack>
    );
}
