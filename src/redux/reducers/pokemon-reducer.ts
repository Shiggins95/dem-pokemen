import { PokemonSpecies } from '../../types/general-types';
import {
    PokemonActionType,
    PokemonState,
    ReducerAction,
} from '../../types/redux';

const startingState: PokemonState = {
    pokemon: [],
    allPokemon: [],
    currentPokemonViewing: null,
};

const reducer = (
    state = startingState,
    action: ReducerAction<
        PokemonActionType,
        PokemonSpecies[] | PokemonSpecies | null
    >,
) => {
    switch (action.type) {
        case 'SET_ALL_POKEMONS':
            return {
                ...state,
                pokemon: action.payload,
                allPokemon: action.payload,
            };
        case 'SET_POKEMONS':
            return { ...state, pokemon: action.payload };
        case 'SET_CURRENT_POKEMON':
            return { ...state, currentPokemonViewing: action.payload };
        default:
            return state;
    }
};

export default reducer;
