---
id: basic_test_case
title: Basic cypress test with Dev Tools
description: Walkthrough showing the core features of the SmartDriver.
slug: /cypressio-basic-test-case
sidebar_position: 0
---

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

# Basic Test Case
In this tutorial we will walk through converting an existing Cypress.io script to use AI with Dev Tools.

:::tip
A fully setup demo project is available to see the final result https://github.com/dev-tools-ai/js-cypress-sdk-demo
:::

## Install Dependencies
If you haven't done so already, please install Cypress.io and devtools


```jsx
npm install @devtools-ai/cypress-sdk
```


## Integrate SmartDriver
To get started, simply import and add DevTools to your existing Cypress.io suite.
:::note

You will need to change "API_KEY" to the api key you get in the dashboard.

:::

### Add Dev Tools to your support and register it as a plugin
First add Dev Tools to your support files that you would like it to run in. Add the following line to whichever file you'd like.

<Tabs groupId="support-choice">
<TabItem value="cypress-index" label="index.js">

```jsx title="cypress/support/index.js"
import '@devtools-ai/cypress-sdk';
```
</TabItem>
<TabItem value="cypress-e2e" label="e2e.js">

```jsx title="cypress/support/e2e.js"
import '@devtools-ai/cypress-sdk';
```
</TabItem>
</Tabs>

Import Dev Tools as a plugin and disable the Chrome security by adding the following:
<Tabs groupId="language-choice">
<TabItem value="cypress-js" label="cypress.config.js">

```jsx
const { defineConfig } = require("cypress");
// highlight-next-line
const { registerSmartDriverTasks } = require('@devtools-ai/cypress-sdk/dist/plugins');
module.exports = defineConfig({
  e2e: {
    setupNodeEvents(on, config) {
      // highlight-next-line
      registerSmartDriverTasks(on, config);
      // implement node event listeners here
      return config;
    },
  },
  // highlight-next-line
  chromeWebSecurity: false,
});

```
</TabItem>
<TabItem value="cypress-ts" label="cypress.config.ts">

```jsx
import { defineConfig } from 'cypress';
// highlight-next-line
import { registerSmartDriverTasks } from '@devtools-ai/cypress-sdk/dist/plugins';
export default defineConfig({
  e2e: {
    setupNodeEvents(on, config) {
      // highlight-next-line
      registerSmartDriverTasks(on, config);
      // implement node event listeners here
      return config;
    },
  },
  // highlight-next-line
  chromeWebSecurity: false,
});
```
</TabItem>
</Tabs>

### Add your API key
Create a new file in the project root called `smartdriver.config.js`
```jsx title="smartdriver.config.js"
module.exports = {
  apiKey: '??API_KEY??',
};
```


### Sample Test
As an example of smartDriver in action, we will use a basic Cypress.io test case that goes to Github and enters a username for hello world.

```jsx
describe("Should be able to login", () => {
  it("Login", () => {
    cy.visit("http://www.github.com/login");
    cy.get('[name="login"]').type("mysampleemail@gmail.com");
  });
});
```

You can write that same test using DevTools as follows AI
```jsx
describe("Should be able to login", () => {
  it("Login", () => {
    cy.visit("http://www.github.com/login");
    // highlight-next-line
    cy.findByAI('loginBox').type("mysampleemail@gmail.com");
  });
});
```