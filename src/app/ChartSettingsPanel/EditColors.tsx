import ColorPicker from '@/Components/ColorPicker';
import UIStrings from '@/utils/UIStrings';
import { Stack, Typography, useTheme } from '@mui/material';
import useEditColorsUI from './useEditColorsUI';

export default function EditColors(): JSX.Element {
    const theme = useTheme();
    const pickers = useEditColorsUI();

    return (
        <Stack direction="column" spacing={theme.spacing(2)}>
            <Typography variant="body1">{UIStrings.EditColors}</Typography>
            <Stack direction="row" columnGap={theme.spacing(2)} justifyContent="center">
                {pickers.map((item) => (
                    <ColorPicker
                        label={item.label}
                        color={item.selectedColor}
                        onChange={item.onChange}
                        key={item.label}
                        data-cy={item.dataCy}
                    />
                ))}
            </Stack>
        </Stack>
    );
}
