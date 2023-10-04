# Typing Racing Mouse
Welcome to the Typing Race Game! Challenge yourself with dynamic typing tests while being chased by a cat.

## Overview
This game fetches random quotes from the Quotable API and tasks the player with typing out the quote as quickly and accurately as possible. With every correct quote typed, the player progresses to the next level. But there's a twist – a cat is chasing after you, and with each level, its speed increases. Can you type fast enough to outrun the cat?

## Features
Dynamic Quotes: Every level challenges you with a new random quote.

- **Level Progression**: As you advance through the levels, the challenge increases with the cat moving faster.

- **WPM Calculation**: Keep track of your typing speed with the Words Per Minute (WPM) feature.

- **Interactive UI**: Engage with colorful, intuitive graphics that respond to your typing progress.

- **Timed Challenge**: Each level is timed. If you don't complete the quote in time, it's game over!

## How to Play
1. Wait for a random quote to load on the screen.
2. Start typing the quote in the input box as quickly and accurately as you can.
3. If you finish typing the quote correctly, you'll proceed to the next level.
4. Be fast! The cat is chasing after you, and with each level, its speed increases.
5. The game ends if you don't complete typing before the timer runs out or if the cat catches you.
Development

*This game is developed using vanilla JavaScript, CSS, and HTML. The quotes are fetched dynamically from the Quotable API.*

## Key Functions:
- **getRandomQuote**: Fetches a random quote from the Quotable API.

- **renderQuote**: Renders the fetched quote on the screen for the player to type.

- **calculateWPM**: Calculates and displays the Words Per Minute (WPM) based on the player's typing speed.

- **moveMouse**: Moves the mouse based on the player's typing progress.

- **startTimer**: Initiates the timer for each level, and moves the cat.

## Credits
Background racetrack image sourced from Freepik.