module.exports = {
    "env": {
        "browser": true,
        "es2021": true
    },
    "extends": [
        "standard-with-typescript",
        "plugin:react/recommended"
    ],
    "overrides": [
        {
            "env": {
                "node": true
            },
            "files": [
                ".eslintrc.{js,cjs}"
            ],
            "parserOptions": {
                "sourceType": "script"
            }
        }
    ],
    "parserOptions": {
        "ecmaVersion": "latest",
        "sourceType": "module",
        project: ['./tsconfig.json', './tsconfig.node.json'],
    },
    "plugins": [
        "react"
    ],
    "rules": {
        "@typescript-eslint/explicit-function-return-type": "off",
        "@typescript-eslint/space-before-function-paren": "off",
        "react/react-in-jsx-scope": "off",
        "@typescript-eslint/strict-boolean-expressions": "off",
        "@typescript-eslint/consistent-type-assertions": "off",
        "@typescript-eslint/triple-slash-reference": "off",
        "@typescript-eslint/no-non-null-assertion": "off",
        "@typescript-eslint/promise-function-async": "off",
    },
    "ignorePatterns": [".eslintrc.cjs", "vitest.config.ts", "vite.config.ts"],
    "settings": {
        "react": {
            "version": "detect"
        }
    }
}
