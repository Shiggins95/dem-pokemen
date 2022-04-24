import { PokemonSpecies } from './general-types';

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
    currentPokemonViewing: PokemonSpecies | null;
}

export interface PokemonReducer {
    filter: FilterState;
    pokemon: PokemonState;
}

export type PokemonActionType =
    | 'SET_POKEMONS'
    | 'SET_ALL_POKEMONS'
    | 'SET_CURRENT_POKEMON';

export type FilterActionType = 'SET_POKEMON_NAME';
