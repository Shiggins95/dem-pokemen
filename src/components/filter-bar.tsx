import React, { ReactElement } from 'react';
import TextInput from './text-input';
import { useDispatch, useSelector } from 'react-redux';
import { PokemonReducer } from '../types/redux';
import { setPokemons } from '../redux/actions/pokemon-actions';
import { setFilterName } from '../redux/actions/filter-actions';
import SortButton from './sort-button';
import { SortDirection, SortType } from '../types/general-types';

const FilterBar = (): ReactElement => {
    const {
        pokemon: { allPokemon, pokemon },
        filter: { name },
    } = useSelector((state: PokemonReducer) => state);
    const dispatch = useDispatch();
    const handlePokemonNameFilterChange = (value: string) => {
        dispatch(setFilterName(value));
        if (!value) {
            dispatch(setPokemons(allPokemon));
            return;
        }
        const foundPokemon = allPokemon.filter((p) => {
            return p.name.toLowerCase().includes(value.toLowerCase());
        });
        dispatch(setPokemons(foundPokemon));
    };
    const handleSort = (sortDir: SortDirection, type: SortType) => {
        const firstSortFactor = sortDir === 'ASC' ? 1 : -1;
        const secondSortFactor = sortDir === 'ASC' ? -1 : 1;
        let compareKey: 'name' | 'id';
        switch (type) {
            case 'POKEDEX':
                compareKey = 'id';
                break;
            case 'NAME':
                compareKey = 'name';
                break;
            default:
                break;
        }
        const newArr = pokemon.sort((poke1, poke2) => {
            return poke1[compareKey] > poke2[compareKey]
                ? firstSortFactor
                : secondSortFactor;
        });
        dispatch(setPokemons(newArr));
    };
    return (
        <div className="filter-bar">
            <TextInput
                value={name}
                onChange={handlePokemonNameFilterChange}
                label="Pokemon Name"
                id="pokemon-name"
                placeholder="Enter pokemon name to filter by"
            />
            <SortButton
                callback={(sortDir) => handleSort(sortDir, 'NAME')}
                ascendingLabel="A-Z"
                descendingLabel="Z-A"
                label="name"
            />
            <SortButton
                callback={(sortDir) => handleSort(sortDir, 'POKEDEX')}
                ascendingLabel="1-151"
                descendingLabel="151-1"
                label="pokédex number"
            />
        </div>
    );
};

export default FilterBar;
