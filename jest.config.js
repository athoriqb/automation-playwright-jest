/** @type {import('ts-jest').JestConfigWithTsJest} */
module.exports = {
    preset: 'ts-jest',
    testEnvironment: 'node',
    testMatch: ['**/tests/api/**/*.test.ts'],
    reporters: [
        'default',
        ['jest-html-reporter', {
            pageTitle: 'API Test Report',
            outputPath: './reports/api-report.html',
            includeFailureMsg: true,
            includeConsoleLog: true
        }]
    ]
};