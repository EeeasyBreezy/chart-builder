import UIStrings from '@/utils/UIStrings';
import FormikTextField from './FormikTextField';

export default function ChartLabelsEdit(): JSX.Element {
    return (
        <>
            <FormikTextField label={`${UIStrings.Title}*`} name="title" data-cy="editTitle" />
            <FormikTextField label={`${UIStrings.XAxis}*`} name="xLabel" data-cy="editXlabel" />
            <FormikTextField label={`${UIStrings.YAxis}*`} name="yLabel" data-cy="editYLabel" />
        </>
    );
}
