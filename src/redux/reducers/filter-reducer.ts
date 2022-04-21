import {
    FilterActionType,
    FilterState,
    ReducerAction,
} from '../../types/general/redux';

const startingState: FilterState = {
    name: '',
};

const reducer = (
    state = startingState,
    action: ReducerAction<FilterActionType, string>,
) => {
    switch (action.type) {
        case 'SET_NAME':
            return { ...state, name: action.payload };
        default:
            return state;
    }
};

export default reducer;
