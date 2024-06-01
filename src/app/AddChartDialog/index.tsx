import UIStrings from '@/utils/UIStrings';
import { Dialog, DialogActions, DialogContent, DialogTitle, Typography, useTheme, IconButton } from '@mui/material';
import DialogBody from './DialogContent';
import { Form, Formik, FormikHelpers } from 'formik';
import { CloseOutlined } from '@mui/icons-material';
import useChartValidationSchema from '../../Validation/useChartValidationSchema';
import { DropdownOption, Option } from '@/Components/FormikDropDown';
import { useChartContext } from '@/State/useChartContext';
import { Chart, DefaultChart } from '@/Models/Chart';
import { LoadingButton } from '@mui/lab';

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
    const { open, closeDialog, addChart } = useChartContext();
    const schema = useChartValidationSchema();

    const submit = async (values: FormPlotValues, actions: FormikHelpers<FormPlotValues>) => {
        actions.setSubmitting(true);

        const chart: Chart = {
            ...DefaultChart,
            id: values.chartType.id,
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
