module.exports = {
    preset: 'ts-jest',
    testEnvironment: 'node',
    coverageDirectory: "./coverage",
    testMatch: [
        "**/?(*.)+(spec).ts"
    ],
    resetMocks: true,
    clearMocks: true,
};
