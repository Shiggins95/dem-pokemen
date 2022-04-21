import { FilterActionType, ReducerAction } from '../../types/general/redux';

export const setFilterName = (
    payload: string,
): ReducerAction<FilterActionType, string> => {
    return {
        type: 'SET_NAME',
        payload,
    };
};
