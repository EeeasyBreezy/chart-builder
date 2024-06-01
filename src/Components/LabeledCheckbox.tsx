import { FormControlLabel, Checkbox, Typography } from '@mui/material';

interface LabeledCheckboxProps {
    label: string;
    onChange: (event: React.ChangeEvent<HTMLInputElement>, checked: boolean) => void;
}

export default function LabeledCheckbox({ label, onChange }: LabeledCheckboxProps): JSX.Element {
    return (
        <FormControlLabel
            control={<Checkbox onChange={onChange} />}
            label={<Typography variant="body2">{label}</Typography>}
        />
    );
}
