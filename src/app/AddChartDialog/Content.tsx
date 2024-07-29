import UIStrings from '@/utils/UIStrings';
import { DialogContent, Stack, Autocomplete, TextField, useTheme, Typography } from '@mui/material';
import ChartLabelsEditWithBlock from './ChartLabelsEditWithBlock';
import Link from 'next/link';
import { fredSiteUrl } from '@/AppSettings';
import { useAddChartDialogContext } from './useAddChartDialogContext';

export default function Content(): JSX.Element {
    const theme = useTheme();
    const { searchLoading, options, onSearchChange, onAutocompleteChange, onInputChange } = useAddChartDialogContext();

    return (
        <DialogContent>
            <Stack direction="column" spacing={theme.spacing(2)} paddingY={theme.spacing(2)}>
                <Stack direction="column">
                    <Typography variant="caption">{UIStrings.SearchInstruction}</Typography>
                    <Typography variant="caption">{`${UIStrings.DataIsProvidedBy}`}</Typography>
                    <Link href={fredSiteUrl} target="_blank" style={{ width: 'fit-content' }}>
                        {fredSiteUrl}
                    </Link>
                </Stack>
                <Autocomplete
                    loading={searchLoading}
                    renderInput={(props) => (
                        <TextField
                            data-cy="chartAutocomplete"
                            onChange={onSearchChange}
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
