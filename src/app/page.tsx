'use client';
import { Chart, registerables } from 'chart.js';
import 'chartjs-adapter-date-fns';
import { ChartContext } from '@/State/useChartContext';
import useChartContextValue from '@/State/useChartContextValue';
import PageLayout from './PageLayout';

Chart.register(...registerables);

export default function Home(): JSX.Element {
    const value = useChartContextValue();

    return (
        <ChartContext.Provider value={value}>
            <PageLayout />
        </ChartContext.Provider>
    );
}
