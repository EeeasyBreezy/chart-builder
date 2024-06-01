import UIStrings from '@/utils/UIStrings';
import FormikTextField from './FormikTextField';

export default function ChartLabelsEdit(): JSX.Element {
    return (
        <>
            <FormikTextField label={`${UIStrings.Title}*`} name="title" />
            <FormikTextField label={`${UIStrings.XAxis}*`} name="xLabel" />
            <FormikTextField label={`${UIStrings.YAxis}*`} name="yLabel" />
        </>
    );
}
