import useChartOptions from '@/Dialog/useChartOptions';
import { Aggregations, Frequencies, Units } from '@/Models/Chart';
import { TextFieldProps, FormControl, TextField, MenuItem, FormHelperText } from '@mui/material';
import { useField } from 'formik';
import React from 'react';

export interface DropdownOption<T> {
    id: string;
    value: T;
}

export interface Option {
    id: string;
    name: string;
    frequencies: Array<Frequencies>;
    units: Array<Units>;
    aggregations: Array<Aggregations>;
}

export type FormikDropdownProps = TextFieldProps & {
    name: string;
    options: DropdownOption<Option>[];
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
                        {option.value.name}
                    </MenuItem>
                ))}
            </TextField>
            {meta.touched && meta.error != null && <FormHelperText>{meta.error}</FormHelperText>}
        </FormControl>
    );
};
