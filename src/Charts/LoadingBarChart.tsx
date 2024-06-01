import { Box, CircularProgress, useTheme } from '@mui/material';
import { LineChartProps } from './LineChart';
import ChartContainer from './ChartContainer';
import BarChart from './BarChart';

export default function LoadingLineChart({ chartLoading, selected, ...props }: LineChartProps): JSX.Element {
    const theme = useTheme();

    return (
        <ChartContainer selected={selected}>
            {chartLoading ? (
                <Box sx={{ alignSelf: 'center' }}>
                    <CircularProgress />
                </Box>
            ) : (
                <BarChart {...props} />
            )}
        </ChartContainer>
    );
}
