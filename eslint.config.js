// https://docs.expo.dev/guides/using-eslint/
const { defineConfig } = require("eslint/config");
const expoConfig = require("eslint-config-expo/flat");
const prettier = require("eslint-config-prettier");
const importX = require("eslint-plugin-import-x");
const simpleImportSort = require("eslint-plugin-simple-import-sort");
const noSecrets = require("eslint-plugin-no-secrets");
const {
  createTypeScriptImportResolver,
} = require("eslint-import-resolver-typescript");
const reactHooks = require("eslint-plugin-react-hooks");

module.exports = defineConfig([
  expoConfig,
  reactHooks.configs.flat.recommended,
  prettier,
  importX.flatConfigs.recommended,
  importX.flatConfigs.typescript,
  {
    ignores: ["dist/*"],
    plugins: {
      "simple-import-sort": simpleImportSort,
      "no-secrets": noSecrets,
    },
    settings: {
      "import-x/resolver-next": [
        createTypeScriptImportResolver({
          alwaysTryTypes: true,
          project: "./tsconfig.json",
        }),
      ],
    },
    rules: {
      // Simple import sort
      "simple-import-sort/imports": "error",
      "simple-import-sort/exports": "error",

      // Import-x rules
      "import-x/first": "error",
      "import-x/newline-after-import": "error",
      "import-x/no-duplicates": "error",

      // No secrets
      "no-secrets/no-secrets": "error",
    },
  },
]);
