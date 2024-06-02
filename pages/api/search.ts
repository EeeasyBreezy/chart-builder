import { fredApikey } from '@/AppSettings';
import SeriesFredClient from '@/Clients/SeriesFredClient';
import type { NextApiRequest, NextApiResponse } from 'next';

// eslint-disable-next-line consistent-return
export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    if (req.method !== 'GET') {
        return res.status(405).json({ message: 'Method not allowed' });
    }

    const { text, limit } = req.query;

    if (text == null || text.length < 3) {
        return res.status(400).json({ message: "'text' parameter is invalid" });
    }

    if (limit == null || limit === '') {
        return res.status(400).json({ message: "'limit' parameter is invalid" });
    }

    const parsedLimit = parseInt(limit as string);
    if (isNaN(parsedLimit)) {
        return res.status(400).json({ message: "'limit' parameter is not a valid number" });
    }

    const client = new SeriesFredClient(fredApikey);
    const series = await client.search(text as string, parsedLimit);

    return res.status(200).json(series);
}
