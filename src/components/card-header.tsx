import React, { FC, ReactElement } from 'react';
import { capitalise } from '../helpers/data-formatter';
import { PokemonStat, PokemonStatName } from '../types/general-types';
import { PokemonCardProps } from '../types/component-props';

const CardHeader: FC<PokemonCardProps> = ({
    pokemon,
}: PokemonCardProps): ReactElement => {
    const getPokemonStat = (stat: PokemonStatName): PokemonStat => {
        return pokemon.stats.find((s) => s.name === stat) as PokemonStat;
    };

    const singleOrDoubleLogosClass =
        pokemon.types.length === 1 ? 'single-logo' : 'double-logo';
    return (
        <div className={`heading ${singleOrDoubleLogosClass}`}>
            <p className="pokemon-name">{capitalise(pokemon.name)}</p>
            <p>
                <span>HP</span>
                {getPokemonStat('hp').base}
            </p>
            <div className="type-logos">
                {pokemon.types.map(({ name }) => {
                    return (
                        <img
                            key={name}
                            className="type"
                            src={`/img/${name}.svg`}
                            alt="type-logo"
                        />
                    );
                })}
            </div>
        </div>
    );
};

export default CardHeader;
