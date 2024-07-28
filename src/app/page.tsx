'use client';
import { Chart, registerables, Filler } from 'chart.js';
import 'chartjs-adapter-date-fns';
import { ChartContext } from '@/State/useChartContext';
import useChartContextValue from '@/State/useChartContextValue';
import PageLayout from './PageLayout';
import { useEffect } from 'react';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';

Chart.register(...registerables, Filler);

export default function Home(): JSX.Element {
    const value = useChartContextValue();

    useEffect(() => {
        // Set overflow: hidden on the body when the component mounts
        document.body.style.overflow = 'hidden';

        // Clean up by removing the style when the component unmounts
        return () => {
            document.body.style.overflow = '';
        };
    }, []);

    const client = new QueryClient();

    return (
        <QueryClientProvider client={client}>
            <ChartContext.Provider value={value}>
                <PageLayout />
            </ChartContext.Provider>
        </QueryClientProvider>
    );
}
