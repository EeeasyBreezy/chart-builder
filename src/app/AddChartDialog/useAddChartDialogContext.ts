import { Frequencies } from '@/Models/Chart';
import { AutocompleteInputChangeReason } from '@mui/material';
import { ChangeEvent, createContext, SyntheticEvent, useContext } from 'react';

export interface ChartOption {
    id: string;
    title: string;
    minFrequency: Frequencies;
    xLabel: string;
    yLabel: string;
}

export const DefaultChartOption: ChartOption = {
    id: '',
    title: '',
    minFrequency: 'd',
    xLabel: '',
    yLabel: '',
};

export interface AddChartDialogContextData {
    options: Array<ChartOption>;
    searchLoading: boolean;
    chartLoading: boolean;
    selectedChart: ChartOption;
    selectChart: (id: string) => Promise<void>;
    cleanChart: () => void;
    dispose: () => void;
    onSearchChange: (event: ChangeEvent<HTMLInputElement>) => void;
    onAutocompleteChange: (event: SyntheticEvent, newValue: ChartOption | null) => void;
    onInputChange: (event: SyntheticEvent, value: string, reason: AutocompleteInputChangeReason) => void;
}

export const AddChartDialogContext = createContext<AddChartDialogContextData | undefined>(undefined);

export const useAddChartDialogContext = () => {
    const context = useContext(AddChartDialogContext);
    if (!context) {
        throw new Error('useChartDialogContext must be used within a ChartDialogProvider');
    }
    return context;
};
