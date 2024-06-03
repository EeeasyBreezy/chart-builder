import UIStrings from '@/utils/UIStrings';
import { Stack, Typography, useTheme } from '@mui/material';
import ChartTypeDropdown from './ChartTypeDropdown';
import { useChartContext } from '@/State/useChartContext';
import LineStyleDropdown from './LineStyleDropdown';

export default function EditChartType(): JSX.Element {
    const theme = useTheme();
    const { selectedChart } = useChartContext();

    return (
        <Stack direction="column" spacing={theme.spacing(2)}>
            <Typography variant="body1">{UIStrings.ChartType}</Typography>
            <ChartTypeDropdown />
            {selectedChart.type !== 'bar' && <LineStyleDropdown />}
        </Stack>
    );
}
