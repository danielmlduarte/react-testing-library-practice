import { fireEvent } from '@testing-library/react';
import React from 'react';
import App from '../App';
import data from '../data';
import renderWithRouter from './renderWithRouter';

test('renders the pokemon details on screen', () => {
  const { getByText, getByTestId } = renderWithRouter(<App />);
  const pokemonNameHome = getByTestId('pokemon-name').textContent;
  const detailsButton = getByText('More details');
  fireEvent.click(detailsButton);
  const { summary } = data.find(({ name }) => name === pokemonNameHome);
  const detailsTitle = getByText(`${pokemonNameHome} Details`);
  const detailsHeading = getByText('Summary');
  const detailsSummary = getByText(summary);
  expect(detailsTitle).toBeInTheDocument();
  expect(detailsButton).not.toBeInTheDocument();
  expect(detailsHeading).toBeInTheDocument();
  expect(detailsSummary).toBeInTheDocument();
});

test('renders the pokemon locations on screen', () => {
  const { getByText, getByTestId, getAllByAltText } = renderWithRouter(<App />);
  const pokemonNameHome = getByTestId('pokemon-name').textContent;
  const detailsButton = getByText('More details');
  fireEvent.click(detailsButton);
  const { foundAt } = data.find(({ name }) => name === pokemonNameHome);
  const detailsLocationHeading = getByText(`Game Locations of ${pokemonNameHome}`);
  expect(detailsLocationHeading).toBeInTheDocument();
  foundAt.forEach(({ location }) => {
    const detailsLocation = getByText(location);
    expect(detailsLocation).toBeInTheDocument();
  });
  const detailsMaps = getAllByAltText(`${pokemonNameHome} location`);
  detailsMaps.forEach((map, index) => {
    expect(map.src).toBe(foundAt[index].map);
  });
});

test('should favorite the pokemon', () => {
  const {
    getByText,
    getByTestId,
    getByAltText,
    getByLabelText,
  } = renderWithRouter(<App />);
  const pokemonNameHome = getByTestId('pokemon-name').textContent;
  const detailsButton = getByText('More details');
  fireEvent.click(detailsButton);
  const favoriteButton = getByLabelText('Pokémon favoritado?');
  fireEvent.click(favoriteButton);
  const pokemonIsFavorite = getByAltText(`${pokemonNameHome} is marked as favorite`);
  expect(pokemonIsFavorite).toBeInTheDocument();
  fireEvent.click(favoriteButton);
});
