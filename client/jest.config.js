module.exports = {
  setupFilesAfterEnv: ['./jest.setup.ts'],
  moduleNameMapper: {
    '^components(.*)$': '<rootDir>/components$1',
    '^pages(.*)$': '<rootDir>/pages$1',
    '^hooks(.*)$': '<rootDir>/hooks$1',
    '^utils(.*)$': '<rootDir>/utils$1',
    '^assets(.*)$': '<rootDir>/assets$1',
    '\\.svg$': '<rootDir>/__mocks__/svgrMock.tsx',
  },
  transform: {
    '^.+\\.tsx?$': 'babel-jest',
    '^.+\\.svg$': 'jest-svg-transformer',
  },
};
