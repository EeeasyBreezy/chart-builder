import ChartLabelsEdit from '@/Components/ChartLabelsEdit';
import UIStrings from '@/utils/UIStrings';
import { Button } from '@mui/material';
import { Form, Formik, FormikHelpers, FormikValues } from 'formik';

export default function EditLabelsForm(): JSX.Element {
    return (
        <Formik
            initialValues={undefined}
            onSubmit={function (values: FormikValues, formikHelpers: FormikHelpers<FormikValues>): void | Promise<any> {
                throw new Error('Function not implemented.');
            }}
        >
            <Form>
                <ChartLabelsEdit />
                <Button type="submit">{UIStrings.ApplyChanges}</Button>
            </Form>
        </Formik>
    );
}
