import React, { ReactElement, useState } from 'react';
import TextInput from './text-input';
import { useDispatch, useSelector } from 'react-redux';
import { PokemonReducer } from '../types/redux';
import { setPokemons } from '../redux/actions/pokemon-actions';

const FilterBar = (): ReactElement => {
    const { allPokemon } = useSelector(
        (state: PokemonReducer) => state.pokemon,
    );
    const [pokemonName, setPokemonName] = useState('');
    const dispatch = useDispatch();
    const handlePokemonNameFilterChange = (value: string) => {
        setPokemonName(value);
        if (!value) {
            dispatch(setPokemons(allPokemon));
            return;
        }
        const foundPokemon = allPokemon.filter((p) => {
            return p.name.toLowerCase().includes(value.toLowerCase());
        });
        dispatch(setPokemons(foundPokemon));
    };
    return (
        <div className="filter-bar">
            <TextInput
                value={pokemonName}
                onChange={handlePokemonNameFilterChange}
                label="Pokemon Name"
                id="pokemon-name"
                placeholder="Enter pokemon name to filter by"
            />
        </div>
    );
};

export default FilterBar;
