import { Dialog } from '@mui/material';
import { Formik, Form, FormikHelpers } from 'formik';
import { Chart, DefaultChart, Frequencies } from '@/Models/Chart';
import useChartValidationSchema from '@/FormValidation/useChartValidationSchema';
import { v4 as uuid4 } from 'uuid';
import { useChartContext } from '@/State/useChartContext';
import Title from './Title';
import Content from './Content';
import Actions from './Actions';
import { ChartOption, useAddChartDialogContext } from './useAddChartDialogContext';
import { stringToFrequency } from '@/utils/UIStringsMapping';

interface FormPlotValues {
    chartType: ChartOption;
    title: string;
    xLabel: string;
    yLabel: string;
}

export default function AddChartDialog(): JSX.Element {
    const schema = useChartValidationSchema();
    const { open, closeDialog, addChart } = useChartContext();
    const { selectedChart, dispose } = useAddChartDialogContext();

    const submit = async (values: FormPlotValues, actions: FormikHelpers<FormPlotValues>) => {
        actions.setSubmitting(true);

        const frequencies: Array<Frequencies> = ['d', 'w', 'm', 'q', 'sa', 'a'];
        while (frequencies[0] !== stringToFrequency(values.chartType.minFrequency)) {
            frequencies.shift();
            console.log(frequencies);
        }

        const chart: Chart = {
            ...DefaultChart,
            id: uuid4(),
            chartTypeId: values.chartType.id,
            title: values.title,
            xLabel: values.xLabel,
            yLabel: values.yLabel,
            frequencies,
            units: ['lin', 'chg', 'pch', 'pca', 'log'],
            aggregations: ['sum', 'avg', 'eop'],
            currentUnit: 'lin',
            currentFrequency: frequencies[0],
        };

        await addChart(chart);

        actions.setSubmitting(false);
        dispose();
        actions.resetForm();
        closeDialog();
    };

    const initialValues = {
        chartType: selectedChart,
        title: selectedChart.title,
        xLabel: selectedChart.xLabel,
        yLabel: selectedChart.yLabel,
    };

    return (
        <Dialog open={open} fullWidth maxWidth="sm" onClose={closeDialog}>
            <Formik
                onSubmit={submit}
                initialValues={initialValues}
                validationSchema={schema}
                validateOnMount
                enableReinitialize
            >
                <Form>
                    <Title />
                    <Content />
                    <Actions />
                </Form>
            </Formik>
        </Dialog>
    );
}
