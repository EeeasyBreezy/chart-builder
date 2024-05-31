import { DropdownOption, Option } from "@/Components/FormikDropDown";

export default function useChartOptions(): Array<DropdownOption<Option>> {
   return [{
        id: "Personal savings rates",
        value: {
            id: "PSAVERT",
            name: "Personal savings rates",
            frequencies: ["monthly", "quarterly", "semi-annualy", "annualy"],   
            units: ["raw", "percentageChange", "compoundedRateOfChange"],
            aggregations: []
        }
   }]
}