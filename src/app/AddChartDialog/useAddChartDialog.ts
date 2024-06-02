import { useApiClient } from "@/Clients/Hooks";
import { DefaultSeriesDTO, SeriesDTO } from "@/DTO/SeriesDTO";
import { useState } from "react";

interface AutocompleteOption {
    id: string;
    name: string;
}

interface UseAddChartDialogState {
    options: Array<AutocompleteOption>;
    searchLoading: boolean; 
    chartLoading: boolean;
    selectedChart: SeriesDTO;
}

interface UseAddChartDialog extends UseAddChartDialogState {
    options: Array<AutocompleteOption>;
    search: (search: string) => Promise<void>;
    selectChart: (id: string) => Promise<void>;
    cleanChart: () => void;
}

export default function useAddChartDialog(): UseAddChartDialog {
    const [state, setState] = useState<UseAddChartDialogState>({
        options: [],
        searchLoading: false,
        chartLoading: false,
        selectedChart: DefaultSeriesDTO
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
        const opts = page.data.map(x => ({ id: x.id, name: x.title }));
        setState({ ...state, options: opts, searchLoading: false });
    }

    const selectChart = async (id: string): Promise<void> => {
        setState({ ...state, chartLoading: true });
        const series = await client.getSeries(id);
        setState({ ...state, selectedChart: series, chartLoading: false });
    }

    const cleanChart = () => {
        setState({ ...state, selectedChart: DefaultSeriesDTO });
    }
    

    return { options, searchLoading, chartLoading, selectedChart, search, selectChart, cleanChart };
} 