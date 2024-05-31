import { fredApikey } from '@/AppSettings';
import SeriesFredClient from '@/Clients/Fred/SeriesFredClient';
import { Aggregations, Frequencies, Units } from '@/Models/Chart';
import type { NextApiRequest, NextApiResponse } from 'next';

// eslint-disable-next-line consistent-return
export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    if (req.method !== 'GET') {
        return res.status(405).json({ message: 'Method not allowed' });
    }

    const { id, aggregate, frequency, unit } = req.query;

    if(id == null || id === "") {
        return res.status(400).json({ message: "'id' parameter is invalid" });
    }

    if(aggregate == null || aggregate === "") {
        return res.status(400).json({ message: "'aggregate' parameter is invalid" });
    }

    if(frequency == null || frequency === "") {
        return res.status(400).json({ message: "'frequency' parameter is invalid" });
    }

    if(unit == null || unit === "") {
        return res.status(400).json({ message: "'unit' parameter is invalid" });
    }

    const client = new SeriesFredClient(fredApikey);
    const series = await client.getObservations(id as string, unit as Units, frequency as Frequencies, aggregate as Aggregations);

    return res.status(200).json(series);
}
