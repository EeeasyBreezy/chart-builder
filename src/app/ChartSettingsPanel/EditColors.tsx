import ColorPicker from '@/Components/ColorPicker';
import UIStrings from '@/utils/UIStrings';
import { Stack, Typography, useTheme } from '@mui/material';
import useEditColorsUI from './useEditColorsUI';
import { useChartContext } from '@/State/useChartContext';
import { ColorResult } from 'react-color';

export default function EditColors(): JSX.Element {
    const theme = useTheme();
    const pickers = useEditColorsUI();
    const { selectedChart, updateChart } = useChartContext();

    const updateChartFill = (color: ColorResult) => {
        updateChart({ ...selectedChart, fillColor: color.hex });
    };

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
            <Stack direction="row" spacing={theme.spacing(2)} justifyContent="center">
                {selectedChart.type === 'area' && (
                    <ColorPicker
                        label={UIStrings.AreaFill}
                        color={selectedChart.fillColor || 'red'}
                        onChange={updateChartFill}
                        data-cy="areaFill"
                    />
                )}
            </Stack>
        </Stack>
    );
}
