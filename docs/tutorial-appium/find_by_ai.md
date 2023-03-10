---
id: find_by_ai
title: AI first method
description: Show how to use an AI first selector.
slug: /appium-find-by-ai
sidebar_position: 2
---

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';


# Find By AI Method
SmartDriver adds additional methods to allow you to only use element names to find elements. This will return the MobileElement that best matches the visual one.

Below is the same test case as the basic example where we will go into the "new" section of the app.

:::tip

You can write your entire test, and then execute it with [interactive mode](appium-interactive-mode) to quickly write larger tests.

:::

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

    done_button = driver.find_by_ai('done_button')
    done_button.click()
    time.sleep(1)

    new_button = driver.find_by_ai('new_button')
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
            MobileElement doneButton = smartDriver.findByAI("done_button");
            doneButton.click();
            
            MobileElement newButton = smartDriver.findByAI("new_button");
            newButton.click();

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
