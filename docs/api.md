---
id: api
title: API Documentation
sidebar_position: 100
description: Get started with SmartDriver
slug: /api
---

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

# API

Below are the set of APIs that the SDK uses.
:::tip Note

In order to use the following APIs you will first need to get an API key from the [dashboard](https://smartdriver.dev-tools.ai).

:::

## Initialization

These APIs are used during driver initialization.

### `/ping`

Used to pre-load models used within the given test.

**Method** : `POST`<br />
**Auth required** : NO<br />
**Content-Type** : application/json<br />
**Data**

| Key            | Required | Type   | Desscription                                                            |
| -------------- | -------- | ------ | ----------------------------------------------------------------------- |
| api_key        | True     | String | The API key of the given user.                                          |
| os             | True     | String | The OS version string to indicate OS type and version.                  |
| sdk_version    | True     | String | String indicating which version number of the SDK is being used.        |
| language       | True     | String | String indicating which programming language this is being called from. |
| test_case_name | True     | String | The name of the given test case.                                        |

**Response**

| Key     | Required | Type    | Desscription                     |
| ------- | -------- | ------- | -------------------------------- |
| success | True     | Boolean | Was the request successful.      |
| message | False    | String  | The server message of any error. |

**Examples**
<Tabs groupId="language-choice">
<TabItem value="py" label="Python">

```py
data = {
    'api_key': "??API_KEY??",
    'os': platform.platform(),
    'sdk_version': '0.0.0',
    'language': sys.version,
    'test_case_name': 'My awesome test case'
}

requests.post('https://smartdriver.dev-tools.ai/ping', json=data)
```

</TabItem>
<TabItem value="java" label="Java">

```java
Coming soon.
```

</TabItem>
<TabItem value="csharp" label="C#">

```c#
Coming soon.
```

</TabItem>
<TabItem value="js" label="JavaScript">

```js
import { createSDK } from "@devtools-ai/js-sdk";

const sdk = createSDK({ apiKey: "YOUR_API_KEY_HERE" });
const { message, success } = await sdk.createCheckIn("My Awesome Test Case");
```

</TabItem>
<TabItem value="rb" label="Ruby">

```rb
Coming soon.
```

</TabItem>
</Tabs>

## Ingestion

These routes are used to help pre-populate model data for an existing element.

### `/add_action_info`

Adds the bounding box coordinates for the element on a given screen. This is useful so the user doesn't need to manually draw the bounding box on the screenshot on the dashboard.

**Method** : `POST`<br />
**Auth required** : NO<br />
**Content-Type** : application/json<br />
**Data**

| Key             | Required | Type    | Desscription                                                                            |
| --------------- | -------- | ------- | --------------------------------------------------------------------------------------- |
| api_key         | True     | String  | The API key of the given user.                                                          |
| label           | True     | String  | The name of the element for the given screenshot..                                      |
| screenshot_uuid | True     | String  | The MD5 hash of the base64 image string.                                                |
| x               | True     | Float   | The x coordinate, in pixels, of the upper left corner of the bounding box in the image. |
| y               | True     | Float   | The y coordinate, in pixels, of the upper left corner of the bounding box in the image. |
| width           | True     | Float   | The width, in pixels, of the bounding box.                                              |
| height          | True     | Float   | The height, in pixels, of the bounding box.                                             |
| retrain         | False    | Boolean | String indicating which programming language this is being called from.                 |
| test_case_name  | False    | String  | The name of the given test case.                                                        |
| multiplier      | False    | Float   | The screendensity to page size.                                                         |

**Response**

| Key     | Required | Type    | Desscription                           |
| ------- | -------- | ------- | -------------------------------------- |
| success | True     | Boolean | Was the request successful.            |
| message | True     | String  | The server message of any information. |

**Examples**
<Tabs groupId="language-choice">
<TabItem value="py" label="Python">

```py
import base64
with open('screenshot.png') as image_file:
    b64_screenshot = base64.b64encode(image_file.read())
screenshot_uuid =hashlib.md5(b64_screenshot).hexdigest()
data = {
    'screenshot_uuid': screenshot_uuid,
    'api_key': "??API_KEY??",
    'label': element_name,
    'x': elem.rect['x'],
    'y': elem.rect['y'],
    'width': elem.rect['width'],
    'height': elem.rect['height'],
    'test_case_name': 'My awesome test case'
}
response = requests.post('https://smartdriver.dev-tools.ai/add_action_info', json=data)

```

</TabItem>
<TabItem value="java" label="Java">

```java
Coming soon.
```

</TabItem>
<TabItem value="csharp" label="C#">

```c#
Coming soon.
```

</TabItem>
<TabItem value="js" label="JavaScript">

```js
import { createSDK } from "@devtools-ai/js-sdk";
import crypto from "crypto-js";

function getScreenshotHash(b64Screenshot) {
  const hashDigest = crypto.MD5(b64Screenshot).toString();
  return hashDigest;
}
// Note: You will need to implement getting the screenshot
//       from your framework.
const sdk = createSDK({ apiKey: "YOUR_API_KEY_HERE" });

const screenshotId = getScreenshotHash(b64Screenshot);
const element = {
  x: element.x,
  y: element.y,
  width: element.width,
  height: element.height,
};

const { message, success } = await sdk.updateTestElement(
  element,
  screenshotId,
  "my-element-label",
  "My awesome test case",
  true
);
```

</TabItem>
<TabItem value="rb" label="Ruby">

```rb
Coming soon.
```

</TabItem>
</Tabs>

### `/exists_screenshot`

Check if the given screenshot has already been backed up by the backend.

**Method** : `POST`<br />
**Auth required** : NO<br />
**Content-Type** : application/json<br />
**Data**

| Key             | Required | Type   | Desscription                                                  |
| --------------- | -------- | ------ | ------------------------------------------------------------- |
| api_key         | True     | String | The API key of the given user.                                |
| screenshot_uuid | True     | String | The MD5 hash of the base64 image string.                      |
| label           | True     | String | Name of the element that we wish to get the bounding box for. |

**Response**

| Key               | Required | Type    | Desscription                                                                                       |
| ----------------- | -------- | ------- | -------------------------------------------------------------------------------------------------- |
| success           | True     | Boolean | Was the request successful.                                                                        |
| message           | True     | String  | The server message of any information.                                                             |
| is_frozen         | True     | Boolean | Indicate if the system is accepting additional screenshots for this label.                         |
| exists_screenshot | True     | Boolean | Indicates if this screenshot hash is already existing on the server, thus no need to re-upload it. |

**Examples**
<Tabs groupId="language-choice">
<TabItem value="py" label="Python">

```py
import base64
with open('screenshot.png') as image_file:
    b64_screenshot = base64.b64encode(image_file.read())
screenshot_uuid =hashlib.md5(b64_screenshot).hexdigest()
data = {
    'api_key': "??API_KEY??",
    'screenshot_uuid': screenshot_uuid,
    'label': element_name
}
response = requests.post('https://smartdriver.dev-tools.ai/exists_screenshot', json=data)
screenshot_exists = response.json()['exists_screenshot']

```

</TabItem>
<TabItem value="java" label="Java">

```java
Coming soon.
```

</TabItem>
<TabItem value="csharp" label="C#">

```c#
Coming soon.
```

</TabItem>
<TabItem value="js" label="JavaScript">

```js
import { createSDK } from "@devtools-ai/js-sdk";
import crypto from "crypto-js";

const sdk = createSDK({ apiKey: "YOUR_API_KEY_HERE" });

function getScreenshotHash(b64Screenshot) {
  const hashDigest = crypto.MD5(b64Screenshot).toString();
  return hashDigest;
}
// Note: You will need to implement getting the screenshot
//       from your framework.
const screenshotId = getScreenshotHash(b64Screenshot);
const {
  exists_screenshot,
  is_frozen,
  message,
  predicted_element,
  screenshot_exists,
  success,
} = await sdk.getIfScreenshotExists(screenshotId, elementName);
```

</TabItem>
<TabItem value="rb" label="Ruby">

```rb
Coming soon.
```

</TabItem>
</Tabs>

### `/upload_screenshot`

Upload the given screenshot to the backend to be used for training and backup purposes.

**Method** : `POST`<br />
**Auth required** : NO<br />
**Content-Type** : application/json<br />
**Data**

| Key             | Required | Type    | Description                                                          |
| --------------- | -------- | ------- | -------------------------------------------------------------------- |
| api_key         | True     | String  | The API key of the given user.                                       |
| screenshot_uuid | True     | String  | The MD5 hash of the base64 image string.                             |
| screenshot      | True     | String  | Base64 string of the screenshot.                                     |
| label           | True     | String  | Name of the element that we wish to get the bounding box for.        |
| test_case_name  | False    | String  | The name of the given test case.                                     |
| is_interactive  | False    | Boolean | Indicating if the given screenshot is from an interactive test case. |

**Response**

| Key             | Required | Type    | Desscription                           |
| --------------- | -------- | ------- | -------------------------------------- |
| success         | True     | Boolean | Was the request successful.            |
| message         | True     | String  | The server message of any information. |
| screenshot_uuid | False    | String  | The MD5 hash of the last screenshot.   |

## Running

These routes are used during the execution of a test case to identify elements and status on the server.

**Examples**
<Tabs groupId="language-choice">
<TabItem value="py" label="Python">

```py
import base64
with open('screenshot.png') as image_file:
    b64_screenshot = base64.b64encode(image_file.read())
screenshot_uuid =hashlib.md5(b64_screenshot).hexdigest()
data = {
    'api_key': "??API_KEY??",
    'screenshot_uuid': screenshot_uuid,
    'screenshot': b64_screenshot,
    'label': element_name,
    'test_case_name': 'My awesome test case'
}

response = requests.post('https://smartdriver.dev-tools.ai/upload_screenshot', json=data)

```

</TabItem>
<TabItem value="java" label="Java">

```java
Coming soon.
```

</TabItem>
<TabItem value="csharp" label="C#">

```c#
Coming soon.
```

</TabItem>
<TabItem value="js" label="JavaScript">

```js
import { createSDK } from "@devtools-ai/js-sdk";
import crypto from "crypto-js";

function getScreenshotHash(b64Screenshot) {
  const hashDigest = crypto.MD5(b64Screenshot).toString();
  return hashDigest;
}
// Note: You will need to implement getting the screenshot
//       from your framework.
const sdk = createSDK({ apiKey: "YOUR_API_KEY_HERE" });

const screenshotId = getScreenshotHash(b64Screenshot);

const response = await sdk.uploadTestElementScreenshot(
  screenshotBase64,
  elementName,
  "My awesome test case"
);
```

</TabItem>
<TabItem value="rb" label="Ruby">

```rb
Coming soon.
```

</TabItem>
</Tabs>

### `/detect`

Check the given screenshot for the element. Core method to get the element from the screenshot.

**Method** : `POST`<br />
**Auth required** : NO<br />
**Content-Type** : application/json<br />
**Data**

| Key        | Required | Type   | Desscription                                                  |
| ---------- | -------- | ------ | ------------------------------------------------------------- |
| api_key    | True     | String | The API key of the given user.                                |
| screenshot | True     | String | Base64 string of the screenshot.                              |
| label      | True     | String | Name of the element that we wish to get the bounding box for. |

**Response**

| Key       | Required | Type    | Desscription                           |
| --------- | -------- | ------- | -------------------------------------- |
| success   | True     | Boolean | Was the request successful.            |
| label     | True     | String  | The name of the label.                 |
| is_frozen | True     | Boolean | The server message of any information. |

**Examples**
<Tabs groupId="language-choice">
<TabItem value="py" label="Python">

```py
import base64
with open('screenshot.png') as image_file:
    b64_screenshot = base64.b64encode(image_file.read())
data = {
    'api_key': "??API_KEY??",
    'screenshot': b64_screenshot,
    'label': element_name
}
response = requests.post('https://smartdriver.dev-tools.ai/detect', json=data).json()
if response['success']:
    element_box = response['predicted_element']
```

</TabItem>
<TabItem value="java" label="Java">

```java
Coming soon.
```

</TabItem>
<TabItem value="csharp" label="C#">

```c#
Coming soon.
```

</TabItem>
<TabItem value="js" label="JavaScript">

```js
import { createSDK } from "@devtools-ai/js-sdk";

const sdk = createSDK({ apiKey: "YOUR_API_KEY_HERE" });
const {
  is_frozen,
  message,
  model_being_trained,
  model_ready,
  model_type,
  predicted_element,
  score,
  screenshot_uuid,
  success,
  training_progress,
} = await sdk.classifyObject(
  screenshotBase64,
  "",
  elementName,
  "My test case name"
);
```

</TabItem>
<TabItem value="rb" label="Ruby">

```rb
Coming soon.
```

</TabItem>
</Tabs>

### `/check_frozen`

Check if the given element name is accepting additional training data. This is used to check before wasting time and bandwidth taking + uploading a screenshot.

**Method** : `POST`<br />
**Auth required** : NO<br />
**Content-Type** : application/json<br />
**Data**

| Key     | Required | Type   | Desscription                                                  |
| ------- | -------- | ------ | ------------------------------------------------------------- |
| api_key | True     | String | The API key of the given user.                                |
| label   | True     | String | Name of the element that we wish to get the bounding box for. |

**Response**

| Key       | Required | Type    | Desscription                           |
| --------- | -------- | ------- | -------------------------------------- |
| success   | True     | Boolean | Was the request successful.            |
| label     | True     | String  | The name of the label.                 |
| is_frozen | True     | Boolean | The server message of any information. |

**Examples**
<Tabs groupId="language-choice">
<TabItem value="py" label="Python">

```py
data = {
    'api_key': "??API_KEY??",
    'label': element_name
}
response = requests.post('https://smartdriver.dev-tools.ai/check_frozen', json=data)
is_frozen = response.get('is_frozen', True)

```

</TabItem>
<TabItem value="java" label="Java">

```java
Coming soon.
```

</TabItem>
<TabItem value="csharp" label="C#">

```c#
Coming soon.
```

</TabItem>
<TabItem value="js" label="JavaScript">

```js
import { createSDK } from "@devtools-ai/js-sdk";

const sdk = createSDK({ apiKey: "YOUR_API_KEY_HERE" });
const { is_frozen, label, success } = await sdk.getIfFrozen(elementName);
```

</TabItem>
<TabItem value="rb" label="Ruby">

```rb
Coming soon.
```

</TabItem>
</Tabs>

## Interactive Mode

Routes used to enable interactive mode where a user can fix any selectors where there is no existing model for.

### `/testcase/get_action_info`

Route to check if a given screen has now been clasisifed on the server side.

**Method** : `POST`<br />
**Auth required** : NO<br />
**Content-Type** : application/json<br />
**Data**

| Key             | Required | Type    | Desscription                                                                                                       |
| --------------- | -------- | ------- | ------------------------------------------------------------------------------------------------------------------ |
| api_key         | True     | String  | The API key of the given user.                                                                                     |
| label           | True     | String  | Name of the element that we wish to get the bounding box for.                                                      |
| screenshot_uuid | True     | String  | The MD5 hash of the screenshot sent to the server.                                                                 |
| run_classifier  | False    | Boolean | Wait for the classifier to be trained and executed on the screenshot before getting bounding box (default: False). |

**Response**

| Key               | Required | Type    | Desscription                                                                     |
| ----------------- | -------- | ------- | -------------------------------------------------------------------------------- |
| success           | True     | Boolean | Was the request successful.                                                      |
| message           | True     | String  | The server message of any error.                                                 |
| predicted_element | True     | JSON    | The JSON object representing the bounding box of the element.                    |
| score             | True     | Float   | The prediction score for the given element on the screenshot. Used in debugging. |

**Examples**
<Tabs groupId="language-choice">
<TabItem value="py" label="Python">

```py
import base64
import time
with open('screenshot.png') as image_file:
    b64_screenshot = base64.b64encode(image_file.read())
screenshot_uuid =hashlib.md5(b64_screenshot).hexdigest()
data = {
    'api_key': "??API_KEY",
    'label': element_name,
    'screenshot_uuid': screenshot_uuid
}

user_labeled_element = False
while user_labeled_element:
    r = requests.post(self.url + '/testcase/get_action_info', json=data, verify=False).json()
    # Has the element been classified by the user? If so get the element back
    if r['success']:
        user_labeled_element = True
        element_box = r['predicted_element']
    time.sleep(1)
```

</TabItem>
<TabItem value="java" label="Java">

```java
Coming soon.
```

</TabItem>
<TabItem value="csharp" label="C#">

```c#
Coming soon.
```

</TabItem>
<TabItem value="js" label="JavaScript">

```js
import { createSDK } from "@devtools-ai/js-sdk";
import crypto from "crypto-js";

const sdk = createSDK({ apiKey: "YOUR_API_KEY_HERE" });

function getScreenshotHash(b64Screenshot) {
  const hashDigest = crypto.MD5(b64Screenshot).toString();
  return hashDigest;
}
// Note: You will need to implement getting the screenshot
//       from your framework.
const screenshotId = getScreenshotHash(b64Screenshot);

const { message, predicted_element, score, success, tc_url } =
  await sdk.getTestCaseBox(
    elementName,
    screenshotId,
    "My Awesome Test Case",
    true
  );
```

</TabItem>
<TabItem value="rb" label="Ruby">

```rb
Coming soon.
```

</TabItem>
</Tabs>
