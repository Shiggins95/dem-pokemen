import React, { FC, ReactElement } from 'react';
import { PokemonCardProps } from '../types/component-props';

const PokemonCard: FC<PokemonCardProps> = ({
    pokemon,
}: PokemonCardProps): ReactElement => {
    return (
        <div className="pokemon-card">
            <p>Pokemon: {pokemon.name}</p>
        </div>
    );
};

export default PokemonCard;
