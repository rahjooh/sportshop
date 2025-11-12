require('@rushstack/eslint-patch/modern-module-resolution');

/** @type {import('eslint').Linter.Config} */
module.exports = {
    root: true,
    parser: '@typescript-eslint/parser',
    parserOptions: {
        ecmaVersion: 2022,
        sourceType: 'module',
        ecmaFeatures: {
            jsx: true
        }
    },
    env: {
        browser: true,
        node: true,
        es2021: true
    },
    plugins: ['import', 'jsx-a11y', 'react', 'react-hooks', '@next/next'],
    extends: [
        'eslint:recommended',
        'plugin:react/recommended',
        'plugin:react-hooks/recommended',
        'plugin:@next/next/recommended',
        'plugin:@next/next/core-web-vitals'
    ],
    settings: {
        react: {
            version: 'detect'
        },
        'import/resolver': {
            node: {
                extensions: ['.js', '.jsx', '.ts', '.tsx']
            }
        }
    },
    overrides: [
        {
            files: ['**/*.ts', '**/*.tsx'],
            rules: {
                'no-undef': 'off'
            }
        }
    ],
    rules: {
        '@next/next/no-img-element': 'off',
        'import/no-anonymous-default-export': 'warn',
        'react/no-unknown-property': 'off',
        'react/react-in-jsx-scope': 'off',
        'react/prop-types': 'off',
        'jsx-a11y/alt-text': [
            'warn',
            {
                elements: ['img'],
                img: ['Image']
            }
        ],
        'jsx-a11y/aria-props': 'warn',
        'jsx-a11y/aria-proptypes': 'warn',
        'jsx-a11y/aria-unsupported-elements': 'warn',
        'jsx-a11y/role-has-required-aria-props': 'warn',
        'jsx-a11y/role-supports-aria-props': 'warn',
        'react/jsx-no-target-blank': 'off'
    }
};
