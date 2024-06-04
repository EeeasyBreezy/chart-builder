import UIStrings from '@/utils/UIStrings';
import { LoadingButton } from '@mui/lab';
import { DialogActions } from '@mui/material';
import { useFormikContext } from 'formik';

export default function Actions(): JSX.Element {
    const { isSubmitting } = useFormikContext();

    return (
        <DialogActions>
            <LoadingButton color="primary" size="large" loading={isSubmitting} type="submit" variant="contained">
                {UIStrings.Save}
            </LoadingButton>
        </DialogActions>
    );
}
