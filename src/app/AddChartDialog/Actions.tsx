import UIStrings from '@/utils/UIStrings';
import { LoadingButton } from '@mui/lab';
import { DialogActions } from '@mui/material';
import { useFormikContext } from 'formik';

export default function Actions(): JSX.Element {
    const { isValid, isSubmitting } = useFormikContext();
    // eslint-disable-next-line no-console
    console.log('isValid', isValid);

    return (
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
    );
}
