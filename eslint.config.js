import eslint from '@eslint/js'
import prettierConfig from 'eslint-config-prettier'
import prettierPlugin from 'eslint-plugin-prettier'
import svelte from 'eslint-plugin-svelte'
import globals from 'globals'
import svelteParser from 'svelte-eslint-parser'
import tslint from 'typescript-eslint'
import svelteConfig from './svelte.config.js'

export default [
    {
        ignores: ['node_modules/**', 'dist/**', 'build/**', 'public/**'],
    },
    eslint.configs.recommended,
    {
        languageOptions: {
            globals: {
                ...globals.browser,
                ...globals.node,
            },
            ecmaVersion: 2022,
            sourceType: 'module',
        },
    },
    {
        files: ['**/*.{js,ts}'],
        ...tslint.configs.strict[0],
        ...tslint.configs.stylistic[0],
        languageOptions: {
            parser: tslint.parser,
            parserOptions: {
                project: './tsconfig.json',
                tsconfigRootDir: import.meta.dirname,
            },
        },
        plugins: {
            '@typescript-eslint': tslint.plugin,
            prettier: prettierPlugin,
        },
        rules: {
            'no-unused-vars': 'off',
            'no-console': 'warn',
            '@typescript-eslint/no-unused-vars': [
                'warn',
                {
                    argsIgnorePattern: '^_',
                    varsIgnorePattern: '^_',
                    destructuredArrayIgnorePattern: '^_',
                },
            ],
            semi: ['error', 'always'],
            quotes: ['error', 'double'],
            'prettier/prettier': 'error',
        },
    },
    ...svelte.configs['flat/recommended'],
    {
        files: ['**/*.svelte'],
        languageOptions: {
            parser: svelteParser,
            parserOptions: {
                parser: tslint.parser,
                svelteConfig,
                extraFileExtensions: ['.svelte'],
            },
        },
        plugins: {
            prettier: prettierPlugin,
        },
        rules: {
            'svelte/no-target-blank': 'error',
            'svelte/no-at-debug-tags': 'warn',
            'svelte/no-reactive-functions': 'off',
            '@typescript-eslint/no-unused-vars': 'off',
            'no-unused-vars': 'off',
            'prettier/prettier': 'error',
        },
    },
    {
        files: ['vite.config.js', 'svelte.config.js', 'eslint.config.js', 'stylelint.config.js'],
        languageOptions: {
            parser: tslint.parser,
            parserOptions: {
                project: null,
            },
        },
        rules: {
            '@typescript-eslint/no-unused-vars': 'off',
        },
    },
    prettierConfig,
]
