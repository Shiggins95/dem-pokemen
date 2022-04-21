export interface ReducerAction<ActionType, PayloadType = null> {
    type: ActionType;
    payload?: PayloadType;
}

export interface FilterState {
    name: string;
}

export interface PokemonReducer {
    filter: FilterState;
}

export type FilterActionType = 'SET_NAME';
