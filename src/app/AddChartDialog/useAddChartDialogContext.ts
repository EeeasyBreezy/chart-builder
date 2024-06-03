import { Frequencies } from '@/Models/Chart';
import React, { createContext, useContext } from 'react';

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
    minFrequency: "d",
    xLabel: '',
    yLabel: '',
};

export interface AddChartDialogContextData {
    options: Array<ChartOption>;
    searchLoading: boolean; 
    chartLoading: boolean;
    selectedChart: ChartOption;
    search: (search: string) => Promise<void>;
    selectChart: (id: string) => Promise<void>;
    cleanChart: () => void;
}

export const AddChartDialogContext = createContext<AddChartDialogContextData | undefined>(undefined);

export const useAddChartDialogContext = () => {
    const context = useContext(AddChartDialogContext);
    if (!context) {
        throw new Error('useChartDialogContext must be used within a ChartDialogProvider');
    }
    return context;
};