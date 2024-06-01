import UIStrings from '@/utils/UIStrings';
import { Stack, Typography } from '@mui/material';

export default function EditColors(): JSX.Element {
    return (
        <Stack>
            <Typography variant="body1">{UIStrings.EditColors}</Typography>
        </Stack>
    );
}
