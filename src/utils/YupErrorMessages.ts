/* eslint-disable @typescript-eslint/lines-between-class-members */
export default class YupCommonErrorMessages {
    static readonly Required = 'Required';
    static readonly InvalidEmail = 'Invalid email';
    static readonly MaxLength = (maxLength: number) => `Must be at most ${maxLength} characters`;
}