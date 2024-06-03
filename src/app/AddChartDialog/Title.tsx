import { useChartContext } from '@/State/useChartContext';
import UIStrings from '@/utils/UIStrings';
import { CloseOutlined } from '@mui/icons-material';
import { DialogTitle, Typography, IconButton, useTheme } from '@mui/material';

export default function Title(): JSX.Element {
    const theme = useTheme();
    const { closeDialog } = useChartContext();

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
                onClick={closeDialog}
            >
                <CloseOutlined />
            </IconButton>
        </DialogTitle>
    );
}
