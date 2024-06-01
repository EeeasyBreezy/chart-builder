import UIStrings from '@/utils/UIStrings';
import { Stack, Typography, useTheme } from '@mui/material';
import ChartTypeDropdown from './ChartTypeDropdown';

export default function EditChartType(): JSX.Element {
    const theme = useTheme();

    return (
        <Stack direction="column" spacing={theme.spacing(2)}>
            <Typography variant="body1">{UIStrings.ChartType}</Typography>
            <ChartTypeDropdown />
        </Stack>
    );
}
