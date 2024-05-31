import UIStrings from '@/utils/UIStrings';
import {
    Button,
    Dialog,
    DialogActions,
    DialogContent,
    DialogTitle,
    Stack,
    Typography,
    useTheme,
    IconButton,
} from '@mui/material';
import DialogBody from './DialogContent';
import { Form, Formik, FormikHelpers } from 'formik';
import { CloseOutlined } from '@mui/icons-material';

interface AddChartDialogProps {
    open: boolean;
    onClose: () => void;
}

interface FormPlotValues {
    title: string;
    xAxis: string;
    yAxis: string;
}

const defaultFormValues: FormPlotValues = {
    title: '',
    xAxis: '',
    yAxis: '',
};

export default function AddChartDialog({ open, onClose }: AddChartDialogProps): JSX.Element {
    const theme = useTheme();

    const submit = async (values: FormPlotValues, actions: FormikHelpers<FormPlotValues>) => {};

    return (
        <Dialog open={open} fullWidth maxWidth="sm" onClose={onClose}>
            <Formik onSubmit={submit} initialValues={defaultFormValues}>
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
                        <Button color="primary" size="large">
                            {UIStrings.Save}
                        </Button>
                    </DialogActions>
                </Form>
            </Formik>
        </Dialog>
    );
}
