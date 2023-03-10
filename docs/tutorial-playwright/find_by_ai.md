---
id: find_by_ai
title: AI first method
description: Show how to use an AI first selector.
slug: /pw-find-by-ai
sidebar_position: 2
---

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';


# Find By AI Method
DevTools adds additional methods to allow you to only use element names to find elements. This will return the Playwright element that represents the visual one.

:::tip

You can write your entire test, and then execute it with [interactive mode](cypressio-interactive-mode) to quickly write larger tests.

:::


We will use the following test case. As the smartdriver runs into the element "searchBox" which it does not know, it will yield a URL in the logs you can use you to draw a bounding box around it to register it. For a more fluid user experience, you can also do it in interactive mode (see the interactive mode entry).

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


test('Search duck duck go', async ({ page }) => {
  await page.goto('https://duckduckgo.com/');
  var element = await page.findByAI("searchBox")
  await element.type('Hello World');
  await new Promise((r) => setTimeout(r, 10000));
});
```
