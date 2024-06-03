import { useApiClient } from "@/Clients/Hooks";
import { useState } from "react";
import { AddChartDialogContextData, ChartOption, DefaultChartOption } from "./useAddChartDialogContext";
import { Frequencies } from "@/Models/Chart";

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
        selectedChart: DefaultChartOption
    });
    const { options, searchLoading, chartLoading, selectedChart } = state;
    const client = useApiClient();

    const search = async (text: string): Promise<void> => {
        if(text.length < 3) {
            setState({ ...state, options: [], searchLoading: false });
            return;
        }
        setState({ ...state, searchLoading: true });
        const page = await client.search(text, 10);
        const opts = page.data.map(x => ({ id: x.id, title: x.title, minFrequency: x.frequency as Frequencies, xLabel: "Date", yLabel: x.units}));
        setState({ ...state, options: opts, searchLoading: false });
    }

    const selectChart = async (id: string): Promise<void> => {
        setState({ ...state, chartLoading: true });
        const series = await client.getSeries(id);
        setState({
            ...state,
            chartLoading: false,
            selectedChart: {
                id: series.id,
                title: series.title,
                minFrequency: series.frequency as Frequencies,
                xLabel: 'Date',
                yLabel: series.units
            }
        });

    }

    const cleanChart = () => {
        setState({ ...state, selectedChart: DefaultChartOption });
    }
    

    return { options, searchLoading, chartLoading, selectedChart, search, selectChart, cleanChart };
} 