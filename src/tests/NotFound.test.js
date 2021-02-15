import React from 'react';
import NotFound from '../components/NotFound';
import renderWithRouter from './renderWithRouter';

test('renders heading h2 with text "Page requested not found"', () => {
  const { getByText } = renderWithRouter(<NotFound />);
  const pageTitle = getByText('Page requested not found');
  expect(pageTitle).toBeInTheDocument();
});

test('renders a NotFound image', () => {
  const { getByAltText } = renderWithRouter(<NotFound />);
  const alt = 'Pikachu crying because the page requested was not found';
  const { src } = getByAltText(alt);
  const imageUrl = 'https://media.giphy.com/media/kNSeTs31XBZ3G/giphy.gif';
  expect(src).toBe(imageUrl);
});
