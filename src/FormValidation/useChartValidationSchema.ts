import YupCommonErrorMessages from '@/utils/YupErrorMessages';
import * as yup from 'yup';

export default function useChartValidationSchema() {
    const axisLabelMaxLength = 64;
    const titleMaxLength = 128;

    return yup.object().shape({
        title: yup
            .string()
            .required(YupCommonErrorMessages.Required)
            .max(titleMaxLength, YupCommonErrorMessages.MaxLength(titleMaxLength)),
        xLabel: yup
            .string()
            .required(YupCommonErrorMessages.Required)
            .max(axisLabelMaxLength, YupCommonErrorMessages.MaxLength(axisLabelMaxLength)),
        yLabel: yup
            .string()
            .required(YupCommonErrorMessages.Required)
            .max(axisLabelMaxLength, YupCommonErrorMessages.MaxLength(axisLabelMaxLength)),
    });
}
