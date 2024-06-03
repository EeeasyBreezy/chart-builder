import { Dialog } from '@mui/material';
import { Form } from 'formik';
import { useChartContext } from '@/State/useChartContext';
import Title from './Title';
import Content from './Content';
import Actions from './Actions';

export default function AddChartDialog(): JSX.Element {
    const { open } = useChartContext();

    return (
        <Dialog open={open} fullWidth maxWidth="sm">
            <Form>
                <Title />
                <Content />
                <Actions />
            </Form>
        </Dialog>
    );
}
