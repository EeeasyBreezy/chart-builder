import UIStrings from '@/utils/UIStrings';
import {
    DialogContent,
    Stack,
    Autocomplete,
    TextField,
    useTheme,
    AutocompleteInputChangeReason,
    Typography,
} from '@mui/material';
import { ChangeEvent, SyntheticEvent } from 'react';
import { ChartOption, useAddChartDialogContext } from './useAddChartDialogContext';
import ChartLabelsEditWithBlock from './ChartLabelsEditWithBlock';

export default function Content(): JSX.Element {
    const theme = useTheme();
    const { options, search, selectChart, searchLoading, cleanChart, dispose } = useAddChartDialogContext();

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
    const onInputChange = async (event: SyntheticEvent, value: string, reason: AutocompleteInputChangeReason) => {
        if (reason === 'clear' || reason === 'reset') {
            dispose();
        }
    };

    return (
        <DialogContent>
            <Stack direction="column" spacing={theme.spacing(2)} paddingY={theme.spacing(2)}>
                <Stack direction="column">
                    <Typography variant="caption">{UIStrings.SearchInstruction}</Typography>
                    <Typography variant="caption">{`${UIStrings.DataIsProvidedBy}`}</Typography>
                </Stack>
                <Autocomplete
                    loading={searchLoading}
                    renderInput={(props) => (
                        <TextField
                            data-cy="chartAutocomplete"
                            onChange={onTextChange}
                            label={`${UIStrings.Dataset}*`}
                            {...props}
                        />
                    )}
                    options={options}
                    getOptionLabel={(option) => option.title}
                    onChange={onAutocompleteChange}
                    onInputChange={onInputChange}
                    clearOnBlur={false}
                />
                <ChartLabelsEditWithBlock />
            </Stack>
        </DialogContent>
    );
}
