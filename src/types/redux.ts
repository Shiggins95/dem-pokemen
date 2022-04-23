import { PokemonSpecies } from './requests';

export interface ReducerAction<ActionType, PayloadType = null> {
    type: ActionType;
    payload?: PayloadType;
}

export interface FilterState {
    name: string;
}
export interface PokemonState {
    pokemon: PokemonSpecies[];
    allPokemon: PokemonSpecies[];
}

export interface PokemonReducer {
    filter: FilterState;
    pokemon: PokemonState;
}

export type PokemonActionType = 'SET_POKEMONS' | 'SET_ALL_POKEMONS';

export type FilterActionType = 'SET_NAME';
