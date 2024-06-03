import { FormControl, TextField, TextFieldProps } from '@mui/material';
import { useField } from 'formik';

export type FormikTextFieldBaseProps = TextFieldProps & {
    name: string;
};

export default function FormikTextField({ name, onChange, ...props }: FormikTextFieldBaseProps) {
    const [field, meta, helpers] = useField(name);

    return (
        <FormControl fullWidth error={meta.error != null} variant="outlined">
            <TextField
                {...props}
                name={name}
                fullWidth
                value={field.value}
                error={meta.touched && meta.error != null}
                helperText={meta.error}
                onChange={(event) => {
                    if (!meta.touched) {
                        // perf: causes full formik form rerendering.
                        // Therefore, we only set it once to avoid perf problems.
                        helpers.setTouched(true);
                    }
                    if (onChange) {
                        onChange(event);
                    } else {
                        field.onChange(event);
                    }
                }}
            />
        </FormControl>
    );
}
