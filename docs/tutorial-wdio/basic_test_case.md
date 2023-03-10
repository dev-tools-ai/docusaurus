---
id: basic_test_case
title: Basic WDIO test with Dev Tools
description: Walkthrough showing the core features of the SmartDriver.
slug: /wdio-basic-test-case
sidebar_position: 0
---

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

# Basic Test Case
In this tutorial we will walk through converting an existing WDIO script to use AI with Dev Tools.


## Install Dependencies
If you haven't done so already, please install the devtools package


```jsx
npm install @devtools-ai/wdio-sdk
```


## Plugin setup
You will need to edit wdio.conf.js to enable the plugin by adding the following stanza.

```jsx title="wdio.conf.js"
beforeSuite: async function (suite) {
    const devtoolsai_plugin = require('@devtools-ai/wdio-sdk');
    await devtoolsai_plugin.register(suite.title);
},
```

### Add your API key
Devtools AI supports configuration in a .env file (dotenv). At the root of your project create a `.env` file.
The same effect can be obtained by setting environment variables in your terminal.

```jsx title=".env"
DEVTOOLSAI_API_KEY="??API_KEY??"
DEVTOOLSAI_INTERACTIVE=TRUE # or FALSE
```


### Sample Test
As an example of smartDriver in action, we will use a basic wdio test case that goes to Github and enters a username.

```jsx title="test/specs/example.e2e.js"
describe('GH tests', () => {
    it('should enter username', async () => {
        await browser.url(`https://github.com/login`);
        await browser.$('//input[@id="login_field"]').keys('my_username');
        await browser.pause(3000);
    });
});
```

This test case will automatically backup the elements that are being interacted with and send them to Devtools AI. If the selector breaks, the test case will use visual AI and still work.

You can then go to https://smartdriver.dev-tools.ai/ to see the results.