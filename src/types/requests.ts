export interface PokemonAbility {
    name: string;
    hidden: boolean;
}

export interface PokemonMove {
    name: string;
}

export interface PokemonSprites {
    back_default: string;
    back_shiny: string;
    front_default: string;
    front_shiny: string;
}

export interface PokemonStat {
    base: number;
    name: string;
}

export interface PokemonType {
    name: string;
    slot: number;
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
