require('@testing-library/react');
require("@testing-library/jest-dom");

const originalError = console.error;

console.error = (s, ...args) => {
  if (
    typeof s === 'string' &&
    !s.match('Warning: react-modal') &&
    !s.match('act(...)')
  ) {
    originalError(s, ...args);
    throw new Error('Error occurred in testing')
  }
};
