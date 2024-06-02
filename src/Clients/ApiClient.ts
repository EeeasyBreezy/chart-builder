import { ObservationDTO } from '@/DTO/ObservationDTO';
import { SeriesDTO } from '@/DTO/SeriesDTO';
import { Units, Frequencies, Aggregations } from '@/Models/Chart';
import axios from 'axios';
import ObservationsQueryStringBuilder from './Builders/ObservationsQueryStringBuilder';
import { Page } from '@/DTO/Page';
import SearchQueryStringBuilder from './Builders/SearchQueryStringBuilder';

export default class ApiClient {
    baseUrl: string;

    constructor() {
        this.baseUrl = process.env.API_URL || '';
    }

    async getSeries(id: string): Promise<SeriesDTO> {
        const response = await axios.get(`${this.baseUrl}/api/series?id=${id}`);
        const series = response.data;
        return series;
    }

    async getObservations(
        id: string,
        unit: Units,
        frequency: Frequencies,
        aggregate?: Aggregations,
    ): Promise<Array<ObservationDTO>> {
        const queryString = new ObservationsQueryStringBuilder()
            .withId(id)
            .withUnits(unit)
            .withFrequencies(frequency)
            .withAggregate(aggregate)
            .build();
        const response = await axios.get(`${this.baseUrl}/api/observations?${queryString}`);
        const observations = response.data;
        return observations;
    }

    async search(text: string, limit: number): Promise<Array<Page<SeriesDTO>>>
    {
        const query = new SearchQueryStringBuilder()
            .withSearch(text)
            .withLimit(limit)
            .build();
        const response = await axios.get(`${this.baseUrl}/api/search?${query}`);
        return response.data;
    }
}
