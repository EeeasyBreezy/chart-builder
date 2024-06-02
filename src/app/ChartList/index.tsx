import LineChart from '@/Charts/LineChart';
import { useChartContext } from '@/State/useChartContext';
import { Stack, useTheme } from '@mui/material';
import useMapping from './useMapping';
import LoadingLineChart from '@/Charts/LoadingLineChart';
import LoadingBarChart from '@/Charts/LoadingBarChart';

export default function ChartList(): JSX.Element {
    const { charts, selectedChart, selectChart } = useChartContext();
    const theme = useTheme();
    const { convertToProps } = useMapping();

    const onClick = (id: string) => {
        selectChart(id);
    };

    return (
        <Stack
            direction="column"
            spacing={theme.spacing(2)}
            sx={{
                marginBottom: theme.spacing(4),
            }}
        >
            {charts.map((chart) => {
                if (chart.type == 'line') {
                    return (
                        <LoadingLineChart
                            key={chart.id}
                            {...convertToProps(chart)}
                            selected={chart.id === selectedChart?.id}
                            onClick={onClick}
                        />
                    );
                }
                if (chart.type == 'bar') {
                    return (
                        <LoadingBarChart
                            key={chart.id}
                            {...convertToProps(chart)}
                            selected={chart.id === selectedChart?.id}
                            onClick={onClick}
                        />
                    );
                }
            })}
        </Stack>
    );
}
