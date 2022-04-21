import React, { ReactElement, useEffect, useState } from 'react';
import {
    httpOperationReducer,
    OperationKind,
} from '../helpers/http-operation-reducer';
import axios from 'axios';
import { PokemonResponse, PokemonSpecies } from '../types/general/requests';
import Preloader from '../components/preloader';

const PokemonView = (): ReactElement => {
    const [pokemonState, setPokemonState] = useState<PokemonSpecies[]>();
    const [ready, setReady] = useState(false);

    const [, getPokemon] = httpOperationReducer<PokemonResponse>(
        (previous, next) => {
            switch (next.type) {
                case OperationKind.complete:
                    const populatedPokemon: PokemonSpecies[] = [];
                    next.value.pokemon_species.forEach(async ({ name }) => {
                        const response = await axios.get(
                            `https://pokeapi.co/api/v2/pokemon/${name}`,
                        );
                        console.log('rrr', response);
                        populatedPokemon.push(response.data);
                    });
                    setPokemonState(populatedPokemon);
                    setReady(true);
                    break;
                default:
                    break;
            }
            return next;
        },
    );
    useEffect(() => {
        getPokemon(async () =>
            axios.get('https://pokeapi.co/api/v2/generation/1'),
        );
    }, []);

    return (
        <div className="pokemon-main-view">
            {ready && <p>InnerContent</p>}
            {!ready && (
                <Preloader
                    type="progress"
                    title="Retrieving pokémon"
                    message="We are working on retrieving the pokémon information. Don't let team rocket find out!"
                />
            )}
        </div>
    );
};

export default PokemonView;
