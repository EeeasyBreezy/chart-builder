import ChartLabelsEdit from '@/Components/ChartLabelsEdit';
import useChartValidationSchema from '@/FormValidation/useChartValidationSchema';
import { Chart } from '@/Models/Chart';
import { useChartContext } from '@/State/useChartContext';
import UIStrings from '@/utils/UIStrings';
import { Button, Stack, useTheme } from '@mui/material';
import { Form, Formik, FormikHelpers } from 'formik';

interface EditChartValues {
    title: string;
    xLabel: string;
    yLabel: string;
}

export default function EditLabelsForm(): JSX.Element {
    const { selectedChart, updateChart } = useChartContext();
    const theme = useTheme();
    const schema = useChartValidationSchema();

    const submit = (values: EditChartValues, helpers: FormikHelpers<EditChartValues>) => {
        const chart: Chart = {
            ...selectedChart!,
            ...values,
        };
        updateChart(chart);
    };

    return (
        <Formik
            initialValues={{
                title: selectedChart?.title || '',
                xLabel: selectedChart?.xLabel || '',
                yLabel: selectedChart?.yLabel || '',
            }}
            onSubmit={submit}
            enableReinitialize
        >
            <Form>
                <Stack direction="column" spacing={theme.spacing(2)}>
                    <ChartLabelsEdit />
                    <Button
                        type="submit"
                        variant="contained"
                        color="primary"
                        sx={{
                            alignSelf: 'flex-end',
                        }}
                    >
                        {UIStrings.ApplyChanges}
                    </Button>
                </Stack>
            </Form>
        </Formik>
    );
}
