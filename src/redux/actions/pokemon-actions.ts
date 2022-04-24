import { PokemonSpecies } from '../../types/general-types';
import { PokemonActionType, ReducerAction } from '../../types/redux';

export const setPokemons = (
    payload: PokemonSpecies[],
): ReducerAction<PokemonActionType, PokemonSpecies[]> => {
    return {
        type: 'SET_POKEMONS',
        payload,
    };
};
export const setAllPokemons = (
    payload: PokemonSpecies[],
): ReducerAction<PokemonActionType, PokemonSpecies[]> => {
    return {
        type: 'SET_ALL_POKEMONS',
        payload,
    };
};

export const setCurrentPokemon = (
    payload: PokemonSpecies | null,
): ReducerAction<PokemonActionType, PokemonSpecies | null> => {
    return {
        type: 'SET_CURRENT_POKEMON',
        payload,
    };
};
