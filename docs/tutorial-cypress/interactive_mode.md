---
id: interactive_mode
title: Interactive Mode
description: Show how to build tests in realtime with SmartDriver.
slug: /cypressio-interactive-mode
sidebar_position: 3
---

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

# Use Interactive Mode to Build New Test Cases
SmartDriver helps you write tests faster by skipping the need to build selectors for each element. Instead it will pause the test when an element isn't known so you can teach the bot where the element is on the screen.

## Enable SmartDriver Interactive Mode
To enable SmartDriver first set an environment variable to tell SmartDriver to pause tests when it doesn't find an element, which allows you to teach it where those elements are on the screen.
<Tabs groupId="OS-choice">
<TabItem value="mac" label="MacOS">

```sh
export DEVTOOLSAI_INTERACTIVE=TRUE
```

</TabItem>
<TabItem value="windows" label="Windows">

```sh
set DEVTOOLSAI_INTERACTIVE=TRUE
```

</TabItem>
<TabItem value="linux" label="Linux">

```sh
export DEVTOOLSAI_INTERACTIVE=TRUE
```

</TabItem>
</Tabs>

## Interactive Mode Quickstart
The best way to use interactive mode is when writing new test cases. You can start with writing out test steps in your preferred language, using the `findByAI()` method for the elements.


### Write Out Test Steps
An example for searching DuckDuckGo would look like the following.

```jsx
describe("Search DuckDuckGo", () => {
  it("Login", () => {
    cy.visit("https://www.duckduckgo.com");
    cy.findByAI('searchBox').type("hello world");
  });
});
```

### Execute Test
*After* enabling interactive mode, run your test as normal. When Dev Tools tries to execute a step where it doesn't see the label, then it will open a new window to allow you to label the element.

Below is an example of this in action:
![Interactive Test Example](../../static/img/interactive.gif)