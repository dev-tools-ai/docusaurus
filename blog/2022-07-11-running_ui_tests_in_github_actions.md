---
title: Running UI tests in Github Actions
description: How to setup github actions to run your ui tests.
slug: running-ui-tests-in-github-actions
authors:
  - name: Etienne DEGUINE
    title: Co-founder & CTO of Dev Tools
    url: https://www.linkedin.com/in/etiennedeguine/
    image_url: /img/etienne.jpeg

tags: [Github Actions, Python, Selenium]
image: https://i.imgur.com/r7LLTVg.png
hide_table_of_contents: false
---
# Running UI tests in Github Actions (GHA)
![Github Actions](https://i.imgur.com/r7LLTVg.png)
## Intro
In this post we will show you how to set up UI tests with Selenium in headless mode in your Github Actions workflow

## Scenario
You want to load up google.com and send the search query "Hello World", then checks that the query exists in the HTML source. You then want to run this script every 15 minutes in GHA.

## Selenium test script
Here is the script we will use (search_google.py)

```python title="search_google.py"
from time import sleep

from selenium import webdriver
from selenium.webdriver.common.by import By
from selenium.webdriver.chrome.options import Options

def main():
    chrome_options = Options()
    chrome_options.add_argument("--no-sandbox")
    chrome_options.add_argument("--disable-dev-shm-usage")
    chrome_options.add_argument("--headless")
    chrome_options.add_argument('window-size=1280x1024')

    driver = webdriver.Chrome(chrome_options=chrome_options)

    driver.get("https://google.com")
    sleep(1)

    # Find the searchbox and send "hello world"
    searchbox_element = driver.find_element(By.NAME, 'q')
    searchbox_element.send_keys("Hello World\n")
    sleep(2)

    html = driver.page_source
    assert('Hello World' in html)

    driver.quit()
if __name__ == "__main__":
    main()
```


You can run this script locally, for instance for debugging, with the following steps, provided Chromedriver is installed in ~/chromedrivers
```bash
export PATH=/Users/some_user/chromedrivers:$PATH
python3 -m pip install selenium
python3 search_google.py
```

## Setting up GHA
First let's create a requirements file for our action. It's called requirements-smoke.txt

```bash title="requirements-smoke.txt"
selenium==4.3.0
```


```yaml title=".github/workflows/ui-test.yaml"
name: My UI tests pipeline
on:
  schedule:
    - cron: '*/15 * * * *'
jobs:
  Run-tests-code-quality:
    runs-on: ubuntu-latest
    steps:
        - uses: actions/checkout@v2
        - run: echo "Running the tests"
        - run: echo "The ${{ github.repository }} repository has been cloned to the runner."
        - uses: nanasess/setup-chromedriver@v1.0.7
        - run: |
            export DISPLAY=:99
            sudo Xvfb -ac :99 -screen 0 1280x1024x24 > /dev/null 2>&1 &
        - name: run UI tests
          run : |
            cd ${{ github.workspace }}
            python3 -m pip install -r requirements-smoke.txt
            python3 search_google.py
```

# Details
Basically two things are happening, first we set up chromedriver.
```yaml
- uses: nanasess/setup-chromedriver@v1.0.7
```

Second, we create a X-Window virtual frame buffer (Xvfb) which is basically a fake screen of resolution 1280x1024. This resolution matches the window_size parameters in the script.
```bash
export DISPLAY=:99
sudo Xvfb -ac :99 -screen 0 1280x1024x24 > /dev/null 2>&1 &
```

## Conclusion
We saw how to set up UI tests with Selenium in headless mode in your Github Actions workflow. We use a GHA to set up the chromedriver and then a XVFB to act as the screen.

## Going further
If you run UI tests, you might be interested in our product, devtools_ai.
It is a library to make UI tests less flaky. It automatically handles broken UI selectors (for instance after an HTML / React code change) and kicks in using visual ML to still interact with the same element.
It uses the visual aspect of elements under the hood, so it does not break as long as the UI looks the same.

You can check it out at [dev-tools.ai](https://dev-tools.ai/)

Making a test case robust with our library is only two lines of code, the test above would look like this:

```python title="search_google_non_flaky.py"
from time import sleep

from selenium import webdriver
from selenium.webdriver.common.by import By
from selenium.webdriver.chrome.options import Options

from devtools_ai.selenium import SmartDriver

def main():
    chrome_options = Options()
    chrome_options.add_argument("--no-sandbox")
    chrome_options.add_argument("--disable-dev-shm-usage")
    chrome_options.add_argument("--headless")
    chrome_options.add_argument('window-size=1280x1024')

    driver = webdriver.Chrome(chrome_options=chrome_options)
    driver = SmartDriver(driver, "my_api_key") # get your API key at https://smartdriver.dev-tools.ai/signup

    driver.get("https://google.com")
    sleep(1)

    # Find the searchbox and send "hello world"
    searchbox_element = driver.find_element(By.NAME, 'q')
    searchbox_element.send_keys("Hello World\n")
    sleep(2)

    html = driver.page_source
    assert('Hello World' in html)

    driver.quit()
if __name__ == "__main__":
    main()
```