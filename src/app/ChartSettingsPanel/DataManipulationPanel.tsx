import { useChartContext } from '@/State/useChartContext';
import UIStrings from '@/utils/UIStrings';
import { InputLabel, MenuItem, Select, Stack, Typography, useTheme } from '@mui/material';
import useDataManipulationUI from './useDataManipulationUI';

export default function DataManipulationPanel(): JSX.Element {
    const theme = useTheme();
    const items = useDataManipulationUI();

    return (
        <Stack direction="column" spacing={theme.spacing(2)}>
            <Typography variant="body1">{UIStrings.DataManipulation}</Typography>
            <Stack direction="column" spacing={theme.spacing(2)}>
                {items.map((item) => {
                    return (
                        <>
                            <InputLabel>{item.label}</InputLabel>
                            <Select key={item.label} value={item.selectedValue}>
                                {...item.options}
                            </Select>
                        </>
                    );
                })}
            </Stack>
        </Stack>
    );
}
