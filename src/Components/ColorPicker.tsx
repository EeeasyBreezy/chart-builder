import { Stack, Typography } from '@mui/material';
import React from 'react';
import { ColorResult, HuePicker, SketchPicker } from 'react-color';

interface ColorPickerProps {
    label: string;
    color: string;
    onChange: (color: ColorResult, event: React.ChangeEvent<HTMLInputElement>) => void;
}

export default function ColorPicker({ label, color, onChange }: ColorPickerProps): JSX.Element {
    return (
        <Stack>
            <Typography variant="body1">{label}</Typography>
            <HuePicker color={color} onChange={onChange} />
        </Stack>
    );
}
