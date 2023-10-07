# Type Racing Mouse
Welcome to the Typing Racing Mouse Game! 

[Figma Design](https://www.figma.com/file/MEq6Phdkyy3dceOgdBrlEn/Type-Racing-Mouse?type=whiteboard&node-id=0%3A1&t=ZBKBAXBA1guzeqs7-1) - Check out my game design/logic here! 

[Play The Game!](https://wiwianquek.github.io/typeracingmouse/typeracingmouse) - Click to Play! 


## Overview
This game fetches random quotes from the Quotable API and tasks the player with typing out the quote as quickly and accurately as possible. With every correct quote typed, the player progresses to the next level. But there's a twist – a cat is chasing after you, and with each level, its speed increases. Can you type fast enough to outrun the cat and before the cat reaches the end first?

## Features
- **Dynamic Quotes**: Every level challenges you with a new random quote.

- **Level Progression**: As you advance through the levels, the challenge increases with the cat moving faster.

- **WPM Calculation**: Keep track of your typing speed with the Words Per Minute (WPM) feature.

- **Interactive UI**: Engage with colorful, intuitive graphics that respond to your typing progress.

- **Timed Challenge**: Each level is timed. If you don't complete the quote in time, it's game over!

## How to Play
1. Wait for a random quote to load on the screen.
2. Start typing the quote in the input box as quickly and accurately as you can.
3. If you finish typing the quote correctly, you'll proceed to the next level.
4. Be fast! The cat is chasing after you, and with each level, its speed increases.

Check out the demo below on how above steps works! 

https://github.com/wiwianquek/typeracingmouse/assets/136752154/1016fea3-dbfa-452c-903b-4a013f22e987


5. The game ends if you don't complete typing before the timer runs out or if the cat reaches the finish line first! 


https://github.com/wiwianquek/typeracingmouse/assets/136752154/4944aa3f-6eab-4d64-8ff4-64cfb10d30dd


## Game Logic

Following shows the game logic flow.

<img width="707" alt="Game_Logic" src="https://github.com/wiwianquek/typeracingmouse/assets/136752154/0089de57-ec37-4396-9912-beae55981890">

1. Quote will be rendered in the ```quote display```
2. User needs to type within the ```quote input```
3. Mouse will move based on the following calculations:
     - **Distance**: The distance is based on the length of the generated quote (since each quote length is different), adjusted to the screenwidth/size
     - **Moving Mouse (Speed)**: Mouse moves based on the number of correct characters typed over the length of quote, adjusted to the screenwidth/size
  
4. Cat will move based on the following calculations:
   - **Distance**: The distance is based on the total time based on the level, adjusted to the screenwidth/size
   - **Moving Cat (Speed)**: Cat moves based on the timer (or as the seconds reduces), adjusted to the screenwidth/size 
  
5. If mouse reaches the end first, it moves to the new level where:
   - Level increases by 1
   - New quote is triggered
   - Cat becomes faster
   - Timer resets

6. If cat reaches the end, the game ends and prompts a restart. Note that the cat logic here is tied to the end of the timer, where basically ```timer === 0```  is equal to ```cat reaching the end```! 

### Cool Features

Note that Mouse doesn't move if a wrong character is typed, and mouse moves backwards accordingly if backspace was entered.

https://github.com/wiwianquek/typeracingmouse/assets/136752154/40c3f369-3d62-43aa-8631-2c9f953d8773

### Improvements
- Include a leaderboard where it records the highest WPM
- Improve the animation flow for the cat
- Optimize the UI/UX of the game 
   
## Credits
Background racetrack image sourced from Freepik.

*This game is developed using vanilla JavaScript, CSS, and HTML. The quotes are fetched dynamically from the Quotable API.*
