export type SortType = 'NAME' | 'POKEDEX';
export type SortDirection = 'ASC' | 'DESC';

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

export type PokemonStatName =
    | 'hp'
    | 'attack'
    | 'defence'
    | 'special-attack'
    | 'special-defence'
    | 'speed';

export interface PokemonStat {
    base: number;
    name: PokemonStatName;
}

export type PokemonTypeName =
    | 'grass'
    | 'poison'
    | 'fire'
    | 'water'
    | 'bug'
    | 'normal'
    | 'flying'
    | 'ground'
    | 'fighting'
    | 'psychic'
    | 'rock'
    | 'electric'
    | 'fairy'
    | 'steel'
    | 'ghost'
    | 'ice'
    | 'dragon';

export interface PokemonType {
    name: PokemonTypeName;
    slot: number;
}

export interface PokemonSpecies {
    id: number;
    name: string;
    abilities: PokemonAbility[];
    moves: PokemonMove[];
    sprites: PokemonSprites;
    stats: PokemonStat[];
    types: PokemonType[];
}

export type PokemonSprite = keyof PokemonSprites;
