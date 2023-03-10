---
title: Seeing elements in your IDE
description: How to visualize selectors
slug: see-elements-in-ide
authors:
  - name: Chris Navrides
    title: Co-founder & CEO of Dev Tools
    url: https://www.linkedin.com/in/chris-navrides/
    image_url: /img/chris.jpeg

tags: [Python, Selenium, VSCode, IDE]
image: https://i.imgur.com/8WF2nRY.png
hide_table_of_contents: false
---
![visualize locators](https://i.imgur.com/8WF2nRY.png)

# Maintaining Automation is Hard
I have written and maintained mostly mobile test scripts for my whole career. It is really hard to keep track of which element is where on a page. Good resource names are helpful, comments are great, but in a codebase with multiple contributors that is hard to always keep clean.

# Idea
When talking to my friend [**Kirk**](https://www.linkedin.com/in/kirksl/) we were discussing this exact problem of maintaining test scripts. We thought; "wouldn't it be awesome if we could visualize the locators when we are writing/looking at the tests?"

Right then a light bulb went off. Kirk, who has developed plugins for VSCode, knew there may be a way to do this if we could host the element image. With Dev Tools we have the element image for all the locators. So we quickly sketched out how we could do this and got to work.

# How it works
In VSCode we a plugin can read the content of your script. There are decorators already that will show a method's doc string. However, we only needed doc string for locator methods. To solve this we had to build a regex to find the various locator methods that a framework can have.

Here's an example of Selenium Python's locator checks we built:
```jsx
let matches = line.match(/.(find_[^(]+)\(([^)]+)\)/);
```

Next we had to let the user know that we have added this functionality. To do this we found a way to include our company logo as an icon and put it next to the locators. We also added an udnerline to the locator to show it had a mouse over property now.

The final product is the image you see above. You can try it for yourself on the [**VSCode Marketplace**](https://marketplace.visualstudio.com/items?itemName=devtools-ai.devtools-ai) and let us know what you think.

*NOTE*: It currently only supports Python Selenium, but more languages and frameworks will be coming in the next few weeks.

# How can it be better?
We have made this an open source project [**here**](https://github.com/dev-tools-ai/devtoolsai-vscode-plugin). We welcome any pull requests or feature requests.

We are also avaible on our [**Discord**](https://discord.gg/2J9WEYdq5C) if you want to discuss more about this or testing/automation in general :)