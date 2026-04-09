import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { describe, expect, it } from 'vitest';

import { ContactSection } from '../App';

describe('ContactSection', () => {
  it('validates and submits the contact form', async () => {
    const user = userEvent.setup();

    render(<ContactSection />);

    const submitButton = screen.getByRole('button', { name: /send inquiry/i });
    expect(submitButton).toBeDisabled();

    await user.type(screen.getByPlaceholderText('John Doe'), 'Jane Doe');
    await user.type(screen.getByPlaceholderText('john@company.com'), 'jane@example.com');
    await user.selectOptions(screen.getByRole('combobox'), 'mining');
    await user.type(screen.getByPlaceholderText('How can we help you?'), 'Need a safety audit.');

    expect(submitButton).toBeEnabled();

    await user.click(submitButton);

    expect(await screen.findByText(/message sent!/i, {}, { timeout: 2500 })).toBeInTheDocument();
  });
});
