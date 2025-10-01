/** @type {import("stylelint").Config} */
export default {
    extends: ['stylelint-config-standard-scss', 'stylelint-prettier/recommended'],
    rules: {
        'at-rule-no-unknown': null,
        'scss/at-rule-no-unknown': true,
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
        'selector-pseudo-class-no-unknown': [
            true,
            {
                ignorePseudoClasses: ['global'],
            },
        ],

        'selector-class-pattern': null,
        'selector-id-pattern': null,

        'property-no-unknown': [
            true,
            {
                ignoreProperties: ['content-visibility'],
            },
        ],
        'scss/dollar-variable-pattern': null,
        'scss/percent-placeholder-pattern': null,
        'property-no-vendor-prefix': null,
        'value-no-vendor-prefix': null,
        'custom-property-pattern': null,

        'max-nesting-depth': 4,
        'selector-max-compound-selectors': 5,
    },
    ignoreFiles: ['node_modules/*', 'src/assets/**', 'dist/**', '*.min.css'],
    defaultSeverity: 'error',
}
