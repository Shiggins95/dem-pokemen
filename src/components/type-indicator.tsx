import React, { FC, ReactElement } from 'react';
import { PokemonTypeName } from '../types/general-types';

interface TypeIndicatorProps {
    type: PokemonTypeName;
    color: string;
}

const TypeIndicator: FC<TypeIndicatorProps> = ({
    type,
    color,
}: TypeIndicatorProps): ReactElement => {
    return (
        <div className="type-indicator" style={{ background: color }}>
            <img src={`/img/${type}.svg`} alt="pokemon-type" />
            <p>{type}</p>
        </div>
    );
};

export default TypeIndicator;
