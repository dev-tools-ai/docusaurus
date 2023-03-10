---
title: Testing apps with Appium and Java
description: All the steps to enable Appium based testing
slug: java-appium
authors:
  - name: Etienne DEGUINE
    title: Co-founder & CTO of Dev Tools
    url: https://www.linkedin.com/in/etiennedeguine/
    image_url: /img/etienne.jpeg

tags: [Appium, Java, testing]
image: https://imgur.com/a/TteitpR
hide_table_of_contents: false
---
# Testing Android and iOS apps with Appium
![Light on dichroic cubes](https://i.imgur.com/X30pVgz.png)
## Intro
In this post we will show you how to set up your automation for iOS (XCUITest) and Android (uiAutomator2, Espresso) with Appium Java.

## Scenario
We want to perform basic UI testing on mobile apps.

## General idea
To automate an app, we will use Appium, which is inspired by Selenium and provides the necessary capabilities to automate. Each framework requires a set of capabtilities to be passed to the driver, this is typically the painful step to setup, which is why we give you here an overview.

# iOS - XCUITest
The default automation for iOS is called XCUITest (XCode UI test). You need to have access to the build output in the form of a .app file or .ipa file to automate on iOS. Overall it's super easy and did not give us any issues.

```java MyTest.java
import io.appium.java_client.MobileElement;
import io.appium.java_client.ios.IOSDriver;
import org.openqa.selenium.remote.DesiredCapabilities;
import ai.devtools.appium.SmartDriver;

DesiredCapabilities capabilities = new DesiredCapabilities();
capabilities.setCapability("app", new File("/Users/etienne/apps/SampleApp.app").getAbsolutePath());
capabilities.setCapability("allowTestPackages", true);
capabilities.setCapability("appWaitForLaunch", false);
capabilities.setCapability("newCommandTimeout", 0);
capabilities.setCapability("automationName", "XCUITest");
capabilities.setCapability("platformName", "iOS");
capabilities.setCapability("platformVersion", "14.4");
capabilities.setCapability("deviceName", "iPhone 12 Pro Max");

IOSDriver<MobileElement> androidDriver = new IOSDriver<MobileElement>(new URL("http://localhost:4723/wd/hub"), capabilities);
SmartDriver<MobileElement> smartDriver = new SmartDriver<MobileElement>(androidDriver, "<<get your api key at dev-tools.ai>>");

MobileElement element = smartDriver.findByAI("appium_username_field");
element.click();
element.sendKeys("etienne");
```

# Android - UiAutomator2
This one is similar to iOS, it's pretty straightforward.
```java MyTest.java
import io.appium.java_client.MobileElement;
import io.appium.java_client.android.AndroidDriver;
import org.openqa.selenium.remote.DesiredCapabilities;
import ai.devtools.appium.SmartDriver;

DesiredCapabilities capabilities = new DesiredCapabilities();
capabilities.setCapability("app", new File("/Users/etienne/apks/todoist.apk").getAbsolutePath());
capabilities.setCapability("allowTestPackages", true);
capabilities.setCapability("appWaitForLaunch", false);
capabilities.setCapability("newCommandTimeout", 0);

AndroidDriver<MobileElement> androidDriver = new AndroidDriver<MobileElement>(new URL("http://localhost:4723/wd/hub"), capabilities);
SmartDriver<MobileElement> smartDriver = new SmartDriver<MobileElement>(androidDriver,  "<<get your api key at dev-tools.ai>>");

MobileElement element = smartDriver.findByAI("todoist_username");
element.click();
element.sendKeys("etienne");
```

# Android - Espresso
This is where things get tricky. We noticed that there is a lot of fine grained details to setup so that Espresso can build and run properly on Android.
Here is what we ended up with.

```java MyTest.java
DesiredCapabilities capabilities = new DesiredCapabilities();
capabilities.setCapability("app", new File("/Users/etienne/apks/app-release.apk").getAbsolutePath());
capabilities.setCapability("allowTestPackages", true);
capabilities.setCapability("appWaitForLaunch", false);
capabilities.setCapability("newCommandTimeout", 0);
capabilities.setCapability("automationName", "Espresso");
capabilities.setCapability("platformName", "Android");
capabilities.setCapability("platformVersion", "9");
capabilities.setCapability("appium:remoteAdbHost", "0.0.0.0");
capabilities.setCapability("appium:host", "0.0.0.0");
capabilities.setCapability("appium:useKeystore", true);
capabilities.setCapability("appium:keystorePath", "/Users/etienne/Documents/old_format_keystore.keystore");
capabilities.setCapability("appium:keystorePassword", "test");
capabilities.setCapability("appium:keyAlias", "key0");
capabilities.setCapability("appium:keyPassword", "test");
capabilities.setCapability("forceEspressoRebuild", true);
capabilities.setCapability("udid", "emulator-5554");
capabilities.setCapability("noReset", false);
capabilities.setCapability("espressoBuildConfig", "{ \"additionalAppDependencies\": [ \"androidx.lifecycle:lifecycle-extensions:2.2.0\" ] }");
```

Let's take a look at what is going on

### IPv6 confusion in Appium
```java
capabilities.setCapability("appium:remoteAdbHost", "0.0.0.0");
capabilities.setCapability("appium:host", "0.0.0.0");
```
In the Appium version we used (1.22), Appium insisted on converting localhost to ipv6 (:::1) instead of 0.0.0.0, so we have to specify it explicitly. This issue only came up for Espresso in our experimentation.

### Signing the APK
```java
capabilities.setCapability("appium:useKeystore", true);
capabilities.setCapability("appium:keystorePath", "/Users/etienne/Documents/old_format_keystore.keystore");
capabilities.setCapability("appium:keystorePassword", "test");
capabilities.setCapability("appium:keyAlias", "key0");
capabilities.setCapability("appium:keyPassword", "test");
```
Due to the way it's built and run, Espresso needs to be signed with a keystore. 
Furthermore we had issues using a modern version of java so we had to use ```adoptopenjdk-8.jdk``` (Java 1.8) and use a keystore in the old java format.

### Creating the keystore
This is a standard java command to create the keystore. You need to make sure Android Studio uses the same keystore for signing your APK with release keys.
```bash
export JAVA_HOME=/Library/Java/JavaVirtualMachines/adoptopenjdk-8.jdk/Contents/Home/
$JAVA_HOME/bin/keytool -genkey -v -keystore ~/Documents/old_format_keystore.keystore -alias key0 -keyalg RSA -keysize 2048 -validity 10000
```

### Building Espresso
Espresso requires a lot of dependencies and build options to be successful. 
We zeroed in on a configuration that worked. It might not be optimal but at least it works!

In terms of driver caps we need to specify the dependencies in the `espressoBuildConfig`
```java
capabilities.setCapability("forceEspressoRebuild", true);
capabilities.setCapability("espressoBuildConfig", "{ \"additionalAppDependencies\": [ \"androidx.lifecycle:lifecycle-extensions:2.2.0\" ] }");
```

And in Android Studio in the app's build.gradle
```java
dependencies {
    implementation 'androidx.appcompat:appcompat:1.5.0'
    implementation 'com.google.android.material:material:1.6.1'
    implementation 'androidx.constraintlayout:constraintlayout:2.1.4'
    testImplementation 'junit:junit:4.13.2'
    implementation 'androidx.test.ext:junit:1.1.3'
    implementation 'androidx.test.espresso:espresso-core:3.4.0'
    implementation 'androidx.test:runner:1.4.0'
    implementation 'androidx.test:rules:1.4.0'
    implementation "androidx.startup:startup-runtime:1.0.0"
    def lifecycle_version = "2.6.0-alpha01"
    def arch_version = "2.1.0"

    implementation "androidx.lifecycle:lifecycle-extensions:2.2.0"
    // ViewModel
    implementation "androidx.lifecycle:lifecycle-viewmodel:$lifecycle_version"
    // LiveData
    implementation "androidx.lifecycle:lifecycle-livedata:$lifecycle_version"
    // Lifecycles only (without ViewModel or LiveData)
    implementation "androidx.lifecycle:lifecycle-runtime:$lifecycle_version"

    // Saved state module for ViewModel
    implementation "androidx.lifecycle:lifecycle-viewmodel-savedstate:$lifecycle_version"

    // Annotation processor
    annotationProcessor "androidx.lifecycle:lifecycle-compiler:$lifecycle_version"
    // alternately - if using Java8, use the following instead of lifecycle-compiler
    implementation "androidx.lifecycle:lifecycle-common-java8:$lifecycle_version"

    // optional - helpers for implementing LifecycleOwner in a Service
    implementation "androidx.lifecycle:lifecycle-service:$lifecycle_version"

    // optional - ProcessLifecycleOwner provides a lifecycle for the whole application process
    implementation "androidx.lifecycle:lifecycle-process:$lifecycle_version"

    // optional - ReactiveStreams support for LiveData
    implementation "androidx.lifecycle:lifecycle-reactivestreams:$lifecycle_version"

    // optional - Test helpers for LiveData
    testImplementation "androidx.arch.core:core-testing:$arch_version"

    // optional - Test helpers for Lifecycle runtime
    testImplementation "androidx.lifecycle:lifecycle-runtime-testing:$lifecycle_version"
}
```
