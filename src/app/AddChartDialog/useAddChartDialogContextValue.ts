import { useApiClient } from '@/Clients/Hooks';
import { useCallback, useState } from 'react';
import { AddChartDialogContextData, ChartOption, DefaultChartOption } from './useAddChartDialogContext';
import { Frequencies } from '@/Models/Chart';
import { debounce } from 'lodash';

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

    const search = useCallback(
        debounce(async (text: string): Promise<void> => {
            if (text.length < 3) {
                setState((prev) => ({ ...prev, options: [], searchLoading: false }));
                return;
            }

            setState((prev) => ({ ...prev, searchLoading: true }));
            const page = await client.search(text, 10);
            const opts = page.data.map((x) => ({
                id: x.id,
                title: x.title,
                minFrequency: x.frequency as Frequencies,
                xLabel: 'Date',
                yLabel: x.units,
            }));
            setState((prev) => ({ ...prev, options: opts, searchLoading: false }));
        }, 500),
        [],
    );

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

    return { options, searchLoading, chartLoading, selectedChart, search, selectChart, cleanChart, dispose };
}
