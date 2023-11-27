import { addCucumberPreprocessorPlugin } from '@badeball/cypress-cucumber-preprocessor';
// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
import { createEsbuildPlugin } from '@badeball/cypress-cucumber-preprocessor/esbuild';
// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
import createBundler from '@bahmutov/cypress-esbuild-preprocessor';
import { defineConfig } from 'cypress';

export default defineConfig({
  e2e: {
    baseUrl: 'http://localhost:5173',
    specPattern: '**/*.feature',
    async setupNodeEvents(on, config) {
      await addCucumberPreprocessorPlugin(on, config);
      on(
        'file:preprocessor',
        createBundler({ plugins: [createEsbuildPlugin(config)] }),
      );
      return config;
    },
  },
  retries: {
    runMode: 3,
  },
});
