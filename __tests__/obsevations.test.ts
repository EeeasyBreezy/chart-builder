import SeriesFredClient from '@/Clients/SeriesFredClient';
import handler from '../pages/api/observations';
import { NextApiRequest, NextApiResponse } from 'next';
import { RequestMethod, createMocks } from 'node-mocks-http';
import Fred from 'node-fred';

// Mock the SeriesFredClient module
jest.mock('../src/Clients/SeriesFredClient');

// Provide a custom implementation for getObservations
(SeriesFredClient as jest.MockedClass<typeof SeriesFredClient>).mockImplementation(() => {
    return {
        client: {} as Fred,
        getSeries: jest.fn().mockResolvedValue({}),
        getObservations: jest.fn().mockResolvedValue([]),
        search: jest.fn().mockResolvedValue([]),
    };
});

describe('handler', () => {
    function mockArguments(method: RequestMethod, id?: string, frequency?: string, unit?: string, aggregate?: string) {
        return createMocks<NextApiRequest, NextApiResponse>({
            method: method,
            query: {
                id,
                frequency,
                unit,
                aggregate,
            },
        });
    }

    it.each([['CONNECT'], ['DELETE'], ['HEAD'], ['OPTIONS'], ['PATCH'], ['POST'], ['PUT'], ['TRACE']])(
        'Should return 405 for %s method',
        async (method) => {
            const { req, res } = mockArguments(method as RequestMethod, 'test', 'test', 'test', 'test');

            await handler(req, res);
            const response = await JSON.parse(res._getData());

            expect(res.statusCode).toStrictEqual(405);
            expect(response.message).toStrictEqual('Method not allowed');
        },
    );

    it('Should return 400 for missing id', async () => {
        const { req, res } = mockArguments('GET', undefined, 'test', 'test', 'test');

        await handler(req, res);
        const response = await JSON.parse(res._getData());

        expect(res.statusCode).toStrictEqual(400);
        expect(response.message).toStrictEqual("'id' parameter is invalid");
    });

    test('Should return 400 when frequency is empty', async () => {
        const { req, res } = mockArguments('GET', 'test', undefined, 'test', 'test');

        await handler(req, res as unknown as NextApiResponse);
        const response = await JSON.parse(res._getData());

        expect(res.statusCode).toStrictEqual(400);
        expect(response.message).toStrictEqual("'frequency' parameter is invalid");
    });

    test('Should return 400 when unit is empty or null', async () => {
        const { req, res } = mockArguments('GET', 'test', 'test', undefined, 'test');

        await handler(req, res);
        const response = await JSON.parse(res._getData());

        expect(res.statusCode).toStrictEqual(400);
        expect(response.message).toStrictEqual("'unit' parameter is invalid");
    });

    // Add similar tests for missing frequency and unit

    test('Should return 200 and series data for valid request', async () => {
        const { req, res } = mockArguments('GET', 'test', 'test', 'test', 'test');

        await handler(req, res);
        const response = await JSON.parse(res._getData());

        expect(res.statusCode).toStrictEqual(200);
        expect(response).toStrictEqual([]);
    });
});
