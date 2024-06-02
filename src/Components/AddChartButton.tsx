import UIStrings from '@/utils/UIStrings';
import { AddCircle } from '@mui/icons-material';
import { Button, ButtonProps, Stack, Typography, useTheme } from '@mui/material';

interface AddChartButtonProps extends Pick<ButtonProps, 'onClick'> {}

export default function AddChartButton({ onClick }: AddChartButtonProps): JSX.Element {
    const theme = useTheme();
    return (
        <Button onClick={onClick} size="medium" color="primary" variant="contained">
            <Stack direction="row" spacing={theme.spacing(2)}>
                <AddCircle />
                <Typography>{UIStrings.AddChart}</Typography>
            </Stack>
        </Button>
    );
}
