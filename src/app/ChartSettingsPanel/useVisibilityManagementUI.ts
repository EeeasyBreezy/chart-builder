import { useChartContext } from "@/State/useChartContext";
import UIStrings from "@/utils/UIStrings";
import { Chart } from "@/Models/Chart";

interface VisibilityManagementUIItem {
    label: string;
    onChange: (event: React.ChangeEvent<HTMLInputElement>, checked: boolean) => void;
}

export default function useVisibilityManagementUI(): Array<VisibilityManagementUIItem> {
    const { selectedChart, updateChart } = useChartContext();

    return [
        {
            label: UIStrings.HidePoints,
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