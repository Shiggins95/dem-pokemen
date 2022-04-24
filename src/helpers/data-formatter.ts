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

const colorMapping: { [key: string]: string } = {
    bug: 'rgb(226,255,152)',
    dark: 'rgb(70,63,93)',
    dragon: 'rgb(154,140,60)',
    electric: 'rgb(238,255,0)',
    fairy: 'rgb(255,171,171)',
    fighting: 'rgb(220,162,109)',
    fire: 'rgb(255,98,0)',
    flying: 'rgb(132,239,255)',
    ghost: 'rgb(72,62,134)',
    grass: 'rgb(72,206,60)',
    ground: 'rgb(126,63,26)',
    ice: 'rgb(214,255,247)',
    normal: 'rgb(110,110,110)',
    poison: 'rgb(141,89,183)',
    psychic: 'rgb(168,0,255)',
    rock: 'rgb(210,132,57)',
    steel: 'rgb(194,194,194)',
    water: 'rgb(61,115,255)',
};

export const getPokemonBackgroundFromType = (
    pokemon: PokemonSpecies,
): string[] => {
    const colors: string[] = [];
    pokemon.types.forEach(({ name }) => {
        colors.push(colorMapping[name]);
    });
    if (colors.length === 1) {
        colors.push(colors[0]);
    }
    return colors;
};

export const capitalise = (s: string) => {
    return `${s.substring(0, 1).toUpperCase()}${s.substring(1, s.length)}`;
};
