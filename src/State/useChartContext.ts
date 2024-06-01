import { Chart } from '@/Models/Chart';
import React, { createContext, useContext } from 'react';

// Define the shape of your chart context
export interface ChartContextType {
    open: boolean;
    charts: Array<Chart>;
    selectedChart: Chart | null;
    openDialog: () => void;
    closeDialog: () => void;

    addChart: (chart: Chart) => Promise<void>;
    selectChart: (id: string) => void;
    updateChart: (chart: Chart) => void;
}

// Create the chart context
export const ChartContext = createContext<ChartContextType | undefined>(undefined);

// Create a custom hook to access the chart context
export const useChartContext = (): ChartContextType => {
    const context = useContext(ChartContext);
    if (!context) {
        throw new Error('useChartContext must be used within a ChartProvider');
    }
    return context;
};