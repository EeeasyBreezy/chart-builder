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

    const addChart = async (chart: Chart): Promise<void> => {
        setCharts([chart, ...charts]);
    };

    return {
        open,
        openDialog,
        closeDialog,
        addChart,
    };
}