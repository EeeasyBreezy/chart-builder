import UIStrings from '@/utils/UIStrings';
import { DialogContent, Stack, Autocomplete, TextField, useTheme } from '@mui/material';
import { ChangeEvent } from 'react';
import { useAddChartDialogContext } from './useAddChartDialogContext';
import ChartLabelsEditWithBlock from './ChartLabelsEditWithBlock';

export default function Content(): JSX.Element {
    const theme = useTheme();
    const { options, search, selectChart, searchLoading, cleanChart } = useAddChartDialogContext();
    return (
        <DialogContent>
            <Stack direction="column" spacing={theme.spacing(2)} paddingY={theme.spacing(2)}>
                <Autocomplete
                    loading={searchLoading}
                    renderInput={(props) => (
                        <TextField
                            onChange={async (event: ChangeEvent<HTMLInputElement>) => {
                                await search(event.target.value);
                            }}
                            label={`${UIStrings.Measurement}*`}
                            {...props}
                        />
                    )}
                    options={options}
                    getOptionLabel={(option) => option.title}
                    onChange={async (event, newValue) => {
                        if (newValue == null) {
                            cleanChart();
                            return;
                        }
                        await selectChart(newValue.id);
                    }}
                />
                <ChartLabelsEditWithBlock />
            </Stack>
        </DialogContent>
    );
}
