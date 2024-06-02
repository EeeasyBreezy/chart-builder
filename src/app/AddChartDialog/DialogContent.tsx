import { FormikDropdown } from '@/Components/FormikDropDown';
import UIStrings from '@/utils/UIStrings';
import { Stack, TextField, useTheme } from '@mui/material';
import ChartLabelsEdit from '@/Components/ChartLabelsEdit';
import FormikAutocomplete from '@/Components/FormikAutocomplete';
import useAddChartDialog from './useAddChartDialog';

export default function DialogBody(): JSX.Element {
    const theme = useTheme();
    // const options = useChartOptions();
    const { options, search } = useAddChartDialog();

    return (
        <Stack direction="column" spacing={theme.spacing(2)} paddingY={theme.spacing(2)}>
            <FormikAutocomplete
                name={'chartType'}
                inputFieldFormikName={'chartType'}
                emptyAutocompleteOption={{ label: '', id: '' }}
                renderInput={(props) => <TextField label={`${UIStrings.Measurement}*`} {...props} />}
                options={options}
                onInputChange={async (event, value) => {
                    await search(value);
                }}
            />
            {/* <FormikDropdown label={`${UIStrings.Measurement}*`} name="chartType" options={options} /> */}
            <ChartLabelsEdit />
        </Stack>
    );
}
