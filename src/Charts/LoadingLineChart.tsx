import { Box, CircularProgress } from '@mui/material';
import LineChart, { LineChartProps } from './LineChart';
import ChartContainer from './ChartContainer';

export default function LoadingLineChart({ chartLoading, selected, ...props }: LineChartProps): JSX.Element {
    return (
        <ChartContainer selected={selected}>
            {chartLoading ? (
                <Box sx={{ alignSelf: 'center' }} data-cy={props.title}>
                    <CircularProgress />
                </Box>
            ) : (
                <LineChart {...props} />
            )}
        </ChartContainer>
    );
}
