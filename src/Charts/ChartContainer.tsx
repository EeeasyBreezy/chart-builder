import { Box, useTheme } from '@mui/material';
import React from 'react';

export default function ChartContainer({
    selected,
    children,
}: React.PropsWithChildren<{ selected?: boolean }>): JSX.Element {
    const theme = useTheme();

    return (
        <Box
            sx={{
                display: 'flex',
                padding: theme.spacing(2),
                borderWidth: selected ? '3px' : '1px',
                borderStyle: 'solid',
                borderColor: selected ? 'green' : 'black',
                ':hover': {
                    borderColor: 'red',
                },
                minHeight: theme.spacing(47),
                justifyContent: 'center',
            }}
        ></Box>
    );
}
