import { vi, test, expect } from 'vitest';
import { render, fireEvent } from 'vitest-dom';
import NewUI from './NewUI'; // Import your component

vi('NewUI Component Test', () => {
  let component;

  // Initialize the component before each test
  test.beforeEach(() => {
    component = render(NewUI());
  });

  // Test 1: Check initial state
  test('should render with initial state', () => {
    const searchInput = component.getByPlaceholderText('Search site');
    const switchToTabText = component.getByText('Switch to Tab');
    const searchInRedditInput = component.getByPlaceholderText('Search in Reddit');

    expect(searchInput).toBeDefined();
    expect(switchToTabText).toBeDefined();
    expect(searchInRedditInput).toBe(null);
  });

  // Test 2: Check state after Enter and Escape key presses
  test('should toggle "enterPressed" state', async () => {
    const searchInput = component.getByPlaceholderText('Search site');
    const switchToTabText = component.getByText('Switch to Tab');
    const searchInRedditInput = component.getByPlaceholderText('Search in Reddit');

    await fireEvent.keyDown(searchInput, { key: 'Enter' });

    expect(searchInput).toBe(null);
    expect(switchToTabText).toBe(null);
    expect(searchInRedditInput).toBeDefined();

    await fireEvent.keyDown(searchInRedditInput, { key: 'Escape' });

    expect(searchInput).toBeDefined();
    expect(switchToTabText).toBeDefined();
    expect(searchInRedditInput).toBe(null);
  });
});

