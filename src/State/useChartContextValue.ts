import BaseChartProps from "@/Charts/ChartProps";
import { useState } from "react";
import { ChartContextType } from "./useChartContext";
import { Chart } from "@/Models/Chart";

export  default function useChartContextValue(): ChartContextType {
    const [open, setOpen] = useState<boolean>(false);
    const [charts, setCharts] = useState<Array<Chart>>([]);

    const openDialog = (): void => {
        setOpen(true);
    };

    const closeDialog = (): void => {
        setOpen(false);
    };

    const addChart = async (title: string, xAxis: string, yAxis: string): Promise<void> => {
        const response = await fetch('https://api.example.com/charts', {
            method: 'POST',
            body: JSON.stringify({ title, xAxis, yAxis }),
            headers: {
                'Content-Type': 'application/json',
            },
        });

        if (response.ok) {
            const newChart = await response.json();
            setCharts([...charts, newChart]);
        }
    };

    return {
        open,
        openDialog,
        closeDialog,
        addChart,
    };
}