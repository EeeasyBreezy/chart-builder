import { useChartContext } from "@/State/useChartContext";
import UIStrings from "@/utils/UIStrings";
import { Chart } from "@/Models/Chart";

interface VisibilityManagementUIItem {
    label: string;
    checked: boolean;
    onChange: (event: React.ChangeEvent<HTMLInputElement>, checked: boolean) => void;
}

export default function useVisibilityManagementUI(): Array<VisibilityManagementUIItem> {
    const { selectedChart, updateChart } = useChartContext();

    return [
        {
            label: UIStrings.HidePoints,
            checked: selectedChart.hidePoints,
            onChange: (event, checked) => {
                const chart: Chart = {
                    ...selectedChart,
                    hidePoints: checked
                }
                updateChart(chart);
            }
        },
        {
            label: UIStrings.HideXLabel,
            checked: selectedChart.hideXLabel,
            onChange: (event, checked) => {
                const chart: Chart = {
                    ...selectedChart,
                    hideXLabel: checked
                }
                updateChart(chart);
            }
        },
        {
            label: UIStrings.HideYLabel,
            checked: selectedChart.hideYLabel,
            onChange: (event, checked) => {
                const chart: Chart = {
                    ...selectedChart,
                    hideYLabel: checked
                }
                updateChart(chart);
            }
        }
    ]
}