import { TextFieldProps, FormControl, TextField, MenuItem, FormHelperText } from '@mui/material';
import { useField } from 'formik';
import React from 'react';

export interface DropdownOption {
    id: string;
    name: string;
}

export type FormikDropdownProps = TextFieldProps & {
    name: string;
    options: DropdownOption[];
    label?: string;
};

export const FormikDropdown = ({ name, options, label, ...props }: FormikDropdownProps) => {
    const [field, meta, helpers] = useField(name);

    return (
        <FormControl fullWidth error={meta.error != null} variant="outlined">
            <TextField
                {...props}
                select
                fullWidth
                name={name}
                value={field.value ?? ''}
                error={meta.touched && meta.error != null}
                onChange={(event: React.ChangeEvent<{ value: unknown }>) => {
                    if (!meta.touched) {
                        helpers.setTouched(true);
                    }
                    field.onChange(event);
                }}
            >
                {options.map((option) => (
                    <MenuItem value={option.id} id={`${option.id}`} key={option.id}>
                        {option.name}
                    </MenuItem>
                ))}
            </TextField>
            {meta.touched && meta.error != null && <FormHelperText>{meta.error}</FormHelperText>}
        </FormControl>
    );
};
