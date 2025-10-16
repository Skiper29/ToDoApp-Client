export default {
    preset: 'ts-jest',
    testEnvironment: 'jest-environment-jsdom',
    transform: {
        "^.+\\.tsx?$": [
            "ts-jest",
            {
                tsconfig: 'tsconfig.app.json'
            }
        ]
    },
    moduleNameMapper: {
        '\\.(gif|ttf|eot|svg|png)$': '<rootDir>/test/__mocks__/fileMock.js',
        '\\.(css|less|scss|sass)$': 'identity-obj-proxy',
        // Path aliases for Jest
        '^@app/(.*)$': '<rootDir>/src/app/$1',
        '^@assets/(.*)$': '<rootDir>/src/assets/$1',
        '^@api/(.*)$': '<rootDir>/src/api/$1',
        '^@components/(.*)$': '<rootDir>/src/components/$1',
        '^@hooks/(.*)$': '<rootDir>/src/hooks/$1',
        '^@models/(.*)$': '<rootDir>/src/models/$1',
        '^@utils/(.*)$': '<rootDir>/src/utils/$1',
        '^@constants/(.*)$': '<rootDir>/src/constants/$1',
        '^@pages/(.*)$': '<rootDir>/src/pages/$1',
        '^@features/(.*)$': '<rootDir>/src/features/$1',
        '^@theme/(.*)$': '<rootDir>/src/theme/$1'
    },
    collectCoverageFrom: [
        'src/**/*.{ts,tsx}',
        '!src/**/*.d.ts',
        '!src/main.tsx',
        '!src/vite-env.d.ts',
    ],
    coverageThreshold: {
        global: {
            branches: 70,
            functions: 70,
            lines: 70,
            statements: 70,
        },
    },
};