import { useState } from "react";
import { ChartContextType } from "./useChartContext";
import { Chart, DefaultChart } from "@/Models/Chart";
import { useApiClient } from "@/Clients/Hooks";

export  default function useChartContextValue(): ChartContextType {
    const [open, setOpen] = useState<boolean>(false);
    const [charts, setCharts] = useState<Array<Chart>>([]);
    const [selectedChart, setSelectedChart] = useState<Chart>(DefaultChart);
    const client = useApiClient();

    const openDialog = (): void => {
        setOpen(true);
    };

    const closeDialog = (): void => {
        setOpen(false);
    };

    const addChart = async (chart: Chart): Promise<void> => {
        const response = await client.getObservations(chart.chartTypeId, chart.currentUnit, chart.currentFrequency);
        const nextChart: Chart = {...chart, points: response.map((o) => ({ x: o.date, y: o.value }))};
        setCharts([nextChart, ...charts]);
    };

    const selectChart = (id: string): void => {
        const chart = charts.find((c) => c.id === id);
        if (chart) {
            setSelectedChart(chart);
        }
    }

    const updateChart = (chart: Chart): void => {
        const index = charts.findIndex((c) => c.id === chart.id);
        if (index !== -1) {
            const nextCharts = [...charts];
            nextCharts[index] = chart;
            setCharts(nextCharts);
            setSelectedChart(chart);
        }
    }

    return {
        open,
        charts,
        selectedChart,
        openDialog,
        closeDialog,
        addChart,
        selectChart,
        updateChart
    };
}