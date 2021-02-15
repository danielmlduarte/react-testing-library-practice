import React from 'react';
import { fireEvent } from '@testing-library/react';
import FavoritePokemons from '../components/FavoritePokemons';
import App from '../App';
import renderWithRouter from './renderWithRouter';

describe('Test if FavoritePokemons component', () => {
  test('renders a msg "No favorite pokemon found"', () => {
    const { getByText } = renderWithRouter(<FavoritePokemons />);
    const notFoundText = getByText('No favorite pokemon found');
    expect(notFoundText).toBeInTheDocument();
  });

  test('renders favorite pokemons', () => {
    const {
      getByText,
      getAllByRole,
      getByTestId,
      getByLabelText,
      history,
    } = renderWithRouter(<App />);
    const fireButton = getAllByRole('button')[2];
    expect(fireButton).toHaveTextContent('Fire');
    fireEvent.click(fireButton);
    const pokemonTitle = getByTestId('pokemon-name');
    const detailsButton = getByText('More details');
    expect(pokemonTitle).toBeInTheDocument();
    fireEvent.click(detailsButton);
    const detailsTitle = getByText('Charmander Details');
    expect(detailsTitle).toBeInTheDocument();
    const favoriteButton = getByLabelText('Pokémon favoritado?');
    fireEvent.click(favoriteButton);
    history.push('/favorites');
    const pokemonName = getByText('Charmander');
    expect(pokemonName).toBeInTheDocument();
  });
});
