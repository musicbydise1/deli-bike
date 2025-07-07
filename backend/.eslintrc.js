/* ..eslintrc.js */
module.exports = {
    root: true,
    parser: '@typescript-eslint/parser',
    parserOptions: {
        project: ['./tsconfig.json'],      // чтобы ESLint понимал пути и типы
        tsconfigRootDir: __dirname,
        sourceType: 'module',
    },
    plugins: ['@typescript-eslint', 'prettier'],
    extends: [
        'eslint:recommended',
        'plugin:@typescript-eslint/recommended',
        // последняя строка выключает правила, пересекающиеся с prettier
        'plugin:prettier/recommended',
    ],
    env: {
        node: true,
        es2021: true,
    },
    ignorePatterns: ['dist', 'node_modules', '*.js'], // исключения
    rules: {
        // примеры кастомных правил (при желании измените)
        '@typescript-eslint/no-unused-vars': ['warn', { argsIgnorePattern: '^_' }],
        '@typescript-eslint/explicit-module-boundary-types': 'off',

        // любое несоответствие Prettier -> ошибка
        'prettier/prettier': 'error',
    },
};