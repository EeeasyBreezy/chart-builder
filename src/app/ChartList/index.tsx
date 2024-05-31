import LineChart from '@/Charts/LineChart';
import { useChartContext } from '@/State/useChartContext';
import { Stack, useTheme } from '@mui/material';
import useMapping from './useMapping';

export default function ChartList(): JSX.Element {
    const { charts } = useChartContext();
    const theme = useTheme();
    const { convertToProps } = useMapping();

    return (
        <Stack direction="column" spacing={theme.spacing(2)}>
            {charts.map((chart) => {
                if (chart.type == 'line') {
                    return <LineChart key={chart.id} {...convertToProps(chart)} />;
                }
            })}
        </Stack>
    );
}
