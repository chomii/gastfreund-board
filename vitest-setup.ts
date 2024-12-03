// In your own vitest-setup.js (or any other name)
import '@testing-library/jest-dom/vitest';
import { vi } from 'vitest';

vi.mock('zustand');
