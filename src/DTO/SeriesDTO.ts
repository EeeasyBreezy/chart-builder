export interface SeriesDTO {
    id: string;
    observation_start: string;
    observation_end: string;
    title: string;
    frequency: string;
    units: string;
}

export const DefaultSeriesDTO: SeriesDTO = {
    id: '',
    observation_start: '',
    observation_end: '',
    title: '',
    frequency: '',
    units: '',
};
