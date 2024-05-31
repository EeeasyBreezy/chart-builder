export interface SeriesDTO {
    observation_start: string;
    observation_end: string;
    title: string;
    frequency: string;
}

export const DefaultSeriesDTO: SeriesDTO = {
    observation_start: '',
    observation_end: '',
    title: '',
    frequency: '',
};