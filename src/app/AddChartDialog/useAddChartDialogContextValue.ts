import { ChangeEvent, SyntheticEvent, useState } from 'react';
import { AddChartDialogContextData, ChartOption, DefaultChartOption } from './useAddChartDialogContext';
import { useSearchQuery, useSelectChartMutation } from './Queries';
import { AutocompleteInputChangeReason } from '@mui/material';
import { useQueryClient } from '@tanstack/react-query';

export default function useAddChartDialogContextValue(): AddChartDialogContextData {
    const [search, setSearch] = useState('');

    const queryClient = useQueryClient();
    const searchQuery = useSearchQuery(search);
    const selectChartMutation = useSelectChartMutation();

    const selectChart = async (id: string): Promise<void> => { await selectChartMutation.mutateAsync(id) };

    const cleanChart = () => {
        selectChartMutation.reset();
    };

    const dispose = () => {
        selectChartMutation.reset();
    };

    const onSearchChange = (event: ChangeEvent<HTMLInputElement>) => {
        queryClient.cancelQueries({queryKey: "search" as any, exact: true});
        setSearch(event.target.value);
    }

    const onAutocompleteChange = async (event: SyntheticEvent, newValue: ChartOption | null) => {
        if (newValue == null) {
            cleanChart();
            return;
        }
        selectChartMutation.mutate(newValue.id);
    };

    const onInputChange = async (event: SyntheticEvent, value: string, reason: AutocompleteInputChangeReason) => {
        if (reason === 'clear' || reason === 'reset') {
            setSearch('');
        }
    };

    return { options: searchQuery.data || [],
            searchLoading: searchQuery.isLoading,
            chartLoading: selectChartMutation.isPaused, selectedChart: selectChartMutation.data || DefaultChartOption,
            selectChart, cleanChart, dispose, onSearchChange, onAutocompleteChange, onInputChange
        };
}
