import { fireEvent } from '@testing-library/react';
import React from 'react';
import Pokemon from '../components/Pokemon';
import renderWithRouter from './renderWithRouter';

const pokemon = {
  id: 25,
  name: 'Pikachu',
  type: 'Electric',
  averageWeight: {
    value: '6.0',
    measurementUnit: 'kg',
  },
  image: 'https://cdn.bulbagarden.net/upload/b/b2/Spr_5b_025_m.png',
  moreInfo: 'https://bulbapedia.bulbagarden.net/wiki/Pikachu_(Pok%C3%A9mon)',
  foundAt: [
    {
      location: 'Kanto Viridian Forest',
      map: 'https://cdn.bulbagarden.net/upload/0/08/Kanto_Route_2_Map.png',
    },
    {
      location: 'Kanto Power Plant',
      map: 'https://cdn.bulbagarden.net/upload/b/bd/Kanto_Celadon_City_Map.png',
    },
  ],
  summary: 'This intelligent.',
};

const isFavorite = true;

describe('Should renders a Card with pokemon infos', () => {
  test('renders the pokemon name', () => {
    const { getByTestId } = renderWithRouter(
      <Pokemon
        pokemon={ pokemon }
        isFavorite={ isFavorite }
      />,
    );
    const pokemonName = getByTestId('pokemon-name');
    expect(pokemonName).toHaveTextContent(pokemon.name);
  });
  test('renders the pokemon type', () => {
    const { getByTestId } = renderWithRouter(
      <Pokemon
        pokemon={ pokemon }
        isFavorite={ isFavorite }
      />,
    );
    const pokemonType = getByTestId('pokemonType');
    expect(pokemonType).toHaveTextContent(pokemon.type);
  });
  test('renders the pokemon weigth', () => {
    const { getByTestId } = renderWithRouter(
      <Pokemon
        pokemon={ pokemon }
        isFavorite={ isFavorite }
      />,
    );
    const pokemonWeight = getByTestId('pokemon-weight');
    const { averageWeight: { value, measurementUnit } } = pokemon;
    expect(pokemonWeight)
      .toHaveTextContent(`Average weight: ${value} ${measurementUnit}`);
  });
  test('renders the pokemon image', () => {
    const { getByAltText } = renderWithRouter(
      <Pokemon
        pokemon={ pokemon }
        isFavorite={ isFavorite }
      />,
    );
    const pokemonImage = getByAltText(`${pokemon.name} sprite`);
    expect(pokemonImage).toBeInTheDocument();
    expect(pokemonImage.src).toBe(pokemon.image);
  });
});

test('Pokemon card renders link to details', () => {
  const { getByText } = renderWithRouter(
    <Pokemon
      pokemon={ pokemon }
      isFavorite={ isFavorite }
    />,
  );
  const pokemonDetailsLink = getByText('More details');
  const url = `http://localhost/pokemons/${pokemon.id}`;
  expect(pokemonDetailsLink).toBeInTheDocument();
  expect(pokemonDetailsLink.href).toBe(url);
});

test('Pokemon cards link should redirect to details page', () => {
  const { getByText, history } = renderWithRouter(
    <Pokemon
      pokemon={ pokemon }
      isFavorite={ isFavorite }
    />,
  );
  const pokemonDetailsLink = getByText('More details');
  fireEvent.click(pokemonDetailsLink);
  const { pathname } = history.location;
  expect(pathname).toBe(`/pokemons/${pokemon.id}`);
});

test('Pokemon cards should renders a favorite icon', () => {
  const { getByAltText } = renderWithRouter(
    <Pokemon
      pokemon={ pokemon }
      isFavorite={ isFavorite }
    />,
  );
  const pokemonIsFavorite = getByAltText(`${pokemon.name} is marked as favorite`);
  expect(pokemonIsFavorite).toBeInTheDocument();
  expect(pokemonIsFavorite.src).toBe('http://localhost/star-icon.svg');
});
