import React, { FC, ReactElement } from 'react';
import { CardBodyProps } from '../types/component-props';
import { PokemonSprite } from '../types/general-types';

const CardBody: FC<CardBodyProps> = ({
    pokemon,
    currentSprite,
    setCurrentSprite,
}: CardBodyProps): ReactElement => {
    const getClassName = (comparison: PokemonSprite) => {
        return currentSprite === comparison ? 'selected' : '';
    };
    return (
        <div className="pokemon-card-body">
            <div className="sprite-buttons">
                <button
                    className={getClassName('front_default')}
                    onClick={() => setCurrentSprite('front_default')}
                >
                    Front
                </button>
                <button
                    className={getClassName('back_default')}
                    onClick={() => setCurrentSprite('back_default')}
                >
                    Back
                </button>
                <button
                    className={getClassName('front_shiny')}
                    onClick={() => setCurrentSprite('front_shiny')}
                >
                    Front shiny
                </button>
                <button
                    className={getClassName('back_shiny')}
                    onClick={() => setCurrentSprite('back_shiny')}
                >
                    Back shiny
                </button>
            </div>
        </div>
    );
};

export default CardBody;
