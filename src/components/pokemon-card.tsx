import React, { FC, ReactElement } from 'react';
import { PokemonCardProps } from '../types/component-props';
import {
    capitalise,
    getPokemonBackgroundFromType,
} from '../helpers/data-formatter';
import { PokemonStat } from '../types/general-types';

const PokemonCard: FC<PokemonCardProps> = ({
    pokemon,
}: PokemonCardProps): ReactElement => {
    const getBackgroundGradient = () => {
        const bgColors = getPokemonBackgroundFromType(pokemon);
        return `linear-gradient(-45deg, ${bgColors[1]} 50%, ${bgColors[0]} 50%`;
    };

    const getPokemonStat = (
        stat:
            | 'hp'
            | 'attack'
            | 'defence'
            | 'special-attack'
            | 'special-defence'
            | 'speed',
    ): PokemonStat => {
        // can safely cast this as it will always be defined
        return pokemon.stats.find((s) => s.name === stat) as PokemonStat;
    };

    const singleOrDoubleLogosClass =
        pokemon.types.length === 1 ? 'single-logo' : 'double-logo';

    return (
        <div className="pokemon-card">
            <div
                className="card-content"
                style={{ background: getBackgroundGradient() }}
            >
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
                <div className="image">
                    <img
                        src={pokemon.sprites.front_default}
                        alt="pokemon-sprite"
                    />
                </div>
            </div>
        </div>
    );
};

export default PokemonCard;
