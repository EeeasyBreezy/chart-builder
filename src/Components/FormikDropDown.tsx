import { Aggregations, Frequencies, Units } from '@/Models/Chart';
import {
    TextFieldProps,
    FormControl,
    TextField,
    MenuItem,
    FormHelperText,
    InputLabel,
    Select,
    SelectChangeEvent,
} from '@mui/material';
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

    const onChange = (event: SelectChangeEvent<{ value: unknown }>) => {
        const selected = options.find((option) => option.id === event.target.value);
        helpers.setValue(selected);
    };

    return (
        <FormControl fullWidth error={meta.error != null} variant="outlined">
            <InputLabel>{label}</InputLabel>
            <Select onChange={onChange}>
                {options.map((option) => (
                    <MenuItem value={option.id} id={`${option.id}`} key={option.id}>
                        {option.value.name}
                    </MenuItem>
                ))}
            </Select>
            {meta.touched && meta.error != null && <FormHelperText>{meta.error}</FormHelperText>}
        </FormControl>
    );
};
