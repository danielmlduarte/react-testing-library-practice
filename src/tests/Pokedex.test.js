import React from 'react';
import { fireEvent } from '@testing-library/react';
import App from '../App';
import data from '../data';
import renderWithRouter from './renderWithRouter';

describe('Page should renders a heading', () => {
  test('h2 with text "Encountered pokémons"', () => {
    const { getByText } = renderWithRouter(<App />);
    const pageTitle = getByText('Encountered pokémons');
    expect(pageTitle).toBeInTheDocument();
  });
});

describe('Should renders next pokemon when clicked in button next', () => {
  test('renders button with text "Próximo pokémon"', () => {
    const { getByTestId } = renderWithRouter(<App />);
    const nextButton = getByTestId('next-pokemon');
    expect(nextButton).toHaveTextContent('Próximo pokémon');
  });
  test('renders next Pokemon one by one', () => {
    const { getByTestId } = renderWithRouter(<App />);
    const nextButton = getByTestId('next-pokemon');
    data.forEach(({ name }) => {
      const pokemonName = getByTestId('pokemon-name');
      expect(pokemonName).toHaveTextContent(name);
      fireEvent.click(nextButton);
    });
  });
  test('renders first pokemon when clicked to next on last pokemon', () => {
    const { getByTestId } = renderWithRouter(<App />);
    const nextButton = getByTestId('next-pokemon');
    const firstPokemon = data[0];
    const initialNumber = 0;
    for (let index = initialNumber; index < (data.length); index += 1) {
      fireEvent.click(nextButton);
    }
    const pokemonName = getByTestId('pokemon-name');
    expect(pokemonName).toHaveTextContent(firstPokemon.name);
  });
});

describe('Should renders one pokemon at time', () => {
  test('renders one pokemon', () => {
    const { getAllByTestId } = renderWithRouter(<App />);
    const pokemons = getAllByTestId('pokemon-name');
    expect(pokemons).toHaveLength(1);
  });
});

describe('Renders filter buttons', () => {
  test('when clicked in filter button should renders a pokemon type', () => {
    const { getByTestId, getAllByTestId } = renderWithRouter(<App />);
    const typeButton = getAllByTestId('pokemon-type-button')[1];
    const nextButton = getByTestId('next-pokemon');
    fireEvent.click(typeButton);
    const { textContent } = typeButton;
    const typeLength = data.filter(({ type }) => type === textContent).length;
    const initialNumber = 0;
    for (let index = initialNumber; index < typeLength; index += 1) {
      const pokemonType = getByTestId('pokemonType');
      expect(pokemonType).toHaveTextContent(textContent);
      fireEvent.click(nextButton);
    }
  });
});

describe('Test if the Pokédex contains a button to reset the filter', () => {
  test('The button text must be "All"', () => {
    const { getByText } = renderWithRouter(<App />);
    const buttonAll = getByText('All');
    expect(buttonAll.type).toBe('button');
  });
  test('renders all Pokemons', () => {
    const { getByTestId, getByText } = renderWithRouter(<App />);
    const buttonAll = getByText('All');
    const nextButton = getByTestId('next-pokemon');
    fireEvent.click(buttonAll);
    data.forEach(({ name }) => {
      const pokemonName = getByTestId('pokemon-name');
      expect(pokemonName).toHaveTextContent(name);
      fireEvent.click(nextButton);
    });
  });
});

describe('filter button should to be created dynamically for each type', () => {
  test('The filter buttons must be dynamic', () => {
    const { getAllByTestId, getAllByRole, getByText } = renderWithRouter(<App />);
    const typeButtons = getAllByTestId('pokemon-type-button');
    typeButtons.forEach((button) => {
      const buttonType = getAllByRole('button', { name: button.textContent });
      expect(buttonType).toHaveLength(1);
      expect(buttonType[0]).toBeInTheDocument();
    });
    const buttonAll = getByText('All');
    expect(buttonAll).toBeInTheDocument();
  });
});

describe('The Next Pokémon button should be disabled when has only one Pokémon.', () => {
  test('renders next button disabled', () => {
    const { getByTestId, getByRole } = renderWithRouter(<App />);
    const nextButton = getByTestId('next-pokemon');
    expect(nextButton.disabled).toBeFalsy();
    const typeButton = getByRole('button', { name: 'Electric' });
    fireEvent.click(typeButton);
    expect(nextButton.disabled).toBeTruthy();
  });
});
