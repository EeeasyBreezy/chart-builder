import { SeriesDTO } from "@/DTO/SeriesDTO";
import axios from "axios";

export default class ApiClient {
    baseUrl: string;

    constructor() {
        this.baseUrl = process.env.API_URL || "";
    }

    async getSeries(id: string): Promise<SeriesDTO> {
        const response = await axios.get(`${this.baseUrl}/api/series?id=${id}`);
        const series = response.data;
        return series;
    }
}