import { FormikDropdown } from '@/Components/FormikDropDown';
import UIStrings from '@/utils/UIStrings';
import { Stack, useTheme } from '@mui/material';
import useChartOptions from './useChartOptions';
import ChartLabelsEdit from '@/Components/ChartLabelsEdit';

export default function DialogBody(): JSX.Element {
    const theme = useTheme();
    const options = useChartOptions();

    return (
        <Stack direction="column" spacing={theme.spacing(2)} paddingY={theme.spacing(2)}>
            <FormikDropdown label={`${UIStrings.Measurement}*`} name="chartType" options={options} />
            <ChartLabelsEdit />
        </Stack>
    );
}
