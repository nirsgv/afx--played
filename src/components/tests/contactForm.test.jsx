import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import ContactForm from '../contactForm';

const fill = (label, value) => fireEvent.change(screen.getByLabelText(label), { target: { value } });

afterEach(() => vi.unstubAllGlobals());

test('shows field errors and does not send an incomplete message', () => {
    vi.stubGlobal('fetch', vi.fn());
    render(<ContactForm />);
    fill('Email', 'nope');
    fireEvent.click(screen.getByRole('button', { name: 'Send message' }));

    expect(screen.getByText('Please enter your name')).toBeInTheDocument();
    expect(screen.getByText('Please enter a valid email')).toBeInTheDocument();
    expect(screen.getByText('Please write a message')).toBeInTheDocument();
    expect(fetch).not.toHaveBeenCalled();
});

test('posts name, email and message, then thanks the sender', async () => {
    vi.stubGlobal('fetch', vi.fn(async () => ({ ok: true, status: 201, json: async () => ({ ok: true }) })));
    render(<ContactForm />);
    fill('Name', 'Ada');
    fill('Email', 'ada@example.com');
    fill('Message', 'Hello');
    fireEvent.click(screen.getByRole('button', { name: 'Send message' }));

    await waitFor(() => expect(screen.getByText('Thanks!')).toBeInTheDocument());
    const [url, options] = fetch.mock.calls[0];
    expect(url).toBe('/api/contact');
    expect(options.method).toBe('POST');
    expect(JSON.parse(options.body)).toEqual({ name: 'Ada', email: 'ada@example.com', message: 'Hello', website: '' });
});

test('keeps the message and shows an error when sending fails', async () => {
    vi.stubGlobal('fetch', vi.fn(async () => ({ ok: false, status: 500, json: async () => ({}) })));
    vi.spyOn(console, 'error').mockImplementation(() => {});
    render(<ContactForm />);
    fill('Name', 'Ada');
    fill('Email', 'ada@example.com');
    fill('Message', 'Hello');
    fireEvent.click(screen.getByRole('button', { name: 'Send message' }));

    await waitFor(() => expect(screen.getByRole('alert')).toHaveTextContent("couldn't be sent"));
    expect(screen.getByLabelText('Message')).toHaveValue('Hello');
});
