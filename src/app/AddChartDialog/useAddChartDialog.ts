import { useApiClient } from "@/Clients/Hooks";
import { AutocompleteOption } from "@/Components/FormikAutocomplete";
import { useState } from "react";

interface UseAddChartDialog {
    options: Array<AutocompleteOption>;
    search: (search: string) => Promise<void>;
}

export default function useAddChartDialog(): UseAddChartDialog {
    const [options, setOptions] = useState<Array<AutocompleteOption>>([]);
    const client = useApiClient();

    async function search(search: string): Promise<void> {
        if(search.length < 3) {
            setOptions([]);
            return;
        }
        const data = await client.search(search, 10);
        setOptions(data.data.map((x) => ({ label: x.title, id: x.id })));
    }

    return { options, search };
} 