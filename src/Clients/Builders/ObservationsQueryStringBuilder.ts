import { Aggregations, Frequencies, Units } from '@/Models/Chart';
import BaseQueryStringBuilder from './BaseQueryStringBuilder';

export default class ObservationsQueryStringBuilder extends BaseQueryStringBuilder {

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
        if (aggregate != null) {
            this.params.append('aggregate', aggregate);
        }
        return this;
    }
}
