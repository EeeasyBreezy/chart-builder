import { Stack, Typography } from '@mui/material';
import { SketchPicker } from 'react-color';

interface ColorPickerProps {
    label: string;
    color: string;
    onChange: (color: string) => void;
}

export default function ColorPicker({ label, color, onChange }: ColorPickerProps): JSX.Element {
    return (
        <Stack>
            <Typography variant="body1">{label}</Typography>
            <SketchPicker color={color} onChange={(color) => onChange(color.hex)} />
        </Stack>
    );
}
