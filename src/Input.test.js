import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import axios from 'axios';
import Input from './Input';

jest.mock('axios'); // Mock axios for testing

describe('Input component', () => {

  test('renders Input component', () => {
    render(<Input />);
    expect(screen.getByLabelText(/x/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/y/i)).toBeInTheDocument();
    expect(screen.getByText('Calculated result = 0')).toBeInTheDocument();
  });

  test('sets values of x and y', () => {
    render(<Input />);
    
    fireEvent.change(screen.getByLabelText(/x/i), { target: { value: '5' } });
    fireEvent.change(screen.getByLabelText(/y/i), { target: { value: '10' } });
    
    expect(screen.getByLabelText(/x/i).value).toBe('5');
    expect(screen.getByLabelText(/y/i).value).toBe('10');
  });

  test('calls axios and sets the result when + button is clicked', async () => {
    axios.post.mockResolvedValue({ data: { result: 15 } });

    render(<Input />);
    
    fireEvent.change(screen.getByLabelText(/x/i), { target: { value: '5' } });
    fireEvent.change(screen.getByLabelText(/y/i), { target: { value: '10' } });
    fireEvent.click(screen.getByText('+'));
    
    // Wait for axios to resolve
    await screen.findByText('Calculated result = 15');
  });

  test('displays error on axios failure', async () => {
    console.error = jest.fn(); // Mock console.error to suppress error output
    axios.post.mockRejectedValue(new Error('Failed to fetch'));
    
    render(<Input />);
    
    fireEvent.click(screen.getByText('+'));
    
    // Check if error has been logged
    expect(console.error).toHaveBeenCalled();
  });

  // Similar tests for '-', '*' and '/' operations...
});
