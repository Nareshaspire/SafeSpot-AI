import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';

import TrainingSection from '../sections/TrainingSection';

describe('TrainingSection', () => {
  const module = {
    title: 'Safety Basics',
    objectives: ['Objective one'],
    sections: [{ title: 'Intro', content: 'Stay safe.' }],
    quiz: [{ question: 'What is PPE?', options: ['Equipment', 'Hazard'], correctAnswer: 0, explanation: 'It protects you.' }],
  };

  const fetchMock = vi.fn();

  beforeEach(() => {
    fetchMock.mockReset();
    global.fetch = fetchMock as unknown as typeof fetch;
  });

  afterEach(() => {
    vi.clearAllMocks();
  });

  it('generates a module and completes the quiz', async () => {
    const user = userEvent.setup();
    fetchMock.mockResolvedValueOnce({
      ok: true,
      json: async () => module,
    });

    render(<TrainingSection />);

    await user.type(screen.getByPlaceholderText('e.g. Site Supervisor, Lab Tech'), 'Supervisor');
    await user.type(
      screen.getByPlaceholderText(
        'Describe the hazards you face (e.g. working at heights, chemical exposure, heavy machinery)...',
      ),
      'Dust and noise.',
    );

    await user.click(screen.getByRole('button', { name: /generate personalized training/i }));

    expect(await screen.findByText('Intro')).toBeInTheDocument();

    await user.click(screen.getByRole('button', { name: /start quiz/i }));
    expect(await screen.findByText('What is PPE?')).toBeInTheDocument();

    await user.click(screen.getByRole('button', { name: 'Equipment' }));

    expect(await screen.findByText(/module completed!/i)).toBeInTheDocument();
    expect(screen.getByText('100%')).toBeInTheDocument();
  });
});
