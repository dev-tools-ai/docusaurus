---
id: basic_test_case
title: Basic SmartDriver Test Case
description: Walkthrough showing the core features of the SmartDriver.
slug: /appium-basic-test-case
sidebar_position: 0
---

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';
import CodeBlock from '@theme/CodeBlock';

# Basic Test Case
In this tutorial we will walk through converting an existing Appium script to use AI with SmartDriver


## Install Dependencies
If you haven't done so already, please install appium and devtools

You will first need to install [Appium](https://appium.io/)
```
npm install -g appium
```

Next, install DevTools.
<Tabs groupId="language-choice">
<TabItem value="py" label="Python">

```py
pip install Appium-Python-Client
pip install devtools-ai
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
import ai.devtools.appium.SmartDriver;

SmartDriver driver = new SmartDriver(chromeDriver, "??API_KEY??");

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
As an example, we will start with a basic appium test case that will launch the [Reddit is Fun](https://play.google.com/store/apps/details?id=com.andrewshu.android.reddit) app, and click the new section. You can see the SmartDriver lines added to the script.

<Tabs groupId="language-choice">
<TabItem value="py" label="Python">

```py
import time
import unittest
from appium import webdriver
from appium.webdriver.common.appiumby import AppiumBy

from devtools_ai.appium import SmartDriver


def _main() -> None:
    """Main driver"""
    desired_caps = dict(
        platformName='Android',
        automationName='uiautomator2',
        deviceName='emulator-5554',
        app='/path/to/app.apk' # <-- Replace with a valid APK path
    )
    appium_driver = webdriver.Remote('http://localhost:4723/wd/hub', desired_caps)

    driver = SmartDriver(appium_driver, "??API_KEY??")

    done_button = driver.find_element(by=AppiumBy.XPATH, value='//*[@text="DONE"]')
    done_button.click()
    time.sleep(1)

    new_button = driver.find_element(by=AppiumBy.XPATH, value='//*[@text="NEW"]')
    new_button.click()
    time.sleep(1)


if __name__ == "__main__":
    _main()
```

</TabItem>
<TabItem value="java" label="Java">

```java
package my_package

import io.appium.java_client.MobileBy;
import io.appium.java_client.MobileElement;
import io.appium.java_client.android.AndroidDriver;
import io.appium.java_client.remote.MobileCapabilityType;
import org.junit.jupiter.api.Test;
import org.openqa.selenium.remote.DesiredCapabilities;
import ai.devtools.appium.SmartDriver;

import java.io.File;
import java.net.URL;

public class DefaultDemo {

    @Test public void test() {
        try {
            DesiredCapabilities capabilities = new DesiredCapabilities();
            capabilities.setCapability(MobileCapabilityType.APP, new File("/path_to_apk/redditisfun.apk").getAbsolutePath());
            capabilities.setCapability("allowTestPackages", true);
            capabilities.setCapability("appWaitForLaunch", false);
            capabilities.setCapability("newCommandTimeout", 0);

            System.out.println("Starting test");

            AndroidDriver<MobileElement> androidDriver = new AndroidDriver<MobileElement>(new URL("http://localhost:4723/wd/hub"), capabilities);
            SmartDriver<MobileElement> smartDriver = new SmartDriver<MobileElement>(androidDriver, "??API_KEY??");
            Thread.sleep(5000);
            MobileElement done = smartDriver.findElement(By.xpath("//*[@text=\"DONE\"]"));
            done.click();
            
            MobileElement newb = smartDriver.findElement(By.xpath("//*[@text=\"NEW\"]"));
            newb.click();

            smartDriver.quit();
        } catch(Exception e) {
            e.printStackTrace();
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
done_button = driver.find_element(
    by=AppiumBy.XPATH, value='//*[@text="DONE"]', element_name="done_button")
```

</TabItem>
<TabItem value="java" label="Java">

```java
MobileElement myElement = smartdriver.findElement(MobileBy.id("some_id"), "an_easy_to_use_name");
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
# Convert appium_driver to smartDriver
driver = SmartDriver(appium_driver, "??API_KEY??", {"test_case_name": "My test case"})
```

</TabItem>
<TabItem value="java" label="Java">

```java
HashMap<String, Object> config = new HashMap<String, Object>();
config.put("testCaseName", "My test case");
SmartDriver driver = new SmartDriver<>(chromeDriver, "??API_KEY??", config);
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
