import { addCucumberPreprocessorPlugin } from '@badeball/cypress-cucumber-preprocessor';
// @ts-expect-error Cannot find module or its corresponding type declarations.
import { createEsbuildPlugin } from '@badeball/cypress-cucumber-preprocessor/esbuild';
// @ts-expect-error Module can only be default-imported using the 'esModuleInterop' flag
import createBundler from '@bahmutov/cypress-esbuild-preprocessor';
import { defineConfig } from 'cypress';

export default defineConfig({
  e2e: {
    baseUrl: 'http://localhost:5173',
    specPattern: '**/*.feature',
    async setupNodeEvents(
      on: Cypress.PluginEvents,
      config: Cypress.PluginConfigOptions,
    ): Promise<Cypress.PluginConfigOptions> {
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
  video: true,
});
