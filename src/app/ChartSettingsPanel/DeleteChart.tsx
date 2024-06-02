import { useChartContext } from '@/State/useChartContext';
import UIStrings from '@/utils/UIStrings';
import { Button } from '@mui/material';
import { DeleteChartDialog } from './DeleteChartDialog';

export default function DeleteChart(): JSX.Element {
    const { openDeleteDialog } = useChartContext();

    return (
        <>
            <Button variant="contained" color="error" onClick={openDeleteDialog}>
                {UIStrings.DeleteChart}
            </Button>
            <DeleteChartDialog />
        </>
    );
}
