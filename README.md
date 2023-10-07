## Game Overview - Type Racing Mouse
This game is like your any other typeracing game, but there's a twist – a cat is chasing after you, and with each level, its speed increases. Can you type fast enough to outrun the cat and before the cat reaches the end first?

[Figma Design](https://www.figma.com/file/MEq6Phdkyy3dceOgdBrlEn/Type-Racing-Mouse?type=whiteboard&node-id=0%3A1&t=ZBKBAXBA1guzeqs7-1) - Check out my game design/logic here! 

[Play The Game!](https://wiwianquek.github.io/typeracingmouse/typeracingmouse) - Click to Play! 


## Features
- **Dynamic Quotes**: Every level challenges you with a new random quote fetched from Quotable API. 

- **Level Progression**: As you advance through the levels, the challenge increases with the cat moving faster.

- **WPM Calculation**: Keep track of your typing speed with the Words Per Minute (WPM) feature.

- **Interactive UI**: Engage with colorful, intuitive graphics that respond to your typing progress.

- **Timed Challenge**: Each level is timed. If you don't complete the quote in time, it's game over!

## How to Play
1. Wait for a random quote to load on the screen.
2. Start typing the quote in the input box as quickly and accurately as you can.
3. If you finish typing the quote correctly, you'll proceed to the next level.
4. Be fast! The cat is chasing after you, and with each level, its speed increases.

Check out the demo below on how the above steps works! 

https://github.com/wiwianquek/typeracingmouse/assets/136752154/1016fea3-dbfa-452c-903b-4a013f22e987


5. The game ends if you don't complete typing before the timer runs out or if the cat reaches the finish line first! 


https://github.com/wiwianquek/typeracingmouse/assets/136752154/4944aa3f-6eab-4d64-8ff4-64cfb10d30dd


## Game Logic

Following shows the game logic flow.

<img width="707" alt="Game_Logic" src="https://github.com/wiwianquek/typeracingmouse/assets/136752154/0089de57-ec37-4396-9912-beae55981890">

1. Quote will be rendered in the ```quote display```
2. User needs to type within the ```quote input```
3. Mouse will move based on the following calculations in ```moveMouse``` function:
     - **Distance**: The distance is based on the length of the generated quote (since each quote length is different), adjusted to the screenwidth/size.
     - **Moving Mouse (Speed)**: Mouse moves based on the number of correct characters typed over the length of quote, adjusted to the screenwidth/size.
  
4. Cat will move based on the following calculations, within my ``startTimer`` function:
   - **Distance**: The distance is based on the total time based on the level, adjusted to the screenwidth/size.
   - **Moving Cat (Speed)**: Cat moves based on the timer (or as the seconds reduces), adjusted to the screenwidth/size.
   - Note that the cat logic here is tied to the end of the timer, where basically ```timer === 0```  is equal to ```cat reaching the end```
  
5. If mouse reaches the end first, it moves to the new level where:
   - Level increases by 1
   - New quote is triggered
   - Cat becomes faster
   - Timer resets

6. If cat reaches the end, the game ends and prompts a restart. 

### Cool Features

Note that Mouse doesn't move if a wrong character is typed, and mouse moves backwards accordingly if backspace was entered.

https://github.com/wiwianquek/typeracingmouse/assets/136752154/40c3f369-3d62-43aa-8631-2c9f953d8773

### Challenging Function

One function I would like to share about is the math behind my ``startTimer`` function, or basically the **moving cat** function:

```
    let timerInterval; 

    function startTimer() {

        if (timerInterval) {
            clearInterval(timerInterval);
        }

        let counter = 0 

        function updateTimer() { 
            counter++;
            if (counter === 10) { 
                totalTime--;
                timer.innerText = totalTime;
                counter = 0;
            }

            const screenWidth = window.innerWidth;
            const totalWidth = screenWidth - 100; 
            const levelTime = Math.max(10, 70 - (currentLevel * 10)) * 10; 

            const distance = (levelTime - (totalTime * 10) + counter) / levelTime * totalWidth;  
            
            catElement.style.left = `${distance}px`; 

               if (totalTime < 0) {
                clearInterval(timerInterval);
                timer.innerText = '0';
                endGame("timer hit zerooooo"); 
            }
        }

        timerInterval = setInterval(updateTimer, 100);

    }

- ```updatetimer```: Acts as a sub-function for the timer, where for every 10 calls, it will reduce the timer by one second using the counter.

- ```levelTime```: This is the total duration for the current level in tenths of a second.

- ```totalTime * 10```: Converts the remaining seconds (totalTime) into tenths of a second.

- ```levelTime - (totalTime * 10) + counter```: This calculates the elapsed time since the start of the current level, in tenths of a second. counter adds the additional tenths of a second passed since the last full second.

- ```(levelTime - (totalTime * 10) + counter) / levelTime```: This produces a fraction representing the proportion of time that has elapsed for the current level.

- ```... * totalWidth```: The fraction from the above step is multiplied by the total possible movement distance (totalWidth) of the cat on the screen.

### For Example:
- The screen width (screenWidth) is 1100 pixels.
- The cat has a width of 100 pixels.
- So, ```totalWidth``` (possible movement distance for the cat) = 1100 - 100 = **1000** pixels.

Next, let's say currentLevel is 3: 
- ```levelTime``` = Math.max(10, 70 - (3 * 10)) * 10 = **500** (meaning 50 seconds, but since we're dealing in tenths of a second, it's 500).
- Let's say totalTime is 40 seconds into the level (meaning 10 seconds have passed), and counter is 5 (meaning 0.5 seconds more has passed, so a total of 10.5 seconds).

Then we calculate the distance:

```
distance = (500 - (40 * 10) + 5) / 500 * 1000
         = (500 - 400 + 5) / 500 * 1000
         = 105 / 500 * 1000
         = 0.21 * 1000
         = 210 pixels
```

<img width="843" alt="Level3_Calculation" src="https://github.com/wiwianquek/typeracingmouse/assets/136752154/01b34cc8-9601-454d-b496-dd85a90adbab">


As depicted above, after 10.5 seconds in Level 3, the cat would have moved approximately 210 pixels to the right on the screen. 

So in conclusion, for every ```levelTime``` and ```totalTime``` recorded, there is a calculated ```distance``` where the cat will be positioned at, leading into the "animation" of the cat. 


### Improvements
- Include a leaderboard where it records the highest WPM
- Improve the timer display (currently there's a lag to display the next level time) 
- Improve the animation flow for the cat
- Optimize the UI/UX of the game 
   
## Credits
*This game is developed using vanilla JavaScript, CSS, and HTML. The quotes are fetched dynamically from the Quotable API. Background racetrack image sourced from Freepik.*
