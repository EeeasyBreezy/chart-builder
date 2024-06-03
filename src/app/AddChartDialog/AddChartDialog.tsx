import { useTheme, Dialog } from '@mui/material';
import { Formik, Form, FormikHelpers } from 'formik';
import { Chart, DefaultChart } from '@/Models/Chart';
import useChartValidationSchema from '@/FormValidation/useChartValidationSchema';
import { v4 as uuid4 } from 'uuid';
import { useChartContext } from '@/State/useChartContext';
import Title from './Title';
import Content from './Content';
import Actions from './Actions';

interface FormPlotValues {
    chartType: DropdownOption<Option>;
    title: string;
    xLabel: string;
    yLabel: string;
}

const defaultFormValues: FormPlotValues = {
    chartType: { id: '', value: { id: '', name: '', frequencies: [], units: [], aggregations: [] } },
    title: '',
    xLabel: '',
    yLabel: '',
};

export default function AddChartDialog(): JSX.Element {
    const theme = useTheme();
    const schema = useChartValidationSchema();
    const { open, closeDialog, addChart } = useChartContext();

    const submit = async (values: FormPlotValues, actions: FormikHelpers<FormPlotValues>) => {
        actions.setSubmitting(true);

        const chart: Chart = {
            ...DefaultChart,
            id: uuid4(),
            chartTypeId: values.chartType.id,
            title: values.title,
            xLabel: values.xLabel,
            yLabel: values.yLabel,
            frequencies: values.chartType.value.frequencies,
            units: values.chartType.value.units,
            aggregations: values.chartType.value.aggregations,
        };

        await addChart(chart);

        actions.setSubmitting(false);
        closeDialog();
    };

    return (
        <Dialog open={open} fullWidth maxWidth="sm" onClose={closeDialog}>
            <Formik onSubmit={submit} initialValues={defaultFormValues} validationSchema={schema} validateOnMount>
                <Form>
                    <Title />
                    <Content />
                    <Actions />
                </Form>
            </Formik>
        </Dialog>
    );
}
