import { FormControl, Autocomplete, AutocompleteProps } from '@mui/material';
import { useField } from 'formik';

export interface AutocompleteOption {
    id: string;
    label: string;
}

export interface FormikAutocompleteProps extends AutocompleteProps<AutocompleteOption, false, true, true> {
    name: string;
    inputFieldFormikName: string;
    emptyAutocompleteOption: AutocompleteOption;
    disabled?: boolean;
    loading?: boolean;
}

export default function FormikAutocompleteBase({
    inputFieldFormikName,
    name,
    emptyAutocompleteOption,
    disabled,
    loading,
    ...props
}: FormikAutocompleteProps) {
    const [field, meta, helpers] = useField(name);
    const [, inputMeta, inputHelpers] = useField(inputFieldFormikName);

    return (
        <FormControl fullWidth error={meta.error != null} variant="outlined">
            <Autocomplete
                {...props}
                disabled={disabled}
                handleHomeEndKeys
                selectOnFocus
                loading={loading}
                value={field.value}
                getOptionLabel={(option) => {
                    return typeof option === 'object' ? option.label : option;
                }}
                onChange={(event, newValue) => {
                    // re-rendering optimization
                    if (!meta.touched) {
                        helpers.setTouched(true);
                    }
                    // In the case when:
                    // - the user does not type anything in the autocomplete field,
                    // - selects an option from the list
                    // - clears it using X button in the end of the field
                    // Formik label field is not set to touched which means that the validation error won't be shown.
                    // We fix it by manually setting label field to touched when the value in autofield changes.
                    // In also covers the case when prefilled value is cleared by the user.
                    // In this case the validation error should be also shown.
                    if (!inputMeta.touched) {
                        inputHelpers.setTouched(true);
                    }
                    helpers.setValue(newValue ?? emptyAutocompleteOption);
                }}
            />
        </FormControl>
    );
}
