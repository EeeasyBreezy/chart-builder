import AddChartButton from '@/Components/AddChartButton';
import { useChartContext } from '@/State/useChartContext';
import UIStrings from '@/utils/UIStrings';
import { Stack, Typography, useTheme } from '@mui/material';

export default function PageHeader(): JSX.Element {
    const theme = useTheme();
    const { openDialog } = useChartContext();

    return (
        <Stack direction="row" spacing={theme.spacing(2)} marginTop={theme.spacing(2)}>
            <Typography variant="h6">{UIStrings.ChartBuilder}</Typography>
            <AddChartButton onClick={openDialog} />
        </Stack>
    );
}
