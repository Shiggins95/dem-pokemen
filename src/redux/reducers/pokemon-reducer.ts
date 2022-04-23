import { PokemonSpecies } from '../../types/requests';
import {
    PokemonActionType,
    PokemonState,
    ReducerAction,
} from '../../types/redux';

const startingState: PokemonState = {
    pokemon: [],
    allPokemon: [],
};

const reducer = (
    state = startingState,
    action: ReducerAction<PokemonActionType, PokemonSpecies[]>,
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
        default:
            return state;
    }
};

export default reducer;
