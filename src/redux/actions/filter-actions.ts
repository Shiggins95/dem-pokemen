import { FilterActionType, ReducerAction } from '../../types/redux';

export const setFilterName = (
    payload: string,
): ReducerAction<FilterActionType, string> => {
    return {
        type: 'SET_NAME',
        payload,
    };
};
