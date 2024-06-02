import { Backdrop, CircularProgress } from '@mui/material';

export default function LoadingOverlay(): JSX.Element {
    return (
        <Backdrop open>
            <CircularProgress color="inherit" />
        </Backdrop>
    );
}
