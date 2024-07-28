import { ChangeEvent, SyntheticEvent, useState } from 'react';
import { ChartOption, useAddChartDialogContext } from './useAddChartDialogContext';
import { AutocompleteInputChangeReason } from '@mui/material';
import { useApiClient } from '@/Clients/Hooks';
import { Frequencies } from '@/Models/Chart';
import { useQuery } from '@tanstack/react-query';

interface UseContentAPI {
    options: Array<ChartOption>;
    searchText: string;
    isLoading: boolean;
    onTextChange: (event: ChangeEvent<HTMLInputElement>) => void;
    onAutocompleteChange: (event: SyntheticEvent, newValue: ChartOption | null) => Promise<void>;
    onInputChange: (event: SyntheticEvent, value: string, reason: AutocompleteInputChangeReason) => void;
}

function useContent(): UseContentAPI {
    const [searchText, setSearchText] = useState<string>('');
    const { selectChart, cleanChart } = useAddChartDialogContext();
    const onTextChange = async (event: ChangeEvent<HTMLInputElement>) => setSearchText(event.target.value);
    const client = useApiClient();

    const query = useQuery({
        queryKey: ['search', searchText],
        queryFn: async () => {
            const dto = await client.search(searchText, 10);
            return dto.data.map((x) => ({
                id: x.id,
                title: x.title,
                minFrequency: x.frequency as Frequencies,
                xLabel: 'Date',
                yLabel: x.units,
            }));
        },
        enabled: searchText.length >= 3,
    });
    const options = query.data ?? [];
    const isLoading = query.isLoading;

    const onAutocompleteChange = async (event: SyntheticEvent, newValue: ChartOption | null) => {
        if (newValue == null) {
            cleanChart();
            return;
        }
        await selectChart(newValue.id);
    };

    const onInputChange = async (event: SyntheticEvent, value: string, reason: AutocompleteInputChangeReason) => {
        if (reason === 'clear' || reason === 'reset') {
            setSearchText('');
        }
    };

    return {
        options,
        searchText,
        isLoading,
        onTextChange,
        onAutocompleteChange,
        onInputChange,
    };
}

export default useContent;