module.exports = {
  preset: 'ts-jest',
  detectOpenHandles: true,
  forceExit: true,
  transform: {
    '^.+\\.(ts|tsx)?$': 'ts-jest',
    "^.+\\.(js|jsx)$": "babel-jest",
  }
};
