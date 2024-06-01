import { FormControlLabel, Checkbox, Typography } from '@mui/material';

interface LabeledCheckboxProps {
    label: string;
    onChange: (event: React.ChangeEvent<HTMLInputElement>, checked: boolean) => void;
    checked: boolean;
}

export default function LabeledCheckbox({ label, onChange, checked }: LabeledCheckboxProps): JSX.Element {
    return (
        <FormControlLabel
            control={<Checkbox onChange={onChange} checked={checked} />}
            label={<Typography variant="body2">{label}</Typography>}
        />
    );
}
