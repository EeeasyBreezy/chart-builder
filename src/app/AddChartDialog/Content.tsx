import UIStrings from '@/utils/UIStrings';
import { DialogContent, Stack, Autocomplete, TextField, useTheme } from '@mui/material';
import { ChangeEvent, SyntheticEvent } from 'react';
import { ChartOption, useAddChartDialogContext } from './useAddChartDialogContext';
import ChartLabelsEditWithBlock from './ChartLabelsEditWithBlock';

export default function Content(): JSX.Element {
    const theme = useTheme();
    const { options, search, selectChart, searchLoading, cleanChart } = useAddChartDialogContext();

    const onTextChange = async (event: ChangeEvent<HTMLInputElement>) => {
        await search(event.target.value);
    };
    const onAutocompleteChange = async (event: SyntheticEvent, newValue: ChartOption | null) => {
        if (newValue == null) {
            cleanChart();
            return;
        }
        await selectChart(newValue.id);
    };

    return (
        <DialogContent>
            <Stack direction="column" spacing={theme.spacing(2)} paddingY={theme.spacing(2)}>
                <Autocomplete
                    loading={searchLoading}
                    renderInput={(props) => (
                        <TextField onChange={onTextChange} label={`${UIStrings.Measurement}*`} {...props} />
                    )}
                    options={options}
                    getOptionLabel={(option) => option.title}
                    onChange={onAutocompleteChange}
                />
                <ChartLabelsEditWithBlock />
            </Stack>
        </DialogContent>
    );
}
