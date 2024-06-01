import ColorPicker from '@/Components/ColorPicker';
import UIStrings from '@/utils/UIStrings';
import { Stack, Typography } from '@mui/material';

export default function EditColors(): JSX.Element {
    return (
        <Stack>
            <Typography variant="body1">{UIStrings.EditColors}</Typography>
            <ColorPicker label={UIStrings.XAxisColor} color="#000000" onChange={() => {}} />
        </Stack>
    );
}
