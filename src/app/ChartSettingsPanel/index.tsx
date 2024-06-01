import { Paper } from '@mui/material';
import EditLabelsForm from './EditLabelsForm';

export default function ChartSettingsPanel(): JSX.Element {
    return (
        <Paper
            sx={{
                minWidth: '30%',
                alignSelf: 'flex-end',
                elevation: 1,
                padding: 2,
            }}
        >
            <EditLabelsForm />
        </Paper>
    );
}
