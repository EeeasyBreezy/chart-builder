import { Box, CircularProgress } from '@mui/material';
import ChartContainer from './ChartContainer';
import LineChart from './LineChart';
import { AreaChartProps } from './AreaChart';

export default function LoadingAreaChart({ chartLoading, selected, ...props }: AreaChartProps): JSX.Element {
    return (
        <ChartContainer selected={selected}>
            {chartLoading ? (
                <Box sx={{ alignSelf: 'center' }}>
                    <CircularProgress />
                </Box>
            ) : (
                <LineChart {...props} />
            )}
        </ChartContainer>
    );
}
