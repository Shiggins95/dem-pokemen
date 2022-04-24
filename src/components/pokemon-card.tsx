import React, { FC, ReactElement, useEffect, useRef, useState } from 'react';
import { PokemonCardProps } from '../types/component-props';
import { getPokemonBackgroundFromType } from '../helpers/data-formatter';
import CardHeader from './card-header';
import CardBody from './card-body';
import { PokemonSprite } from '../types/general-types';

const PokemonCard: FC<PokemonCardProps> = ({
    pokemon,
}: PokemonCardProps): ReactElement => {
    const imageRef = useRef<HTMLImageElement>(null);
    const [currentSprite, setCurrentSprite] =
        useState<PokemonSprite>('front_default');

    const getBackgroundGradient = () => {
        const bgColors = getPokemonBackgroundFromType(pokemon);
        return `linear-gradient(-45deg, ${bgColors[1]} 50%, ${bgColors[0]} 50%`;
    };

    useEffect(() => {
        if (!imageRef.current || currentSprite.indexOf('front') === -1) {
            return;
        }
        const states = [
            { transform: 'scale(0) rotateX(0)' },
            { transform: 'scale(1) rotateX(0)' },
            { transform: 'scale(1) rotate(0)' },
            { transform: 'scale(1) rotate(15deg)' },
            { transform: 'scale(1) rotate(-15deg)' },
            { transform: 'scale(1) rotate(0deg)' },
        ];
        const options = {
            duration: 500,
            iterations: 1,
        };
        imageRef.current.animate(states, options);
    }, [currentSprite]);

    return (
        <div className="pokemon-card">
            <div
                className="card-content"
                style={{ background: getBackgroundGradient() }}
            >
                <CardHeader pokemon={pokemon} />
                <div className="image">
                    <img
                        ref={imageRef}
                        className={currentSprite}
                        src={pokemon.sprites[currentSprite]}
                        alt="pokemon-sprite"
                    />
                </div>
                <CardBody
                    pokemon={pokemon}
                    currentSprite={currentSprite}
                    setCurrentSprite={(value: PokemonSprite) =>
                        setCurrentSprite(value)
                    }
                />
            </div>
        </div>
    );
};

export default PokemonCard;
