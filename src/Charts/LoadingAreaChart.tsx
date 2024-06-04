import { Box, CircularProgress } from '@mui/material';
import ChartContainer from './ChartContainer';
import AreaChart, { AreaChartProps } from './AreaChart';

export default function LoadingAreaChart({ chartLoading, selected, ...props }: AreaChartProps): JSX.Element {
    return (
        <ChartContainer selected={selected}>
            {chartLoading ? (
                <Box sx={{ alignSelf: 'center' }}>
                    <CircularProgress />
                </Box>
            ) : (
                <AreaChart {...props} />
            )}
        </ChartContainer>
    );
}
