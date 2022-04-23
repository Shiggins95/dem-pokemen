import {
    FilterActionType,
    FilterState,
    ReducerAction,
} from '../../types/redux';

const startingState: FilterState = {
    name: '',
};

const reducer = (
    state = startingState,
    action: ReducerAction<FilterActionType, string>,
) => {
    switch (action.type) {
        case 'SET_POKEMON_NAME':
            return { ...state, name: action.payload };
        default:
            return state;
    }
};

export default reducer;
