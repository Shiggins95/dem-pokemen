import { FilterActionType, ReducerAction } from '../../types/redux';

export const setFilterName = (
    payload: string,
): ReducerAction<FilterActionType, string> => {
    return {
        type: 'SET_POKEMON_NAME',
        payload,
    };
};
