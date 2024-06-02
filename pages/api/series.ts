import { fredApikey } from '@/AppSettings';
import SeriesFredClient from '@/Clients/SeriesFredClient';
import type { NextApiRequest, NextApiResponse } from 'next';

// eslint-disable-next-line consistent-return
export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    if (req.method !== 'GET') {
        return res.status(405).json({ message: 'Method not allowed' });
    }

    const { id } = req.query;

    if (id == null || id === '') {
        return res.status(400).json({ message: "'id' parameter is invalid" });
    }

    const client = new SeriesFredClient(fredApikey);
    const series = await client.getSeries(id as string);

    return res.status(200).json(series);
}
