/* eslint-disable no-unused-vars */
import React, { ReactElement, useEffect, useState } from 'react';
import axios from 'axios';
import { PokemonResponse } from '../types/requests';
import { PokemonSpecies } from '../types/general-types';
import ErrorModal from '../components/error-modal';
import PokemonCard from '../components/pokemon-card';
import { useDispatch, useSelector } from 'react-redux';
import { PokemonReducer } from '../types/redux';
import { setAllPokemons } from '../redux/actions/pokemon-actions';
import { getRequiredPokemonInfo } from '../helpers/data-formatter';
import FilterBar from '../components/filter-bar';
import Preloader from '../components/preloader';

const PokemonView = (): ReactElement => {
    const dispatch = useDispatch();
    const { pokemon } = useSelector((state: PokemonReducer) => state.pokemon);
    const [triggerCapture, setTriggerCapture] = useState(false);
    const [display, setDisplay] = useState(false);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(false);

    const populatePokemon = async (data: PokemonResponse) => {
        return new Promise(async (resolve, reject) => {
            try {
                const populatedPokemon: PokemonSpecies[] = [];
                for (const spec of data.pokemon_species) {
                    const response = await axios.get(
                        `https://pokeapi.co/api/v2/pokemon/${spec.name}`,
                    );
                    populatedPokemon.push(
                        getRequiredPokemonInfo(response.data),
                    );
                }
                dispatch(setAllPokemons(populatedPokemon));
                return resolve(true);
            } catch (e) {
                return reject(e);
            }
        });
    };

    const getPokemon = async () => {
        setDisplay(false);
        try {
            const response = await axios.get(
                'https://pokeapi.co/api/v2/generation/1',
            );
            await populatePokemon(response.data);
        } catch (e) {
            setError(true);
        }
    };

    useEffect(() => {
        setLoading(true);
        getPokemon().then(() => {
            setTriggerCapture(true);
            setDisplay(true);
        });
        console.log('i call once ');
    }, []);

    const onLoadFinish = () => {
        setLoading(false);
        setTriggerCapture(false);
    };

    return (
        <div className="pokemon-main-view">
            {loading && (
                <Preloader
                    onCompleteCallback={() => onLoadFinish()}
                    triggerDisplay={() => setDisplay(true)}
                    showCapture={triggerCapture}
                />
            )}
            {error && (
                <ErrorModal
                    type="error"
                    title="Request failed"
                    message="Looks like Team Rocket have been interfering with our communications again!"
                />
            )}
            {display && (
                <div className="content">
                    <FilterBar />
                    <div className="pokemon-cards">
                        {pokemon.map((pokemon) => (
                            <PokemonCard key={pokemon.name} pokemon={pokemon} />
                        ))}
                    </div>
                </div>
            )}
        </div>
    );
};

export default PokemonView;
