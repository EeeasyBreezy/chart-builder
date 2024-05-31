import { Aggregations, Frequencies, Units } from "@/Models/Chart";

export default class ObservationsQueryStringBuilder {
    params: URLSearchParams;

    constructor() {
        this.params = new URLSearchParams();
    }

    withId(id: string): ObservationsQueryStringBuilder {
        this.params.append('id', id);
        return this;
    }

    withUnits(units: Units): ObservationsQueryStringBuilder {
        this.params.append('unit', units);
        return this;
    }

    withFrequencies(frequencies: Frequencies): ObservationsQueryStringBuilder {
        this.params.append('frequency', frequencies);
        return this;
    }

    withAggregate(aggregate?: Aggregations): ObservationsQueryStringBuilder {
        if(aggregate != null) {
            this.params.append('aggregate', aggregate);
        }
        return this;
    }

    build(): string {
        return this.params.toString();
    }
}