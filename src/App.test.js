/** @jest-environment jsdom */
import React from 'react';
import '@testing-library/jest-dom';
import { render, screen, fireEvent } from '@testing-library/react';
import { App } from './App';

/**
 * Verify something should render
 */
test('App should render', () => {
  render(<App />);

  expect(screen.getByText('Welcome, party people!')).toBeInTheDocument();
});

test('Button should render', () => {
  render(<App />);

  const button = screen.getByText('Current theme: light');
  expect(button).toBeInTheDocument();
});

/**
 * Verify clicking button should change theme
 * hint: use fireEvent.click(element) to trigger a click event on an element
 */
test('theme button should update button text', () => {
  render(<App />);

  // Get the "Toggle Theme" button
  const button = screen.getByText('Current theme: light');

  fireEvent.click(button);

  expect(button).toHaveTextContent('Current theme: dark');

  fireEvent.click(button);

  expect(button).toHaveTextContent('Current theme: light');
});

// BONUS
// hint: there is a `.toHaveStyle` method.
// e.g.: expect(element).toHaveStyle('color: #FFF');
test('theme button should toggle styles', () => {
  render(<App />);

  // Get the body element to check styles
  const bodyElement = document.body;

  expect(bodyElement).toHaveStyle('color: #333');
  expect(bodyElement).toHaveStyle('background-color: #FFF');

  const button = screen.getByText('Current theme: light');

  fireEvent.click(button);

  expect(bodyElement).toHaveStyle('color: #FFF');
  expect(bodyElement).toHaveStyle('background-color: #333');
});

/**
 * Verify clicking button should toggle hidden content
 *
 * hint: you can check if something does not exist by using .not
 * e.g. expect(element).not.toBeInTheDocument()
 *
 * hint: use `queryByText` instead of `getByText` to check if something is _not_ rendered
 * (getByText will throw an error if it is not rendered)
 */
test('hidden button should toggle hidden content', () => {
  render(<App />);

  // Initially, the hidden content should not be visible
  expect(screen.queryByText('this content is hidden by default')).not.toBeInTheDocument();

  const hiddenButton = screen.getByText('Show hidden content');

  fireEvent.click(hiddenButton);

  expect(screen.getByText('this content is hidden by default')).toBeInTheDocument();

  fireEvent.click(hiddenButton);

  expect(screen.queryByText('this content is hidden by default')).not.toBeInTheDocument();
});
