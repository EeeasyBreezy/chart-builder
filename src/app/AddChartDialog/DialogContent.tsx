import UIStrings from '@/utils/UIStrings';
import { Autocomplete, Stack, TextField, useTheme } from '@mui/material';
import ChartLabelsEdit from '@/Components/ChartLabelsEdit';
import useAddChartDialog from './useAddChartDialog';
import { ChangeEvent } from 'react';

export default function DialogBody(): JSX.Element {
    const theme = useTheme();
    const { options, search, selectChart, searchLoading, cleanChart } = useAddChartDialog();

    return (
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
                getOptionLabel={(option) => option.name}
                onChange={async (event, newValue) => {
                    if (newValue == null) {
                        cleanChart();
                        return;
                    }
                    await selectChart(newValue.id);
                }}
            />
            <ChartLabelsEdit />
        </Stack>
    );
}
