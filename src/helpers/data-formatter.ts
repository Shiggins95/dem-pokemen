import { PokemonSpecies } from '../types/general-types';

/**
 * formatter function to extract the exact information required to optimise redux storage as using raw object
 * returned from pokeapi contains a lot of cluttered info
 */
export const getRequiredPokemonInfo = (rawObject: any): PokemonSpecies => {
    return {
        id: rawObject.id,
        name: rawObject.name,
        abilities: rawObject.abilities.map((ability: any) => ({
            name: ability.ability.name,
            hidden: ability.is_hidden,
        })),
        moves: rawObject.moves.map((move: any) => ({ name: move.move.name })),
        sprites: rawObject.sprites,
        stats: rawObject.stats.map((stat: any) => ({
            name: stat.stat.name,
            base: stat.base_stat,
        })),
        types: rawObject.types.map((type: any) => ({
            name: type.type.name,
            slot: type.slot,
        })),
    };
};
