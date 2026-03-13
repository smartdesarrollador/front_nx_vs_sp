import type { Config } from 'jest';
import nextJest from 'next/jest.js';

const createJestConfig = nextJest({ dir: './' });

const config: Config = {
  coverageProvider: 'v8',
  testEnvironment: 'jsdom',
  setupFilesAfterEnv: ['<rootDir>/jest.setup.ts'],
  testMatch: ['<rootDir>/src/__tests__/**/*.test.{ts,tsx}'],
  moduleNameMapper: {
    '^@/(.*)$': '<rootDir>/src/$1',
  },
  collectCoverageFrom: [
    'src/components/tarjeta/**/*.{ts,tsx}',
    'src/components/landing/**/*.{ts,tsx}',
    'src/components/cv/templates/**/*.{ts,tsx}',
    'src/components/dashboard/**/*.{ts,tsx}',
    'src/features/tarjeta/components/**/*.{ts,tsx}',
    'src/hooks/useFeatureGate.ts',
    'src/hooks/useSSO.ts',
    '!src/**/*.d.ts',
  ],
  coverageThreshold: {
    global: { lines: 45, functions: 50, branches: 50, statements: 45 },
  },
};

export default createJestConfig(config);
