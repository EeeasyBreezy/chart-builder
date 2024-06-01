import { Box, Paper } from '@mui/material';

export default function ChartSettingsPanel(): JSX.Element {
    return (
        <Paper
            sx={{
                minWidth: '30%',
                alignSelf: 'flex-end',
                elevation: 1,
            }}
        >
            Chart settings panel
        </Paper>
    );
}
