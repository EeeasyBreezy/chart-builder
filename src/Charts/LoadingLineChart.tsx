import { Box, CircularProgress, useTheme } from '@mui/material';
import LineChart, { LineChartProps } from './LineChart';

export default function LoadingLineChart({ chartLoading, selected, ...props }: LineChartProps): JSX.Element {
    const theme = useTheme();

    return (
        <Box
            sx={{
                display: 'flex',
                padding: theme.spacing(2),
                borderWidth: selected ? '3px' : '1px',
                borderStyle: 'solid',
                borderColor: selected ? 'green' : 'black',
                ':hover': {
                    borderColor: 'red',
                },
                minHeight: theme.spacing(47),
                justifyContent: 'center',
            }}
        >
            {chartLoading ? (
                <Box sx={{ alignSelf: 'center' }}>
                    <CircularProgress />
                </Box>
            ) : (
                <LineChart {...props} />
            )}
        </Box>
    );
}
