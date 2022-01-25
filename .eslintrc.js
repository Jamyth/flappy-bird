/** @type {import('eslint').Linter.Config} */
const config = {
    ignorePatterns: ['**/node_modules/**', '**/dist/**', '**/test/**'],
    extends: ['iamyth/preset/react'],
    root: true,
    rules: {
        'react/prop-types': 'off'
    }
};

module.exports = config;