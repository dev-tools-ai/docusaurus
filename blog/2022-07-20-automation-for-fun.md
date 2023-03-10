---
title: Automating Football Scores
description: Writing automation not just for work, but for fun projects
slug: automating-football-scores
authors:
  - name: Chris Navrides
    title: Co-founder & CEO of Dev Tools
    url: https://www.linkedin.com/in/chris-navrides/
    image_url: /img/chris.jpeg

tags: [Python, Selenium, Soccer, Fun]
image: https://i.imgur.com/egLkQoC.png
hide_table_of_contents: false
---

# Automating Football Scores
![Robots for fun](https://i.imgur.com/egLkQoC.png)

## Intro
Automation is usually reserved just for work tasks and projects. However once you know how to automate it, you can make use of it for fun projects.

## Problem
Say we want to automate the all the scores from 2021-2022 year's English Football's Premier League from [flashscore.com](https://www.flashscore.com/football/england/premier-league-2021-2022/results/)

## Challenge
To solve this there will be a few challenges that we need to think through:
1. Figure out what data structure to use for storing the data.
2. Identify the teams and the scores. These will be selectors.
3. We will then need to a way to tie these together so that we know two teams played eachother.

### Data Structure
When thinking about data structures we should look at the what data we are trying to store. In this case we need the game information. For each game we need to know each team and their score.

Because there are multiple pieces of data that we will want to keep group together, the best way to handle this is a dictionary. We will create a dictionary object for each game, where we can have the team name, and scores.

Our "game" dictionary will look like the following:
```
{
    'home_team': string,
    'away_team': string,
    'home_score': int,
    'away_score': int
}
```


### Identify the Teams + Scores
Now that we have our data structure figured out, we will need to find the team name and score for each game. To do this we will look at the page and see if there is a selector we can use for these.

Within chrome, we will hover over a team name, right click and inspect.

![score box](https://i.imgur.com/VRNR6M8.png)

Inspecting the team names they look like the following:
    <div class="event__participant event__participant--home fontBold">Arsenal</div>`
    <div class="event__participant event__participant--away">Everton</div>`

Looking at the scores, they have similar class names:

    <div class="event__score event__score--home">5</div>
    <div class="event__score event__score--away">1</div>

#### Building the selectors
The easiest way to get all the team names appears to be with the classname `event__participant` and the easiest way to get the score is with class name `event__score`.

To do we will collect all elements with those class name and iterate them, and add each name/score to a list. Using  python css selector type the code looks like this:

    driver.find_elements(By.CLASS_NAME, "event__participant")
    driver.find_elements(By.CLASS_NAME, "event__score")

### Tieing it together
Now that we have all the team names and scores, we need to put them in games. To do this we use the fact that each game has two teams, so we iterate the list of elements by 2 and group them together in 1 game. The first team is always listed as the home team, and the second one is always the away team.

Assuming each team name is in a list called "teams", then we will want to go through the list by 2. The way I like to do this is to just take the length of the list, divide it by 2, then just find the first and second value.

```
for i in range(int(len(teams)/2)):
    home_team_name = teams[i*2] # 0, 2, 4, ...
    away_team_name = teams[i*2 + 1] # 1, 3, 5, ...
```

## Final Script
The final code sample to grab all the scores is below. You can now do any data manipulation you'd like to have fun with the scores :)

```py
from time import sleep

from selenium.webdriver import Chrome
from selenium.webdriver.common.by import By
from selenium.webdriver.chrome.service import Service
from webdriver_manager.chrome import ChromeDriverManager

def _main() -> None:
    """Main driver"""
    driver = Chrome(service=Service(ChromeDriverManager().install()))

    driver.get("https://www.flashscore.com/football/england/premier-league-2021-2022/results/")
    sleep(1) # lazy load the site

    teams = []
    scores = []
    dates = []
    team_names = driver.find_elements(By.CLASS_NAME, "event__participant")
    for elem in team_names:
        teams.append(elem.text)

    score_val = driver.find_elements(By.CLASS_NAME, "event__score")
    for elem in score_val:
        scores.append(elem.text)

    games = []
    for i in range(int(len(teams)/2)):
        game_event = {
            'home_team': teams[i*2],
            'away_team': teams[i*2 + 1],
            'home_score': scores[i*2],
            'away_score': scores[i*2 + 1]
        }
        games.append(game_event)

    for game in games:
        print('{home_team} - {home_score}\n{away_team} - {away_score}\n'.format(**game))

    driver.quit()

if __name__ == "__main__":
    _main()

```