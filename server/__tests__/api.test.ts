// @vitest-environment node
import request from 'supertest';
import { beforeAll, beforeEach, describe, expect, it, vi } from 'vitest';

const generateContentMock = vi.fn();

vi.mock('@google/genai', () => ({
  GoogleGenAI: class {
    models = { generateContent: generateContentMock };
  },
  Type: {
    OBJECT: 'OBJECT',
    STRING: 'STRING',
    ARRAY: 'ARRAY',
    INTEGER: 'INTEGER',
  },
}));

process.env.NODE_ENV = 'test';
process.env.GEMINI_API_KEY = 'test-key';

let app: import('express').Express;
let rateLimitMap: Map<string, number>;

beforeAll(async () => {
  const mod = await import('../api');
  app = mod.app;
  rateLimitMap = mod.rateLimitMap;
});

beforeEach(() => {
  generateContentMock.mockReset();
  rateLimitMap.clear();
});

describe('API server', () => {
  it('rejects invalid chat messages', async () => {
    const res = await request(app).post('/api/chat').send({ message: '' });
    expect(res.status).toBe(400);
  });

  it('returns chat responses', async () => {
    generateContentMock.mockResolvedValue({ text: 'Hello there' });
    const res = await request(app).post('/api/chat').send({ message: 'Hi' });
    expect(res.status).toBe(200);
    expect(res.body).toEqual({ text: 'Hello there' });
  });

  it('rate limits repeated requests', async () => {
    generateContentMock.mockResolvedValue({ text: 'Ok' });
    const first = await request(app).post('/api/chat').send({ message: 'Hi' });
    const second = await request(app).post('/api/chat').send({ message: 'Hi again' });
    expect(first.status).toBe(200);
    expect(second.status).toBe(429);
  });

  it('validates risk assessment input', async () => {
    const res = await request(app).post('/api/risk-assessment').send({ industry: 'mining' });
    expect(res.status).toBe(400);
  });

  it('returns risk assessment data', async () => {
    const payload = {
      summary: 'summary',
      hazards: [],
      mitigations: [],
      ppe_requirements: [],
      regulatory_notes: 'notes',
    };
    generateContentMock.mockResolvedValue({ text: JSON.stringify(payload) });
    const res = await request(app)
      .post('/api/risk-assessment')
      .send({ taskDescription: 'desc', industry: 'mining' });
    expect(res.status).toBe(200);
    expect(res.body).toEqual(payload);
  });

  it('returns training modules', async () => {
    const module = {
      title: 'Module',
      objectives: ['one'],
      sections: [{ title: 'Intro', content: 'Content' }],
      quiz: [{ question: 'Q1', options: ['A', 'B'], correctAnswer: 0, explanation: 'Because' }],
    };
    generateContentMock.mockResolvedValue({ text: JSON.stringify(module) });
    const res = await request(app)
      .post('/api/training')
      .send({ role: 'Supervisor', industry: 'mining', risks: 'dust' });
    expect(res.status).toBe(200);
    expect(res.body).toEqual(module);
  });
});
