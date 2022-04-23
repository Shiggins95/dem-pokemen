import React, { ReactElement, useEffect, useState } from 'react';
import axios from 'axios';
import { PokemonResponse, PokemonSpecies } from '../types/requests';
import Preloader from '../components/preloader';
import PokemonCard from '../components/pokemon-card';
import { useDispatch, useSelector } from 'react-redux';
import { PokemonReducer } from '../types/redux';
import { setAllPokemons } from '../redux/actions/pokemon-actions';
import { getRequiredPokemonInfo } from '../helpers/data-formatter';
import FilterBar from '../components/filter-bar';

const PokemonView = (): ReactElement => {
    const dispatch = useDispatch();
    const { pokemon } = useSelector((state: PokemonReducer) => state.pokemon);
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
            setLoading(false);
        });
        console.log('i call once ');
    }, []);

    return (
        <div className="pokemon-main-view">
            {loading && (
                <Preloader
                    type="progress"
                    title="Retrieving pokémon"
                    message="We are working on retrieving the pokémon information. Don't let team rocket find out!"
                />
            )}
            {error && (
                <Preloader
                    type="error"
                    title="Request failed"
                    message="Looks like Team Rocket have been interfering with our communications again!"
                />
            )}
            {!loading && (
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
