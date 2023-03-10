---
id: find_by_ai
title: AI first method
description: Show how to use an AI first selector.
slug: /selenium-find-by-ai
sidebar_position: 2
---

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';


# Find By AI Method
SmartDriver adds additional methods to allow you to only use element names to find elements. This will return the Selenium Element that best matches the visual one.

Below is the same test case as the basic example where we will search for hello world on Google.com.

:::tip

You can write your entire test, and then execute it with [interactive mode](selenium-interactive-mode) to quickly write larger tests.

:::

<Tabs groupId="language-choice">
<TabItem value="py" label="Python">

```py
from time import sleep

from selenium.webdriver import Chrome
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
    searchbox_element = driver.find_by_ai("searchbox")
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

import org.openqa.selenium.WebElement;
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

			WebElement searchBoxElement = driver.findByAI("searchbox");
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
