import {
    FilterActionType,
    FilterState,
    ReducerAction,
} from '../../types/redux';

/* TODO - add sort state into this reducer
 *      - set either asc or desc and set to empty string when other button is pressed
 *      - then when a new name is entered to filter by, run the list of pokemon through these sort checks and sort
 */

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
