---
id: basic_test_case
title: Basic SmartDriver Test Case
description: Walkthrough showing the core features of the SmartDriver.
slug: /selenium-basic-test-case
sidebar_position: 0
---

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

# Basic Test Case
In this tutorial we will walk through converting an existing Selenium script to use AI with SmartDriver

## Install Dependencies
If you haven't done so already, please install selenium and devtools

<Tabs groupId="language-choice">
<TabItem value="py" label="Python">

```py
pip install selenium
pip install devtools-ai
pip install webdriver_manager # Optional: Used to auto-install ChromeDriver
```

</TabItem>
<TabItem value="java" label="Java">

**pom.xml (Maven)**
```java
<dependency>
    <groupId>ai.dev-tools</groupId>
    <artifactId>ai-devtools</artifactId>
    <version>0.1.+</version>
</dependency>
```


**build.gradle (Gradle)**
```java
implementation 'ai.dev-tools:ai-devtools:0.1.+'
```

</TabItem>
<TabItem value="csharp" label="C#">

```c#
Coming soon.
```

</TabItem>
<TabItem value="js" label="JavaScript">

```js
Coming soon.
```

</TabItem>
<TabItem value="rb" label="Ruby">

```rb
Coming soon.
```

</TabItem>
</Tabs>


## Integrate SmartDriver
To get started, simply import and add SmartDriver to your existing test script.
:::note

You will need to change "API_KEY" to the api key you get in the dashboard.

:::
<Tabs groupId="language-choice">
<TabItem value="py" label="Python">

```py
from devtools_ai.appium import SmartDriver

driver = SmartDriver(driver, "??API_KEY??")
```

</TabItem>
<TabItem value="java" label="Java">

```java
import ai.devtools.selenium.SmartDriver;

SmartDriver baseDriver = new SmartDriver(chromeDriver, "??API_KEY??");
```

</TabItem>
<TabItem value="csharp" label="C#">

```c#
Coming soon.
```

</TabItem>
<TabItem value="js" label="JavaScript">

```js
Coming soon.
```

</TabItem>
<TabItem value="rb" label="Ruby">

```rb
Coming soon.
```

</TabItem>
</Tabs>


### Sample Test
As an example of Dev Tools in action, we will use a basic selenium test case that goes to Google and searches for hello world. You can see the SmartDriver lines added to the script.


<Tabs groupId="language-choice">
<TabItem value="py" label="Python">

```py
from time import sleep

from selenium.webdriver import Chrome
from selenium.webdriver.common.by import By
from selenium.webdriver.chrome.service import Service
from webdriver_manager.chrome import ChromeDriverManager

from devtools_ai.selenium import SmartDriver

def _main() -> None:
    """Main driver"""
    chrome_driver = Chrome(service=Service(ChromeDriverManager().install()))

    # Convert chrome_driver to smartDriver
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
<TabItem value="java" label="Java">

```java
package my.awesome.pkg;

import org.openqa.selenium.By;
import org.openqa.selenium.WebElement;
import org.openqa.selenium.By;
import org.openqa.selenium.chrome.ChromeDriver;


import io.github.bonigarcia.wdm.WebDriverManager;
// Import DevTools
import ai.devtools.selenium.SmartDriver;

public class Example
{
	public static void main(String[] args) throws Throwable
	{
		WebDriverManager.chromedriver().setup();
		ChromeDriver chromeDriver = new ChromeDriver();

		try
		{
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
<TabItem value="csharp" label="C#">

```c#
Coming soon.
```

</TabItem>
<TabItem value="js" label="JavaScript">

```js
Coming soon.
```

</TabItem>
<TabItem value="rb" label="Ruby">

```rb
Coming soon.
```

</TabItem>
</Tabs>

## Adding Element Names
SmartDriver allows you to add element names for given selectors by passing it in as an optional paramater. This is useful when managing elements in the dashboard UI.
<Tabs groupId="language-choice">
<TabItem value="py" label="Python">

```py
# Find the searchbox and send "hello world"
searchbox_element = driver.find_element_by_name("q", element_name="searchbox")
```

</TabItem>
<TabItem value="java" label="Java">

```java
WebElement searchBoxElement = driver.findElement(By.name("q"), "searchbox");
```

</TabItem>
<TabItem value="csharp" label="C#">

```c#
Coming soon.
```

</TabItem>
<TabItem value="js" label="JavaScript">

```js
Coming soon.
```

</TabItem>
<TabItem value="rb" label="Ruby">

```rb
Coming soon.
```

</TabItem>
</Tabs>


## Adding Test Case Names
SmartDriver allows you to add a name for your test case. This is used in the dashboard for grouping all of your element.

To add a test case name, pass it in when initializing the SmartDriver.
<Tabs groupId="language-choice">
<TabItem value="py" label="Python">

```py
# Convert chrome_driver to smartDriver
driver = SmartDriver(chrome_driver, "??API_KEY??", {"test_case_name": "My test case"})
```

</TabItem>
<TabItem value="java" label="Java">

```java
HashMap<String, Object> config = new HashMap<String, Object>();
config.put("testCaseName", "My test case");
SmartDriver baseDriver = new SmartDriver(chromeDriver, "??API_KEY??", config);
```

</TabItem>
<TabItem value="csharp" label="C#">

```c#
Coming soon.
```

</TabItem>
<TabItem value="js" label="JavaScript">

```js
Coming soon.
```

</TabItem>
<TabItem value="rb" label="Ruby">

```rb
Coming soon.
```

</TabItem>
</Tabs>
