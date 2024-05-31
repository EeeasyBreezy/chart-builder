import { useState } from "react";
import { ChartContextType } from "./useChartContext";
import { Chart } from "@/Models/Chart";
import { useApiClient } from "@/Clients/Hooks";

export  default function useChartContextValue(): ChartContextType {
    const [open, setOpen] = useState<boolean>(false);
    const [charts, setCharts] = useState<Array<Chart>>([]);
    const client = useApiClient();

    const openDialog = (): void => {
        setOpen(true);
    };

    const closeDialog = (): void => {
        setOpen(false);
    };

    const addChart = async (chart: Chart): Promise<void> => {
        const response = await client.getObservations(chart.id, chart.units[0], "a");
        const nextChart: Chart = {...chart, points: response.map((o) => ({ x: o.date, y: o.value }))};
        setCharts([nextChart, ...charts]);
    };

    return {
        open,
        charts,
        openDialog,
        closeDialog,
        addChart,
    };
}