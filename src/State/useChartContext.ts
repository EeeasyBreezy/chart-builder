import React, { createContext, useContext } from 'react';

// Define the shape of your chart context
export interface ChartContextType {
    open: boolean;
    openDialog: () => void;
    closeDialog: () => void;

    addChart: (title: string, xAxis: string, yAxis: string) => Promise<void>;
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