import { PokemonSpecies, PokemonSprite } from './general-types';

export interface PokemonCardProps {
    pokemon: PokemonSpecies;
}

export interface TextInputProps {
    value: string;
    onChange: (value: string) => void;
    label: string;
    id: string;
    placeholder: string;
}

export interface CardBodyProps {
    pokemon: PokemonSpecies;
    currentSprite: PokemonSprite;
    setCurrentSprite: (value: PokemonSprite) => void;
}
