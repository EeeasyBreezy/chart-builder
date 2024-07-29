import { useApiClient } from "@/Clients/Hooks";
import { Frequencies } from "@/Models/Chart";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { debounce } from "lodash";
import { useState, useEffect } from "react";

export function useSearchQuery(search: string) {
    const client = useApiClient();
    const [debouncedSearch, setDebouncedSearch] = useState(search);

    // Debounce the search input
    useEffect(() => {
        const handler = debounce(() => {
            setDebouncedSearch(search);
        }, 300); // Adjust the debounce delay as needed

        handler();

        return () => {
            handler.cancel();
        };
    }, [search]);

    return useQuery({
        queryKey: ['search', debouncedSearch],
        queryFn: async ({ queryKey, signal }) => {
            const [, search] = queryKey;
            const dto = await client.search(search as string, 10, { signal });
            return dto.data.map((x) => ({
                id: x.id,
                title: x.title,
                minFrequency: x.frequency as Frequencies,
                xLabel: 'Date',
                yLabel: x.units,
            }));
        },
        enabled: debouncedSearch.length >= 3,
    });
}

export function useSelectChartMutation() {
    const client = useApiClient ();
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: async (id: string) => {
            const series = await client.getSeries(id);
            return {
                id: series.id,
                title: series.title,
                minFrequency: series.frequency as Frequencies,
                xLabel: 'Date',
                yLabel: series.units,
            };
        },
        onSuccess: () => queryClient.invalidateQueries({ queryKey: 'search' as any, exact: true }),
    });
}