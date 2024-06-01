import ChartLabelsEdit from '@/Components/ChartLabelsEdit';
import { useChartContext } from '@/State/useChartContext';
import UIStrings from '@/utils/UIStrings';
import { Button, Stack, useTheme } from '@mui/material';
import { Form, Formik } from 'formik';

export default function EditLabelsForm(): JSX.Element {
    const { selectedChart } = useChartContext();
    const theme = useTheme();

    return (
        <Formik
            initialValues={{
                title: selectedChart?.title || '',
                xLabel: selectedChart?.xLabel || '',
                yLabel: selectedChart?.yLabel || '',
            }}
            onSubmit={() => {}}
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
