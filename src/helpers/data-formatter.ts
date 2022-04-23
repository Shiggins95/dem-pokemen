import { PokemonSpecies } from '../types/requests';

export const getRequiredPokemonInfo = (rawObject: any): PokemonSpecies => {
    return {
        name: rawObject.name,
        abilities: rawObject.abilities,
        moves: rawObject.moves,
        sprites: rawObject.sprites,
        stats: rawObject.stats,
        types: rawObject.types,
    };
};
