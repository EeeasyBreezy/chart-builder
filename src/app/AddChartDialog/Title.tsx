import { useChartContext } from '@/State/useChartContext';
import UIStrings from '@/utils/UIStrings';
import { CloseOutlined } from '@mui/icons-material';
import { DialogTitle, Typography, IconButton, useTheme } from '@mui/material';
import { useFormikContext } from 'formik';
import { DefaultChartOption, useAddChartDialogContext } from './useAddChartDialogContext';

export default function Title(): JSX.Element {
    const theme = useTheme();
    const { resetForm } = useFormikContext();
    const { closeDialog } = useChartContext();
    const { dispose } = useAddChartDialogContext();

    const closeWrapper = () => {
        dispose();
        resetForm({ values: { chartType: DefaultChartOption, title: '', xLabel: '', yLabel: '' } });
        closeDialog();
    };

    return (
        <DialogTitle>
            <Typography>{UIStrings.AddChart}</Typography>
            <IconButton
                style={{
                    position: 'absolute',
                    right: theme.spacing(1),
                    top: theme.spacing(1),
                    color: theme.palette.grey[500],
                }}
                onClick={closeWrapper}
            >
                <CloseOutlined />
            </IconButton>
        </DialogTitle>
    );
}
