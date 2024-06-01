import { useChartContext } from '@/State/useChartContext';
import UIStrings from '@/utils/UIStrings';
import { MenuItem, Select, Stack, Typography, useTheme } from '@mui/material';
import useDataManipulationUI from './useDataManipulationUI';

export default function DataManipulationPanel(): JSX.Element {
    const theme = useTheme();
    const { selectedChart } = useChartContext();
    const items = useDataManipulationUI();

    return (
        <Stack direction="column" spacing={theme.spacing(2)}>
            <Typography variant="body1">{UIStrings.DataManipulation}</Typography>
            {items.map((item) => (
                <Select label={item.label} key={item.label}>
                    {item.options.map((option) => (
                        <MenuItem value={option.id} key={option.id}>
                            {option.value.name}
                        </MenuItem>
                    ))}
                </Select>
            ))}
        </Stack>
    );
}
