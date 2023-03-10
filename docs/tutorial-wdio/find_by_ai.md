---
id: find_by_ai
title: AI first method
description: Show how to use an AI first selector.
slug: /wdio-find-by-ai
sidebar_position: 2
---

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';


# Find By AI Method
DevTools adds additional methods to allow you to only use element names to find elements. This will return the WDIO element that represents the visual one.

:::tip

You can write your entire test, and then execute it with [interactive mode](cypressio-interactive-mode) to quickly write larger tests.

:::


We will use the following test case. As the smartdriver runs into the element "searchBox" which it does not know, it will yield a URL in the logs you can use you to draw a bounding box around it to register it. For a more fluid user experience, you can also do it in interactive mode (see the interactive mode entry).

```jsx title="test/specs/example.e2e.js"
describe('DDG test', () => {
    it('should enter hello world', async () => {
        await browser.url(`https://www.duckduckgo.com`);
        await browser.findByAI$('searchBox').keys('Hello World');
        await browser.pause(3000);
    });
});
```
