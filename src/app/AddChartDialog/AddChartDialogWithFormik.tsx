import { Formik, FormikHelpers } from 'formik';
import AddChartDialog from './AddChartDialog';
import useChartValidationSchema from '@/FormValidation/useChartValidationSchema';
import { Chart, DefaultChart, Frequencies } from '@/Models/Chart';
import { useChartContext } from '@/State/useChartContext';
import { stringToFrequency } from '@/utils/UIStringsMapping';
import { ChartOption, useAddChartDialogContext } from './useAddChartDialogContext';
import { v4 as uuid4 } from 'uuid';

interface ChartFormValues {
    chartType: ChartOption;
    title: string;
    xLabel: string;
    yLabel: string;
}

export default function AddChartDialogWithFormik(): JSX.Element {
    const schema = useChartValidationSchema();
    const { closeDialog, addChart } = useChartContext();
    const { dispose, selectedChart } = useAddChartDialogContext();

    const submit = async (values: ChartFormValues, actions: FormikHelpers<ChartFormValues>) => {
        const frequencies: Array<Frequencies> = ['d', 'w', 'm', 'q', 'sa', 'a'];

        while (frequencies[0] !== stringToFrequency(values.chartType.minFrequency)) {
            frequencies.shift();
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
            minFrequency: frequencies[0],
        };
        await addChart(chart);

        actions.setSubmitting(false);
        dispose();
        actions.resetForm();
        closeDialog();
    };

    const initialValues = {
        chartType: selectedChart,
        title: selectedChart?.title || '',
        xLabel: selectedChart?.xLabel || '',
        yLabel: selectedChart?.yLabel || '',
    };

    return (
        <Formik initialValues={initialValues} onSubmit={submit} validationSchema={schema} enableReinitialize>
            <AddChartDialog />
        </Formik>
    );
}
