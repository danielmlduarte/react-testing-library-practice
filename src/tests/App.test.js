import React from 'react';
import { MemoryRouter } from 'react-router-dom';
import { render, fireEvent } from '@testing-library/react';
import App from '../App';
import renderWithRouter from './renderWithRouter';

test('renders a reading with the text `Pokédex`', () => {
  const { getByText } = render(
    <MemoryRouter>
      <App />
    </MemoryRouter>,
  );
  const heading = getByText(/Pokédex/i);
  expect(heading).toBeInTheDocument();
});

test('main page renders with url path "/"', () => {
  const { getByText, history } = renderWithRouter(<App />);
  const pokedexTitle = getByText('Encountered pokémons');
  const { pathname } = history.location;
  expect(pokedexTitle).toBeInTheDocument();
  expect(pathname).toBe('/');
});

test('renders on top, fixed nav links', () => {
  const { getByText } = renderWithRouter(<App />);
  const homeLink = getByText('Home');
  const aboutLink = getByText('About');
  const favoriteLink = getByText('Favorite Pokémons');
  expect(homeLink).toBeInTheDocument();
  expect(aboutLink).toBeInTheDocument();
  expect(favoriteLink).toBeInTheDocument();
});

test('when clicked in home link should redirect to url "/" ', () => {
  const { getByText, history } = renderWithRouter(<App />);
  const homeLink = getByText('Home');
  const route = '/about';
  history.push(route);
  fireEvent.click(homeLink);
  const { pathname } = history.location;
  expect(pathname).toBe('/');
});

test('when clicked in about link should redirect to url "/about" ', () => {
  const { getByText, history } = renderWithRouter(<App />);
  const aboutLink = getByText('About');
  fireEvent.click(aboutLink);
  const { pathname } = history.location;
  expect(pathname).toBe('/about');
});

test('when clicked in favorite link should redirect to url "/favorite" ', () => {
  const { getByText, history } = renderWithRouter(<App />);
  const favoriteLink = getByText('Favorite Pokémons');
  fireEvent.click(favoriteLink);
  const { pathname } = history.location;
  expect(pathname).toBe('/favorites');
});

test('when write "/teste" in url should redirect to Not Found page', () => {
  const { getByText, history } = renderWithRouter(<App />);
  const route = '/teste';
  history.push(route);
  const notFoundText = getByText('Page requested not found');
  expect(notFoundText).toBeInTheDocument();
});
