import { useState } from "react";
import { ChartContextType } from "./useChartContext";
import { Chart, DefaultChart } from "@/Models/Chart";
import { useApiClient } from "@/Clients/Hooks";

export  default function useChartContextValue(): ChartContextType {
    const [open, setOpen] = useState<boolean>(false);
    const [charts, setCharts] = useState<Record<string, Chart>>({});
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

        setCharts({[chart.id]: nextChart, ...charts});
    };

    const selectChart = (id: string): void => {
        const chart = charts[id];
        if (chart) {
            setSelectedChart(chart);
        }
    }

    const updateChart = (chart: Chart): void => {
        const existingChart = charts[chart.id];
        if (existingChart) {
            let nextCharts = {...charts};
            nextCharts[chart.id] = chart;
            setCharts(nextCharts);
            if(chart.id === selectedChart.id) {
                setSelectedChart(chart);
            }
        }
    }

    const reloadChart = async (chart: Chart): Promise<void> => {
        let nextChart = {...chart, chartLoading: true};
        updateChart(nextChart);
        const response = await client.getObservations(chart.chartTypeId, chart.currentUnit, chart.currentFrequency, chart.currentAggregation);
        nextChart = {...chart, chartLoading: false, points: response.map((o) => ({ x: o.date, y: o.value }))};
        updateChart(nextChart);
    }

    return {
        open,
        charts: Object.values(charts),
        selectedChart,

        openDialog,
        closeDialog,
        addChart,
        selectChart,
        updateChart,
        reloadChart
    };
}