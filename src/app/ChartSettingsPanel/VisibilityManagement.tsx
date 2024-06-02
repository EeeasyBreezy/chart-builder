import UIStrings from '@/utils/UIStrings';
import { Stack, Typography, useTheme } from '@mui/material';
import useVisibilityManagementUI from './useVisibilityManagementUI';
import LabeledCheckbox from '@/Components/LabeledCheckbox';

export default function VisibilityManagement(): JSX.Element {
    const theme = useTheme();
    const items = useVisibilityManagementUI();

    return (
        <Stack direction="column" spacing={theme.spacing(2)}>
            <Typography variant="body1">{UIStrings.LabelsVisibility}</Typography>
            <Stack direction="row" spacing={theme.spacing(0.5)}>
                {items.map((item) => (
                    <LabeledCheckbox
                        label={item.label}
                        onChange={item.onChange}
                        checked={item.checked}
                        key={item.label}
                    />
                ))}
            </Stack>
        </Stack>
    );
}
