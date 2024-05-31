import { FormikDropdown } from '@/Components/FormikDropDown';
import FormikTextField from '@/Components/FormikTextField';
import UIStrings from '@/utils/UIStrings';
import { Stack, useTheme } from '@mui/material';
import useChartOptions from './useChartOptions';

export default function DialogBody(): JSX.Element {
    const theme = useTheme();
    const options = useChartOptions();

    return (
        <Stack direction="column" spacing={theme.spacing(2)} paddingY={theme.spacing(2)}>
            <FormikDropdown label={`${UIStrings.Measurement}*`} name="chartType" options={options} />
            <FormikTextField label={`${UIStrings.Title}*`} name="title" />
            <FormikTextField label={`${UIStrings.XAxis}*`} name="xAxis" />
            <FormikTextField label={`${UIStrings.YAxis}*`} name="yAxis" />
        </Stack>
    );
}
