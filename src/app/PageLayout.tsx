import AddChartDialog from '@/Dialog/AddChartDialog';
import { Box, useTheme } from '@mui/material';
import { useChartContext } from '@/State/useChartContext';
import AddChartButton from '@/Components/AddChartButton';

export default function PageLayout(): JSX.Element {
    const theme = useTheme();
    const { open, openDialog, closeDialog } = useChartContext();
    return (
        <Box>
            <AddChartButton onClick={openDialog} />
            <AddChartDialog open={open} onClose={closeDialog} />

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
