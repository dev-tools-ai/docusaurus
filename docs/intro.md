---
id: intro
title: Get Started
sidebar_position: 0
description: Get started with SmartDriver
slug: /
---

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

# Take your existing framework and make it smarter

## 1) Get your API key

Sign-Up/Login to the [dashboard](https://smartdriver.dev-tools.ai), and get your API key from the top right side.

:::tip Note

You can click the copy icon to quickly copy it to your clipboard

:::

![Example API key](../static/img/api-key.png)

## 2) Install SmartDriver

<Tabs groupId="language-choice">
<TabItem value="py" label="Python (selenium)">

```py
pip install devtools-ai
pip install selenium
pip install webdriver_manager # Optional: Used to auto-install ChromeDriver
```

</TabItem>
<TabItem value="java" label="Java (Selenium)">

**pom.xml (Maven)**

```java
<dependency>
    <groupId>ai.dev-tools</groupId>
    <artifactId>ai-devtools-selenium</artifactId>
    <version>0.1.+</version>
</dependency>
```

**build.gradle (Gradle)**

```java
implementation 'ai.dev-tools:ai-devtools-selenium:0.1.+'
```

</TabItem>
<TabItem value="csharp" label="C# (Selenium)">

```c#
Coming soon.
```

</TabItem>
<TabItem value="js" label="JavaScript (Selenium)">

```js
Coming soon.
```

</TabItem>
<TabItem value="cypressio" label="Cypress.io">

```jsx
npm i @devtools-ai/cypress-sdk
```

</TabItem>
</Tabs>

## 3) Run your first test case with Dev Tools

Below is a sample test case using DevTools. Note you only need _2 lines_ to make Dev Tools work

<Tabs groupId="language-choice">
<TabItem value="py" label="Python (selenium)">

```py
from time import sleep

from selenium.webdriver import Chrome
from selenium.webdriver.common.by import By
from selenium.webdriver.chrome.service import Service
from webdriver_manager.chrome import ChromeDriverManager

# highlight-next-line
from devtools_ai.selenium import SmartDriver # Import Dev Tools

def _main() -> None:
    """Main driver"""
    chrome_driver = Chrome(service=Service(ChromeDriverManager().install()))

    # Convert chrome_driver to smartDriver
	# highlight-next-line
    driver = SmartDriver(chrome_driver, "??API_KEY??")

    # Navigate to Google.com
    driver.get("https://google.com")
    sleep(1)

    # Find the searchbox and send "hello world"
    searchbox_element = driver.find_element(By.NAME, 'q')
    searchbox_element.send_keys("hello world\n")

    sleep(2)

    driver.quit()


if __name__ == "__main__":
    _main()
```

</TabItem>
<TabItem value="java" label="Java (Selenium)">

```java
package my.awesome.pkg;

import org.openqa.selenium.By;
import org.openqa.selenium.WebElement;
import org.openqa.selenium.chrome.ChromeDriver;
import org.openqa.selenium.By;

import io.github.bonigarcia.wdm.WebDriverManager;
// highlight-next-line
import ai.devtools.selenium.SmartDriver; // Import DevTools

public class Example
{
	public static void main(String[] args) throws Throwable
	{
		WebDriverManager.chromedriver().setup();
		ChromeDriver chromeDriver = new ChromeDriver();

		try
		{
			// highlight-next-line
			SmartDriver driver = new SmartDriver(chromeDriver, "??API_KEY??");
			driver.get("https://google.com/");

			Thread.sleep(1000);

			WebElement searchBoxElement = driver.findElement(By.name("q"));
			searchBoxElement.sendKeys("hello world\n");

			Thread.sleep(1000);
		}
		finally
		{
			chromeDriver.quit();
		}
	}
}
```

</TabItem>
<TabItem value="csharp" label="C# (Selenium)">

```c#
Coming soon.
```

</TabItem>
<TabItem value="js" label="JavaScript (Selenium)">

```js
Coming soon.
```

</TabItem>
<TabItem value="cypressio" label="Cypress.io">

```jsx
describe("Should be able to login", () => {
  it("Login", () => {
    cy.visit("http://www.github.com/login");
    // highlight-next-line
    cy.get("loginBox").type("mySampleEmail@gmail.com");
  });
});
```

</TabItem>
</Tabs>

## 4) Run your test as normal

The first time you run the test, smartdriver will watch and learn from your test.

When selectors fail in the future, smartdriver will look at the page and identify the element visually.
