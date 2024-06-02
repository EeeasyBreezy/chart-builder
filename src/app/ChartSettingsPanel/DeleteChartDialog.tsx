import { useChartContext } from '@/State/useChartContext';
import UIStrings from '@/utils/UIStrings';
import { Button, Dialog, DialogActions, DialogContent, Typography } from '@mui/material';

export function DeleteChartDialog(): JSX.Element {
    const { selectedChart, deleteChart, deleteDialogOpen, closeDeleteDialog } = useChartContext();

    const onClick = () => {
        deleteChart(selectedChart.id);
    };

    return (
        <Dialog open={deleteDialogOpen}>
            <DialogContent>
                <Typography variant="body2">{UIStrings.AreYouSureYouWantToDeleteTheChart}</Typography>
            </DialogContent>
            <DialogActions
                sx={{
                    display: 'flex',
                    flexDirection: 'row',
                    justifyContent: 'space-around',
                }}
            >
                <Button onClick={onClick} color="primary" variant="contained">
                    {UIStrings.Yes}
                </Button>
                <Button onClick={closeDeleteDialog} color="error" variant="contained">
                    {UIStrings.Cancel}
                </Button>
            </DialogActions>
        </Dialog>
    );
}
