import { useState } from "react";
import { ChartContextType } from "./useChartContext";
import { Chart, DefaultChart } from "@/Models/Chart";
import { useApiClient } from "@/Clients/Hooks";

export  default function useChartContextValue(): ChartContextType {
    const [open, setOpen] = useState<boolean>(false);
    const [charts, setCharts] = useState<Record<string, Chart>>({});
    const [selectedChart, setSelectedChart] = useState<Chart>(DefaultChart);
    const [deleteDialogOpen, setDeleteDialogOpen] = useState<boolean>(false);
    const client = useApiClient();

    const openDialog = (): void => {
        setOpen(true);
    };

    const closeDialog = (): void => {
        setOpen(false);
    };

    const openDeleteDialog = (): void => {
        setDeleteDialogOpen(true);
    };

    const closeDeleteDialog = (): void => {
        setDeleteDialogOpen(false);
    };

    const addChart = async (chart: Chart): Promise<void> => {
        const response = await client.getObservations(chart.chartTypeId, chart.currentUnit, chart.currentFrequency);
        const nextChart: Chart = { ...chart, points: response.map((o) => ({ x: o.date, y: o.value })) };

        setCharts((prevCharts) => ({ ...prevCharts, [chart.id]: nextChart }));
    };

    const selectChart = (id: string): void => {
        const chart = charts[id];
        if (chart) {
            setSelectedChart(chart);
        }
    }

    const updateChart = (chart: Chart): void => {
        setCharts((prevCharts) => {
            const existingChart = prevCharts[chart.id];
            if (existingChart) {
                let nextCharts = { ...prevCharts };
                nextCharts[chart.id] = chart;
                if (chart.id === selectedChart.id) {
                    setSelectedChart(chart);
                }
                return nextCharts;
            }
            return prevCharts;
        });
    }

    const reloadChart = async (chart: Chart): Promise<void> => {
        let nextChart = {...chart, chartLoading: true};
        updateChart(nextChart);
        const response = await client.getObservations(chart.chartTypeId, chart.currentUnit, chart.currentFrequency, chart.currentAggregation);
        nextChart = {...chart, chartLoading: false, points: response.map((o) => ({ x: o.date, y: o.value }))};
        updateChart(nextChart);
    }

    const deleteChart = (id: string): void => {
        setCharts((prevCharts) => {
            const nextCharts = { ...prevCharts };
            delete nextCharts[id];
            return nextCharts;
        });
        setDeleteDialogOpen(false);
        setSelectedChart(DefaultChart);
    }

    return {
        open,
        deleteDialogOpen: deleteDialogOpen,
        charts: Object.values(charts),
        selectedChart,

        openDialog,
        closeDialog,
        addChart,
        selectChart,
        updateChart,
        reloadChart,
        deleteChart,

        openDeleteDialog,
        closeDeleteDialog,
    };
}