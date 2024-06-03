import { Dialog } from '@mui/material';
import { Form, useFormikContext } from 'formik';
import { useChartContext } from '@/State/useChartContext';
import Title from './Title';
import Content from './Content';
import Actions from './Actions';
import { useAddChartDialogContext } from './useAddChartDialogContext';

export default function AddChartDialog(): JSX.Element {
    const { resetForm } = useFormikContext();
    const { dispose } = useAddChartDialogContext();
    const { open, closeDialog } = useChartContext();

    const closeWrapper = () => {
        resetForm();
        dispose();
        closeDialog();
    };

    return (
        <Dialog open={open} fullWidth maxWidth="sm" onClose={closeWrapper}>
            <Form>
                <Title />
                <Content />
                <Actions />
            </Form>
        </Dialog>
    );
}
