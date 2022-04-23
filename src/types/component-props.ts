import { PokemonSpecies } from './requests';

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
