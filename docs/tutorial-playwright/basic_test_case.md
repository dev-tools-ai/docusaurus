---
id: basic_test_case
title: Basic SmartDriver Test Case
description: Walkthrough showing the core features of the SmartDriver.
slug: /pw-basic-test-case
sidebar_position: 0
---

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

# Basic Test Case
In this tutorial we will walk through converting an existing Playwright script to use AI with Dev Tools.


## Install Dependencies
If you haven't done so already, please install the devtools package


```jsx
npm install @devtools-ai/playwright-sdk
```

### Add your API key
Devtools AI supports configuration in a .env file (dotenv). At the root of your project create a `.env` file.
The same effect can be obtained by setting environment variables in your terminal.

```jsx title=".env"
DEVTOOLSAI_API_KEY="??API_KEY??"
DEVTOOLSAI_INTERACTIVE=TRUE # or FALSE
```


## Plugin setup & sample test
You will need to add a few lines to your test file to enable the plugin.

```jsx title="tests/example.spec.js"
const base = require('@playwright/test');
const devtools = require('@devtools-ai/playwright-sdk');

// Extend basic test by registering the plugin
const test = base.test.extend({
  page: async ({ page }, use, testInfo) => {
    await devtools.register_devtools(page, testInfo.title);
    await use(page);
  },
});


test('Click on navbar link', async ({ page }) => {
  await page.goto('https://playwright.dev/');
  var element = await page.$("//a[@class='navbar__item navbar__link'][3]")
  await element.click();
  await new Promise((r) => setTimeout(r, 10000));
});
```

This test case will automatically backup the elements that are being interacted with and send them to Devtools AI. If the selector breaks, the test case will use visual AI and still work.

You can then go to https://smartdriver.dev-tools.ai/ to see the results.