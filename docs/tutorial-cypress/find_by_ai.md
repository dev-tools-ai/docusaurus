---
id: find_by_ai
title: AI first method
description: Show how to use an AI first selector.
slug: /cypressio-find-by-ai
sidebar_position: 2
---

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';


# Find By AI Method
DevTools adds additional methods to allow you to only use element names to find elements. This will return the cypress element that represents the visual one.

Below is the same test case as the basic example where we will search for hello world on DuckDuckGo.com.

:::tip

You can write your entire test, and then execute it with [interactive mode](cypressio-interactive-mode) to quickly write larger tests.

:::

```jsx
describe("Search DuckDuckGo", () => {
  it("Login", () => {
    cy.visit("https://www.duckduckgo.com");
    cy.findByAI('searchBox').type("hello world");
  });
});
```
