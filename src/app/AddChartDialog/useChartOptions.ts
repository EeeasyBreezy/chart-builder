import { DropdownOption, Option } from "@/Components/FormikDropDown";

export default function useChartOptions(): Array<DropdownOption<Option>> {
   return [{
        id: "PSAVERT",
        value: {
            id: "PSAVERT",
            name: "Personal savings rates",
            frequencies: ["m", "q", "sa", "a"],   
            units: ["lin", "chg", "pch", "pca", "log"],
            aggregations: []
        }
    },
    {
        id: "SP500",
        value: {
            id: "SP500",
            name: "S&P 500",
            frequencies: ["d", "m", "q", "sa", "a"],   
            units: ["lin", "chg", "pch", "pca", "log"],
            aggregations: []
        }
    }]
}