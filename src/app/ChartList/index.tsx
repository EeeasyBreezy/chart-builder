import LineChart from '@/Charts/LineChart';
import { useChartContext } from '@/State/useChartContext';
import { Stack, useTheme } from '@mui/material';

export default function ChartList(): JSX.Element {
    const { charts } = useChartContext();
    const theme = useTheme();

    return (
        <Stack direction="column" spacing={theme.spacing(2)}>
            {charts.map((chart) => {
                if (chart.type == 'line') {
                    return <LineChart key={chart.id} {...chart} />;
                }
            })}
        </Stack>
    );
}
