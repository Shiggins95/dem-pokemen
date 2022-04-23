import React, { FC, ReactElement } from 'react';
import { PokemonCardProps } from '../types/component-props';

const PokemonCard: FC<PokemonCardProps> = ({
    pokemon,
}: PokemonCardProps): ReactElement => {
    return (
        <div className="pokemon-card">
            <div className="card-content">
                <p>Pokemon: {pokemon.name}</p>
            </div>
        </div>
    );
};

export default PokemonCard;
