import React, { useState } from 'react';
import { ColorResult, SketchPicker } from 'react-color';
import { Box, Popover, Stack, Typography } from '@mui/material';

interface ColorPickerProps {
    label: string;
    color: string;
    onChange: (color: ColorResult, event: React.ChangeEvent<HTMLInputElement>) => void;
}

const ColorPicker = ({ label, color, onChange }: ColorPickerProps) => {
    const [anchorEl, setAnchorEl] = useState<HTMLDivElement | null>(null);

    const handleClick = (event: React.MouseEvent<HTMLDivElement>) => {
        setAnchorEl(anchorEl ? null : event.currentTarget);
    };

    const handleClose = () => {
        setAnchorEl(null);
    };

    const open = Boolean(anchorEl);
    const id = open ? 'color-popover' : undefined;

    return (
        <Box sx={{ display: 'flex' }}>
            <Stack direction="row" spacing={2} flex={1} alignItems="center">
                <Box
                    onClick={handleClick}
                    sx={{
                        padding: '5px',
                        background: '#fff',
                        borderRadius: '1px',
                        boxShadow: '0 0 0 1px rgba(0,0,0,.1)',
                        cursor: 'pointer',
                        display: 'inline-block',
                    }}
                >
                    <Box
                        style={{
                            background: color,
                            width: '36px',
                            height: '14px',
                            borderRadius: '2px',
                            display: 'inline-block',
                        }}
                    />
                </Box>
                <Typography variant="body2">{label}</Typography>
            </Stack>
            <Popover
                id={id}
                open={open}
                anchorEl={anchorEl}
                onClose={handleClose}
                anchorOrigin={{
                    vertical: 'bottom',
                    horizontal: 'left',
                }}
            >
                <Box
                    sx={{
                        alignSelf: 'flex-end',
                        padding: 2,
                    }}
                >
                    <SketchPicker color={color} onChange={onChange} />
                </Box>
            </Popover>
        </Box>
    );
};

export default ColorPicker;
