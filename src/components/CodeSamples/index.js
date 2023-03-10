import React from "react";
import CodeBlock from "@theme/CodeBlock";
import Tabs from "@theme/Tabs";
import TabItem from "@theme/TabItem";

import styles from "./styles.module.css";

function ImportCode() {
  return (
    <div>
      <Tabs groupId="language-choice">
        <TabItem
          value="py"
          className="example-code-tab"
          label="Python (Selenium)"
          attributes={{ className: styles.black }}
        >
          <CodeBlock language="shell" title="Install Dev Tools">
            {`$ pip install devtools-ai`}
          </CodeBlock>
          <CodeBlock language="py" title="test.py" showLineNumbers>
            {`# Step 1) Import Dev Tools
from devtools_ai.selenium import SmartDriver

# Step 2) Wrap your driver object
driver = SmartDriver(chrome_driver, "??API_KEY??")
`}
          </CodeBlock>
        </TabItem>
        <TabItem
          value="java"
          className="example-code-tab"
          label="Java (Selenium)"
          attributes={{ className: styles.black }}
        >
          <CodeBlock language="shell" title="build.gradle">
            {`implementation 'ai.dev-tools:ai-devtools-selenium:0.1.+'
`}
          </CodeBlock>
          <CodeBlock language="java" showLineNumbers>
            {`// Step 1) Import Dev Tools
import ai.devtools.selenium.SmartDriver;

// Step 2) Wrap your driver object
SmartDriver driver = new SmartDriver(chromeDriver, "??API_KEY??");
`}
          </CodeBlock>
        </TabItem>
        <TabItem
          value="cypressio"
          className="example-code-tab"
          label="Cypress.io"
          attributes={{ className: styles.black }}
        >
          <CodeBlock language="shell" title="Install Dev Tools (NPM)">
            {`$ npm install @devtools-ai/cypress-sdk
`}
          </CodeBlock>
          <CodeBlock language="jsx" title="cypress.config.js" showLineNumbers>
            {`// Step 1) Import DevTools
const { registerSmartDriverTasks } = require('@devtools-ai/cypress-sdk/dist/plugins');

// Step 2) Register DevTools in e2e config
registerSmartDriverTasks(on, config);
`}
          </CodeBlock>
        </TabItem>
        <TabItem
          value="webdriverio"
          className="example-code-tab"
          label="WebDriver.io"
          attributes={{ className: styles.black }}
        >
          <CodeBlock language="shell" title="Install Dev Tools (NPM)">
            {`$ npm install @devtools-ai/wdio-sdk
`}
          </CodeBlock>
          <CodeBlock language="jsx" title="wdio.conf.js" showLineNumbers>
            {`// Step 1) Import & register DevTools
beforeSuite: async function (suite) {
    const devtoolsai_plugin = require('@devtools-ai/wdio-sdk');
    await devtoolsai_plugin.register(suite.title);
}
`}
          </CodeBlock>
        </TabItem>
      </Tabs>
    </div>
  );
}

function FindByAIDemo() {
  return (
    <div>
      <Tabs groupId="language-choice">
        <TabItem
          value="py"
          className="example-code-tab"
          label="Python (Selenium)"
          attributes={{ className: styles.black }}
        >
          <CodeBlock language="py" showLineNumbers>
            {`searchbox = driver.find_by_ai("searchbox")
searchbox.send_keys("hello world")`}
          </CodeBlock>
        </TabItem>
        <TabItem
          value="java"
          className="example-code-tab"
          label="Java (Selenium)"
          attributes={{ className: styles.black }}
        >
          <CodeBlock language="java" showLineNumbers>
            {`WebElement searchBoxElement = driver.findByAI("searchbox");
searchBoxElement.sendKeys("hello world");`}
          </CodeBlock>
        </TabItem>
        <TabItem
          value="cypressio"
          className="example-code-tab"
          label="Cypress.io"
          attributes={{ className: styles.black }}
        >
          <CodeBlock language="jsx" showLineNumbers>
            {`cy.findByAI('searchBox').type("hello world");`}
          </CodeBlock>
        </TabItem>
        <TabItem
          value="webdriverio"
          className="example-code-tab"
          label="WebDriver.io"
          attributes={{ className: styles.black }}
        >
          <CodeBlock language="jsx" showLineNumbers>
            {`await browser.findByAI$('searchBox').keys('Hello World');`}
          </CodeBlock>
        </TabItem>
      </Tabs>
    </div>
  );
}

export { FindByAIDemo, ImportCode };
