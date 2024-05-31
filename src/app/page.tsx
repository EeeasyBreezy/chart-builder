"use client";
import { useApiClient } from "@/Clients/Hooks";
import { Box } from "@mui/material";
import Backdrop from '@mui/material/Backdrop';
import CircularProgress from '@mui/material/CircularProgress';
import { useEffect, useState } from "react";

export default function Home(): JSX.Element
{
    const client = useApiClient();
    const [series, setSeries] = useState<SeriesDTO>();
    const [loading, setLoading] = useState<boolean>(true);

    useEffect(() => {
        setLoading(true);
        const doLoad = async () => {
            const series = await client.getSeries("GNPCA");
            setSeries(series);
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

    return <Box>
        <h1>{series?.title}</h1>
        <p>{series?.observation_start}</p>
        <p>{series?.observation_end}</p>
        <p>{series?.frequency}</p>
    </Box>
}