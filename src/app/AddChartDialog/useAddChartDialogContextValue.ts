import { useApiClient } from '@/Clients/Hooks';
import { useState } from 'react';
import { AddChartDialogContextData, ChartOption, DefaultChartOption } from './useAddChartDialogContext';
import { Frequencies } from '@/Models/Chart';

interface UseAddChartDialogState {
    options: Array<ChartOption>;
    searchLoading: boolean;
    chartLoading: boolean;
    selectedChart: ChartOption;
}

export default function useAddChartDialogContextValue(): AddChartDialogContextData {
    const [state, setState] = useState<UseAddChartDialogState>({
        options: [],
        searchLoading: false,
        chartLoading: false,
        selectedChart: DefaultChartOption,
    });
    const { options, searchLoading, chartLoading, selectedChart } = state;
    const client = useApiClient();

    const selectChart = async (id: string): Promise<void> => {
        setState((prev) => ({ ...prev, chartLoading: true }));
        const series = await client.getSeries(id);
        setState((prev) => ({
            ...prev,
            chartLoading: false,
            selectedChart: {
                id: series.id,
                title: series.title,
                minFrequency: series.frequency as Frequencies,
                xLabel: 'Date',
                yLabel: series.units,
            },
        }));
    };

    const cleanChart = () => {
        setState((prev) => ({ ...prev, selectedChart: DefaultChartOption }));
    };

    const dispose = () => {
        setState((prev) => ({
            ...prev,
            options: [],
            searchLoading: false,
            chartLoading: false,
            selectedChart: DefaultChartOption,
        }));
    };

    return { options, searchLoading, chartLoading, selectedChart, selectChart, cleanChart, dispose };
}
