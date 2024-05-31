'use client';
import { useApiClient } from '@/Clients/Hooks';
import { ObservationDTO } from '@/DTO/ObservationDTO';
import { DefaultSeriesDTO, SeriesDTO } from '@/DTO/SeriesDTO';
import { Box } from '@mui/material';
import Backdrop from '@mui/material/Backdrop';
import CircularProgress from '@mui/material/CircularProgress';
import { useEffect, useState } from 'react';
import { Line } from 'react-chartjs-2';
import 'chartjs-adapter-date-fns';
import { Chart, registerables } from 'chart.js';
import LineChart from '@/Components/LineChart';
import Point from '@/Models/Point';
Chart.register(...registerables);

export default function Home(): JSX.Element {
    const client = useApiClient();
    const [series, setSeries] = useState<SeriesDTO>(DefaultSeriesDTO);
    const [observations, setObservations] = useState<Array<ObservationDTO>>([]);
    const [loading, setLoading] = useState<boolean>(true);

    useEffect(() => {
        setLoading(true);
        const doLoad = async () => {
            const series = await client.getSeries('GNPCA');
            const observations = await client.getObservations('GNPCA');
            setSeries(series);
            setObservations(observations);
            setLoading(false);
        };
        doLoad();
    }, []);

    if (loading) {
        return (
            <Backdrop open={loading}>
                <CircularProgress color="inherit" />
            </Backdrop>
        );
    }

    return (
        <Box>
            <h1>{series.title}</h1>
            <p>{series.observation_start}</p>
            <p>{series.observation_end}</p>
            <p>{series.frequency}</p>

            <LineChart
                title={series.title}
                xLabel="Date"
                yLabel={series.title}
                points={observations.map((o) => {
                    const date = new Date(o.date);
                    const formattedDate = `${date.getFullYear()}-${date.getMonth()}-${date.getDate()}`;
                    const p: Point = { x: formattedDate, y: o.value };
                    return p;
                })}
                xAxisColor="blue"
                yAxisColor="green"
                showPoints
            />
        </Box>
    );
}
