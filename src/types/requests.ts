export interface PokemonAbility {
    ability: { name: string };
}

export interface PokemonMove {
    move: { name: string };
}

export interface PokemonSprites {
    back_default: string;
    back_shiny: string;
    front_default: string;
    front_shiny: string;
}

export interface PokemonStat {
    base_stat: number;
    stat: { name: string };
}

export interface PokemonType {
    type: { name: string };
}

export interface PokemonSpecies {
    name: string;
    abilities: PokemonAbility[];
    moves: PokemonMove[];
    sprites: PokemonSprites;
    stats: PokemonStat[];
    types: PokemonType[];
}

export interface PokemonResponse {
    pokemon_species: { name: string; url: string }[];
}
