---
title: Building a site scanner
description: How to get detailed error reports from Selenium and Chromedriver.
slug: site-sacnner
authors:
  - name: Etienne DEGUINE
    title: Co-founder & CTO of Dev Tools
    url: https://www.linkedin.com/in/etiennedeguine/
    image_url: /img/etienne.jpeg

tags: [CDP, Console logs, Networking logs, Python, Selenium]
image: https://i.imgur.com/GqMNjS0.png
hide_table_of_contents: false
---
# Building a site scanner on top of Selenium + Chromedriver
![Ant colony galleries aboriginal art](https://i.imgur.com/GqMNjS0.png)
## Intro
In this post we will show you how we built the site scanner <code>scan_domain</code> feature in our SDK. We will go over collecting JS error logs and network calls with Chomedriver and Chrome Developer Protocol (CDP) in Python with Selenium.

## Scenario
We want to crawl a given domain with a given depth and collect JS errors from the console as well as HTTP requests with status code >= 400.

## General design
We are going to traverse the site BFS. The <code>link_manager</code> will keep track of visited urls for us and handle the traversal logic. 

```python title="scan.py"
from urllib.parse import urlparse
class SmartDriver:
    def __init__(self, webdriver, api_key, options={}):
        ...
        
    def scan_domain(self, url, max_depth=5):
        self.domain = urlparse(url).netloc # extract the domain
        self.link_manager.add_link(url, url, depth=0)
        while self.link_manager.has_more_links():
            referrer, link, depth = self.link_manager.get_link()
            try:
                if depth <= max_depth:
                    self.process_link(link, referrer, depth)
                else:
                    log.info(f'Skipping link {link} because it is too deep {depth}')
            except Exception as e:
                log.error(f"Error processing link {link}: {e}")
```

## Initializing Chromedriver with CDP
To collect the right data we need console and performance logs from Chromedriver. The Chrome Developer Protocol (CDP) gives us access to this, we need to enable these additional features with a DesiredCapability <code>goog:loggingPrefs</code>, we also need to issue two CDP commands to enable these logs.

```python title="chromedriver.py"
from selenium.webdriver import DesiredCapabilities
from selenium.webdriver.chrome.service import Service
from webdriver_manager.chrome import ChromeDriverManager

# make chrome log requests
capabilities = DesiredCapabilities.CHROME
capabilities['goog:loggingPrefs'] = {'performance': 'ALL', 'browser': 'ALL'}
driver = Chrome(service=Service(ChromeDriverManager().install()), desired_capabilities=capabilities)
driver.execute_cdp_cmd("Network.enable", {})
driver.execute_cdp_cmd("Console.enable", {})
```

## Processing the links
For each link, we will clear the logs, get the url then check the console error logs and the HTTP status codes.

```python title="process_link.py"
    def process_link(self, link, referrer, depth):
        _ = self.driver.get_log('browser')  # clear logs
        _ = self.driver.get_log('performance')
        self.driver.get(link)
        sleep(2.0)
        log.info(f"Processing link {link}")
        console_logs = self.driver.get_log("browser")
        self.process_console_logs(console_logs, link)

        perf_logs = self.driver.get_log("performance")
        self.process_perf_logs(perf_logs, link)

        log.info(f'Visited {link}')
        self.link_manager.visited_link(link)
        local_referrer = link

        links = self.driver.find_elements(By.TAG_NAME, 'a')
        for link in links:
            if urlparse(link.get_attribute('href')).netloc == self.domain:
                self.link_manager.add_link(local_referrer, link.get_attribute('href'), depth + 1)
```

### Processing the console logs
We simply look at the messages from the console, check for the a SEVERE log or for the word 'error'.

```python title="process_console_logs.py"
    def is_js_error(message):
        #implement some logic here to filter out the errors you want
        return 'error' in message.lower()

    def process_console_logs(self, console_logs, link):
        for l in console_logs:
            if (l['level'] == 'SEVERE'):
                log.debug(f"Bad JS: {l['message']}")
                self.save_js_error(l['message'])
            else:
                if is_js_error(l['message']):
                    log.debug(f"Bad JS: {l['message']}")
                    self.save_js_error(l['message'])
```

### Processing the network logs
We get the log messages in JSON format, so we load them up in memory and filter for Network.responseReceived.
After that we simply look at the status code to decide which requests are bad.

```python title="process_network_logs"
    def process_perf_logs(self, perf_logs, link):
        perf_logs = [json.loads(lr["message"])["message"] for lr in perf_logs]
        responses = [l for l in perf_logs if l["method"] == "Network.responseReceived"]
        for r in responses:
            status = r['params']['response']['status']
            if status >= 400:
                log.debug(f"Bad request: {status} {r['params']['response']['url']}")
                self.save_bad_request(r['params']['response']['url'], status, link)
```

## Everything together
When putting everything togethere, we have a simple crawler that registeres JS errors and bad HTTP requests.
This whole feature is already implemented in our SDK, to use it simply make sure you set the desired capability <code>googLoggingPrefs</code> to 'performance' and 'browser'.

Here is a sample script to scan all the URLs in a text file.

```python title="scan.py"
from time import sleep

from selenium.webdriver import Chrome
from selenium.webdriver.common.by import By
from selenium.webdriver.chrome.service import Service
from webdriver_manager.chrome import ChromeDriverManager
import logging
logging.basicConfig(level=logging.INFO)


from devtools_ai.selenium import SmartDriver
from selenium.webdriver.chrome.options import Options
from selenium.webdriver import DesiredCapabilities

# import actionchains
from selenium.webdriver.common.action_chains import ActionChains
import os

def scan(url):
    """Main driver"""
    chrome_options = Options()
    chrome_options.add_argument("--no-sandbox")
    chrome_options.add_argument("--disable-dev-shm-usage")
    chrome_options.add_argument("--headless")

    # make chrome log requests
    capabilities = DesiredCapabilities.CHROME
    capabilities['goog:loggingPrefs'] = {'performance': 'ALL', 'browser': 'ALL'}
    driver = Chrome(service=Service(ChromeDriverManager().install()), desired_capabilities=capabilities, options=chrome_options)
    try:
        # Convert chrome_driver to smartDriver
        driver = SmartDriver(driver, api_key="??API_KEY??") # get your API key at https://smartdriver.dev-tools.ai/


        # Navigate to Google.com
        driver.scan_domain(url, max_depth=4)
        driver.quit()
    except Exception as e:
        logging.error(e)
        driver.quit()


if __name__ == "__main__":
    with open('urls.txt') as f:
        urls = f.readlines()
    for url in urls:
        scan(url)
        sleep(1)
```