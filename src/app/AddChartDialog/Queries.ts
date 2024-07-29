import { useApiClient } from "@/Clients/Hooks";
import { Frequencies } from "@/Models/Chart";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { debounce } from "lodash";
import { useEffect, useMemo } from "react";

export function useSearchQuery(search: string) {
    const client = useApiClient();
    const queryClient = useQueryClient();

    // Create a debounced version of the query function
    const debouncedQueryFn = useMemo(() => 
        debounce(async (searchTerm: string) => {
            queryClient.cancelQueries({ queryKey: ['search', searchTerm] });
            const dto = await client.search(searchTerm, 10);
            return dto.data.map((x) => ({
                id: x.id,
                title: x.title,
                minFrequency: x.frequency as Frequencies,
                xLabel: 'Date',
                yLabel: x.units,
            }));
        }, 300), [client, queryClient]);

    useEffect(() => {
        // Call the debounced function whenever the search term changes
        if (search.length >= 3) {
            debouncedQueryFn(search);
        }

        // Cleanup function to cancel the debounced call if the component unmounts or search term changes
        return () => {
            debouncedQueryFn.cancel();
        };
    }, [search, debouncedQueryFn]);

    return useQuery({
        queryKey: ['search', search],
        queryFn: () => debouncedQueryFn(search),
        enabled: false, // Disable automatic query execution
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