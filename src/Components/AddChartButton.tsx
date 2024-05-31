import UIStrings from '@/utils/UIStrings';
import { AddCircle } from '@mui/icons-material';
import { ButtonProps, IconButton, Stack, Typography, useTheme } from '@mui/material';

interface AddChartButtonProps extends Pick<ButtonProps, 'onClick'> {}

export default function AddChartButton({ onClick }: AddChartButtonProps): JSX.Element {
    const theme = useTheme();
    return (
        <IconButton onClick={onClick} size="medium" color="primary">
            <Stack direction="row" spacing={theme.spacing(2)}>
                <AddCircle />
                <Typography>{UIStrings.AddChart}</Typography>
            </Stack>
        </IconButton>
    );
}
