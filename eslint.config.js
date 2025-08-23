import js from '@eslint/js'
import prettier from 'eslint-config-prettier'
import svelte from 'eslint-plugin-svelte'
import globals from 'globals'
import svelteConfig from './svelte.config.js'

export default [
    {
        ignores: ['node_modules/**', 'dist/**', 'build/**', 'public/**', '.svelte-kit/**'],
    },

    js.configs.recommended,
    ...svelte.configs['flat/recommended'],

    {
        languageOptions: {
            globals: {
                ...globals.browser,
                ...globals.node, // For build scripts and config files
            },
            ecmaVersion: 2022,
            sourceType: 'module',
        },
        rules: {
            // Relax some overly strict rules for personal projects
            'no-unused-vars': [
                'warn',
                {
                    argsIgnorePattern: '^_',
                    varsIgnorePattern: '^_',
                },
            ],
            'no-console': 'off',
        },
    },

    {
        files: ['**/*.svelte'],
        languageOptions: {
            parserOptions: {
                svelteConfig,
            },
        },
        rules: {
            // Svelte-specific rules
            'svelte/no-target-blank': 'error',
            'svelte/no-at-debug-tags': 'warn',
            'svelte/no-reactive-functions': 'off', // Sometimes useful in personal projects
        },
    },

    {
        files: ['vite.config.js', 'svelte.config.js', 'eslint.config.js'],
        languageOptions: {
            globals: {
                ...globals.node,
            },
        },
    },

    prettier, // Keep Prettier as the last config
]
