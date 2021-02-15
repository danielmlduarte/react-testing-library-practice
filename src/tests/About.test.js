import React from 'react';
import About from '../components/About';
import renderWithRouter from './renderWithRouter';

describe('Test if About component', () => {
  test('renders a info about Pokédex', () => {
    const { getByText } = renderWithRouter(<About />);
    const aboutTitle = getByText('About Pokédex');
    expect(aboutTitle).toBeInTheDocument();
  });

  test('renders two paragraphs with text about Pokédex', () => {
    const { getByText } = renderWithRouter(<About />);
    const firstText = /This application simulates a Pokédex/;
    const firstParagraph = getByText(firstText);
    const secondText = /One can filter Pokémons by type, and/;
    const secondParagraph = getByText(secondText);
    expect(firstParagraph).toBeInTheDocument();
    expect(secondParagraph).toBeInTheDocument();
  });

  test('renders a Pokédex image', () => {
    const { getByAltText } = renderWithRouter(<About />);
    const { src } = getByAltText('Pokédex');
    const imageUrl = 'https://cdn.bulbagarden.net/upload/thumb/8/86/Gen_I_Pok%C3%A9dex.png/800px-Gen_I_Pok%C3%A9dex.png';
    expect(src).toBe(imageUrl);
  });
});
