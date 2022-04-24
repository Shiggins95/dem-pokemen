module.exports = {
    env: {
        browser: true,
        es2021: true,
    },
    extends: ['plugin:react/recommended', 'google'],
    parser: '@typescript-eslint/parser',
    parserOptions: {
        ecmaFeatures: {
            jsx: true,
        },
        ecmaVersion: 'latest',
        sourceType: 'module',
    },
    plugins: ['react', '@typescript-eslint'],
    rules: {
        'max-len': ['error', { ignoreComments: true, code: 140 }],
        prettier: 'off',
        indent: 'off',
        'quote-props': 'off',
        'object-curly-spacing': 'off',
        'require-jsdoc': 'off',
        'valid-jsdoc': 'off',
        'operator-linebreak': 'off',
        'no-invalid-this': 'off'
    },
};
