import UIStrings from '@/utils/UIStrings';
import { CloseOutlined } from '@mui/icons-material';
import { LoadingButton } from '@mui/lab';
import { DialogTitle, Typography, IconButton, DialogContent, DialogActions, useTheme, Dialog } from '@mui/material';
import { Formik, Form, FormikHelpers } from 'formik';
import DialogBody from './DialogContent';
import { Chart, DefaultChart } from '@/Models/Chart';
import useChartValidationSchema from '@/FormValidation/useChartValidationSchema';
import { v4 as uuid4 } from 'uuid';
import { useChartContext } from '@/State/useChartContext';

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
                {({ isValid, isSubmitting }) => (
                    <Form>
                        <DialogTitle>
                            <Typography>{UIStrings.AddChart}</Typography>
                            <IconButton
                                style={{
                                    position: 'absolute',
                                    right: theme.spacing(1),
                                    top: theme.spacing(1),
                                    color: theme.palette.grey[500],
                                }}
                                onClick={closeDialog}
                            >
                                <CloseOutlined />
                            </IconButton>
                        </DialogTitle>
                        <DialogContent>
                            <DialogBody />
                        </DialogContent>
                        <DialogActions>
                            <LoadingButton
                                color="primary"
                                size="large"
                                disabled={!isValid}
                                loading={isSubmitting}
                                type="submit"
                                variant="contained"
                            >
                                {UIStrings.Save}
                            </LoadingButton>
                        </DialogActions>
                    </Form>
                )}
            </Formik>
        </Dialog>
    );
}
