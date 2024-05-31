import YupCommonErrorMessages from '@/utils/YupErrorMessages';
import * as yup from 'yup';

export default function useValidationSchema() {
    const axisLabelMaxLength = 64;
    const titleMaxLength = 128;

    return yup.object().shape({
        chartType: yup.string().required(YupCommonErrorMessages.Required),
        title: yup.string().required(YupCommonErrorMessages.Required).max(titleMaxLength, YupCommonErrorMessages.MaxLength(titleMaxLength)),
        xLabel: yup.string().required(YupCommonErrorMessages.Required).max(axisLabelMaxLength, YupCommonErrorMessages.MaxLength(axisLabelMaxLength)),
        yLabel: yup.string().required(YupCommonErrorMessages.Required).max(axisLabelMaxLength, YupCommonErrorMessages.MaxLength(axisLabelMaxLength)),
    });
}