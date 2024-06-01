import { Box, useTheme } from '@mui/material';
import LineChart, { LineChartProps } from './LineChart';
import LoadingOverlay from '@/Components/LoadingOverlay';

export default function LoadingLineChart({ chartLoading, selected, ...props }: LineChartProps): JSX.Element {
    const theme = useTheme();

    return (
        <Box
            sx={{
                padding: theme.spacing(2),
                borderWidth: selected ? '3px' : '1px',
                borderStyle: 'solid',
                borderColor: selected ? 'green' : 'black',
                ':hover': {
                    borderColor: 'red',
                },
            }}
        >
            {chartLoading ? <LoadingOverlay /> : <LineChart {...props} />}
        </Box>
    );
}
