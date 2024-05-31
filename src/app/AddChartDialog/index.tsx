import UIStrings from '@/utils/UIStrings';
import {
    Button,
    Dialog,
    DialogActions,
    DialogContent,
    DialogTitle,
    Typography,
    useTheme,
    IconButton,
} from '@mui/material';
import DialogBody from './DialogContent';
import { Form, Formik, FormikHelpers } from 'formik';
import { CloseOutlined } from '@mui/icons-material';
import useValidationSchema from './useValidationSchema';
import { DropdownOption, Option } from '@/Components/FormikDropDown';
import { useChartContext } from '@/State/useChartContext';

interface FormPlotValues {
    chartType: DropdownOption<Option>;
    title: string;
    xAxis: string;
    yAxis: string;
}

const defaultFormValues: FormPlotValues = {
    chartType: { id: '', value: { id: '', name: '', frequencies: [], units: [], aggregations: [] } },
    title: '',
    xAxis: '',
    yAxis: '',
};

export default function AddChartDialog(): JSX.Element {
    const theme = useTheme();
    const { open, closeDialog } = useChartContext();
    const schema = useValidationSchema();

    const submit = async (values: FormPlotValues, actions: FormikHelpers<FormPlotValues>) => {};

    return (
        <Dialog open={open} fullWidth maxWidth="sm" onClose={closeDialog}>
            <Formik
                onSubmit={submit}
                initialValues={defaultFormValues}
                validationSchema={schema}
                isInitialValid={false}
            >
                {({ isValid }) => (
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
                                onClick={onClose}
                            >
                                <CloseOutlined />
                            </IconButton>
                        </DialogTitle>
                        <DialogContent>
                            <DialogBody />
                        </DialogContent>
                        <DialogActions>
                            <Button color="primary" size="large" disabled={!isValid}>
                                {UIStrings.Save}
                            </Button>
                        </DialogActions>
                    </Form>
                )}
            </Formik>
        </Dialog>
    );
}
