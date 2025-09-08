/** @type {import("stylelint").Config} */
export default {
    extends: [
        'stylelint-config-standard',
        'stylelint-config-tailwindcss',
        'stylelint-prettier/recommended',
    ],
    rules: {
        // Allow BEM naming convention
        'selector-class-pattern': [
            '^[a-z]([a-z0-9-]+)?(__([a-z0-9]+-?)+)?(--([a-z0-9]+-?)+){0,2}$',
            {
                message: 'Expected class selector to be kebab-case or BEM format',
            },
        ],
        // Allow camelCase for keyframe names
        'keyframes-name-pattern': [
            '^[a-z][a-zA-Z0-9]*$',
            {
                message: 'Expected keyframe name to be camelCase',
            },
        ],
        // Allow Tailwind functions
        'function-no-unknown': [
            true,
            {
                ignoreFunctions: ['theme', 'screen', 'apply'],
            },
        ],
        'declaration-property-value-no-unknown': null,
        'prettier/prettier': true,
        'block-no-empty': true,
        'color-no-invalid-hex': true,
        'font-family-name-quotes': 'always-where-required',
        'font-weight-notation': 'named-where-possible',
        'function-url-no-scheme-relative': true,
        'function-url-quotes': 'always',
        'value-keyword-case': 'lower',
        'unit-disallowed-list': [],
        'no-descending-specificity': true,
        'no-duplicate-selectors': true,
        'font-family-no-missing-generic-family-keyword': null,
        'property-no-unknown': [
            true,
            {
                ignoreProperties: ['/^lost-/', '/^@tailwind/'],
            },
        ],
        // Add Svelte-specific rules
        'selector-pseudo-class-no-unknown': [
            true,
            {
                ignorePseudoClasses: ['global'],
            },
        ],
        'at-rule-no-unknown': [
            true,
            {
                ignoreAtRules: ['tailwind', 'apply', 'layer', 'screen', 'variants', 'responsive'],
            },
        ],
    },
    overrides: [
        {
            files: ['**/*.svelte'],
            customSyntax: 'postcss-html',
        },
    ],
    ignoreFiles: ['node_modules/*', 'src/assets/**', 'build/**', 'dist/**'],
    defaultSeverity: 'error',
}
