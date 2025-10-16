export default {
    preset: 'ts-jest',
    testEnvironment: 'jest-environment-jsdom',
    transform: {
        "^.+\\.tsx?$": [
            "ts-jest",
            {
                tsconfig: 'tsconfig.jest.json'
            }
        ]
    },
    moduleNameMapper: {
        '\\.(gif|ttf|eot|svg|png)$': '<rootDir>/test/__mocks__/fileMock.js',
        // Аліаси шляхів для Jest
        '^@components/(.*)$': '<rootDir>/src/components/$1',
        '^@models/(.*)$': '<rootDir>/src/models/$1',
        '^@hooks/(.*)$': '<rootDir>/src/hooks/$1',
        '^@features/(.*)$': '<rootDir>/src/features/$1',
        '^@constants/(.*)$': '<rootDir>/src/constants/$1',
        '^@api/(.*)$': '<rootDir>/src/api/$1',
        '^@theme/(.*)$': '<rootDir>/src/theme/$1',
        '^@pages/(.*)$': '<rootDir>/src/pages/$1',
        '^@app/(.*)$': '<rootDir>/src/app/$1',
        '^@utils/(.*)$': '<rootDir>/src/utils/$1',
        '^@assets/(.*)$': '<rootDir>/src/assets/$1'
    },

};