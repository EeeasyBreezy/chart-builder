import AddChartDialogWithFormik from './AddChartDialogWithFormik';
import { AddChartDialogContext } from './useAddChartDialogContext';
import useAddChartDialogContextValue from './useAddChartDialogContextValue';

export default function Dialog(): JSX.Element {
    const contextValue = useAddChartDialogContextValue();

    return (
        <AddChartDialogContext.Provider value={contextValue}>
            <AddChartDialogWithFormik />
        </AddChartDialogContext.Provider>
    );
}
