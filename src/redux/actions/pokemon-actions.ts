import { PokemonSpecies } from '../../types/requests';
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
