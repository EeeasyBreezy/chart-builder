import { Box, useTheme } from '@mui/material';
import { useChartContext } from '@/State/useChartContext';
import AddChartButton from '@/Components/AddChartButton';
import AddChartDialog from './AddChartDialog';

export default function PageLayout(): JSX.Element {
    const { openDialog } = useChartContext();
    return (
        <Box>
            <AddChartButton onClick={openDialog} />
            <AddChartDialog />

            {/* <LineChart
                title={series.title}
                xLabel="Date"
                yLabel={series.title}
                points={observations.map((o) => {
                    const date = new Date(o.date);
                    const formattedDate = `${date.getFullYear()}-${date.getMonth()}-${date.getDate()}`;
                    const p: Point = { x: formattedDate, y: o.value };
                    return p;
                })}
                xAxisColor="blue"
                yAxisColor="green"
                showPoints
            /> */}
        </Box>
    );
}
