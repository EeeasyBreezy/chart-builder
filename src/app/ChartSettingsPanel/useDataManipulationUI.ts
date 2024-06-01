import { DropdownOption } from "@/Components/FormikDropDown";
import { useChartContext } from "@/State/useChartContext";
import UIStrings from "@/utils/UIStrings";
import { aggregationsToUIStrings, frequencytoUIStrings, unitsToUIStrings } from "@/utils/UIStringsMapping";

interface EnumOption {
    id: string;
    name: string;
}

interface DataManipulationUIItem {
    label: string;
    options: Array<DropdownOption<EnumOption>>;
}

export default function useDataManipulationUI(): Array<DataManipulationUIItem> {
    const { selectedChart } = useChartContext();

    return [
        {
            label: UIStrings.Units,
            options: [
                ...selectedChart.units.map(u => {
                    const x: DropdownOption<EnumOption> = {id: u, value: { name: unitsToUIStrings(u), id: u }};
                    return x;
                })
            ]
        },
        {
            label: UIStrings.Frequency,
            options: [
                ...selectedChart.frequencies.map(u => {
                    const x: DropdownOption<EnumOption> = {id: u, value: { name: frequencytoUIStrings(u), id: u }};
                    return x;
                })
            ]
        },
        {
            label: UIStrings.Aggregate,
            options: [
                ...selectedChart.aggregations.map(u => {
                    const x: DropdownOption<EnumOption> = {id: u, value: { name: aggregationsToUIStrings(u), id: u }};
                    return x;
                })
            ]
        }
    ]

}