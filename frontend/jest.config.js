const nextJest = require('next/jest');

const createJestConfig = nextJest({
  dir: './',
});

const customJestConfig = {
  setupFilesAfterEnv: ['<rootDir>/jest.setup.js'],
  moduleNameMapper: {
    '^@/shared/(.*)$': '<rootDir>/src/shared/$1',
    '^@/ui/(.*)$': '<rootDir>/src/shared/ui/$1',
    '^@/context/(.*)$': '<rootDir>/src/shared/context/$1',
    '^@/data/(.*)$': '<rootDir>/src/shared/data/$1',
    '^@/store/(.*)$': '<rootDir>/src/shared/store/$1',
    '^@/utils/(.*)$': '<rootDir>/src/shared/utils/$1',
    '^@/entities/(.*)$': '<rootDir>/src/entities/$1',
    '^@/features/(.*)$': '<rootDir>/src/features/$1',
    '^@/widgets/(.*)$': '<rootDir>/src/widgets/$1',
    '^@/(.*)$': '<rootDir>/src/$1',
  },
  testEnvironment: 'jest-environment-jsdom',
};

module.exports = createJestConfig(customJestConfig);
