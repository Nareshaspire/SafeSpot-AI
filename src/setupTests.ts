import '@testing-library/jest-dom/vitest';

if (!globalThis.IntersectionObserver) {
  class IntersectionObserver {
    readonly root = null;
    readonly rootMargin = '';
    readonly thresholds: number[] = [];

    observe() {}
    unobserve() {}
    disconnect() {}
    takeRecords(): IntersectionObserverEntry[] {
      return [];
    }
  }

  globalThis.IntersectionObserver = IntersectionObserver as unknown as typeof globalThis.IntersectionObserver;
}
