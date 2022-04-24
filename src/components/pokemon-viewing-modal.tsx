import React, { FC, ReactElement } from 'react';
import { PokemonSpecies } from '../types/general-types';
import { setCurrentPokemon } from '../redux/actions/pokemon-actions';
import { useDispatch } from 'react-redux';
import {
    capitalise,
    getPokemonBackgroundFromType,
} from '../helpers/data-formatter';
import TypeIndicator from './type-indicator';
import { FaWindowClose } from 'react-icons/all';

interface PokemonViewingModalProps {
    pokemon: PokemonSpecies;
}

const PokemonViewingModal: FC<PokemonViewingModalProps> = ({
    pokemon,
}: PokemonViewingModalProps): ReactElement => {
    const dispatch = useDispatch();
    const pokemonTypes = pokemon.types.map(({ name }) => {
        return name;
    });
    const bgColors = getPokemonBackgroundFromType(pokemon);
    return (
        <div className="pokemon-viewing-modal">
            <div className="modal-content">
                <div className="close">
                    <FaWindowClose
                        onClick={() => dispatch(setCurrentPokemon(null))}
                    />
                </div>
                <div
                    className={`header ${
                        pokemonTypes.length === 1
                            ? 'single-type'
                            : 'double-types'
                    }`}
                >
                    <h1>{capitalise(pokemon.name)}</h1>
                    <div className="type-indicators">
                        {pokemonTypes.map((type, index) => {
                            return (
                                <TypeIndicator
                                    key={index}
                                    type={type}
                                    color={bgColors[index]}
                                />
                            );
                        })}
                    </div>
                </div>
                <div className="base-stats">
                    <h2>Base Stats</h2>
                    <p>
                        The base stats are a pokemon&apos;s &quot;natural&quot;
                        stats. These will not be their final stats at lvl 100.
                    </p>
                    <p>
                        These stats can also be modified by helping or hindering
                        natures. e.g. an Adamant natured{' '}
                        {capitalise(pokemon.name)} would have increased attack
                        and decreased special attack.
                    </p>
                    <p>&nbsp;</p>
                    <p>Below are the pokemon&apos;s base stats.</p>
                    <div className="stats">
                        {pokemon.stats.map(({ name, base }) => {
                            return (
                                <p key={name + base.toString()}>
                                    <span>{capitalise(name)}:</span> {base}
                                </p>
                            );
                        })}
                    </div>
                </div>
                <div className="abilities">
                    <h2>Abilities</h2>
                    <p>
                        The below abilites are all possible for{' '}
                        {capitalise(pokemon.name)} to learn. However abilities
                        marked as hidden can only be obtained by breeding with
                        other pokemon with the hidden ability.
                    </p>
                    <div className="abilities-container">
                        {pokemon.abilities.map((ability) => {
                            return (
                                <div key={ability.name} className="ability">
                                    <p>
                                        <span>Name: </span>{' '}
                                        {capitalise(ability.name)}
                                    </p>
                                    <p>
                                        <span>Is hidden?: </span>
                                        {ability.hidden ? 'Yes' : 'No'}
                                    </p>
                                </div>
                            );
                        })}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default PokemonViewingModal;
