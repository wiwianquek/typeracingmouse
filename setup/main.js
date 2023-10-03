document.addEventListener('DOMContentLoaded', function () {
    const RANDOM_QUOTE_API_URL = 'http://api.quotable.io/random';
    const quoteDisplay = document.querySelector('.quote-display');
    const quoteInput = document.querySelector('.quote-input');
    const timer = document.querySelector('.timer');
    const wpmElement = document.querySelector('.wpm');
    const levelDisplay = document.querySelector('.level'); // Get the level display element
    const catElement = document.querySelector('.cat');
    const mouseElement = document.querySelector('.mouse');
    let correct = false;
    let startTime = 0;
    let currentLevel = 0; // Initialize the current level to 1

    // Function to check if the timer has reached 0 and render a new quote
    function checkTimer() {
        if (parseInt(timer.innerText) === 0) {
            endGame(); // End the game when the timer reaches 0
        }
    }

    // Function to fetch the API quotes
    async function getRandomQuote() {
        try {
            let res = await fetch(RANDOM_QUOTE_API_URL);
            if (res.status === 200) {
                let data = await res.json();
                let quote = data['content'];
                return quote;
            } else {
                throw new Error('Failed to fetch a random quote');
            }
        } catch (error) {
            console.error(error);
            return '';
        }
    }

    // Function to clear the quote
    function clearQuoteDisplay() {
        quoteDisplay.innerText = '';
    }

    // Renders the quote in the quote-display
    function renderQuote(quote) {
        quote.split('').forEach(alphabet => {
            const alphabetSpan = document.createElement('span');
            alphabetSpan.classList.add('correct');
            alphabetSpan.innerText = alphabet;
            quoteDisplay.appendChild(alphabetSpan);
        });
    }

    let timerInterval; // Declare timerInterval outside the function scope

    function startTimer() {
        let remainingTime = 60;

        // Check if there's an existing timer interval and clear it
        if (timerInterval) {
            clearInterval(timerInterval);
        }

        function updateTimer() {
            timer.innerText = remainingTime;
            remainingTime--;

            if (remainingTime < 0) {
                clearInterval(timerInterval);
                timer.innerText = '0';
                endGame(); // End the game when the timer reaches 0
            }
        }

        updateTimer();
        timerInterval = setInterval(updateTimer, 1000);
    }

    // Function to restart the game
    function restartGame() {
        currentLevel = 0;
        levelDisplay.innerText = `Level: ${currentLevel}`;
        clearQuoteDisplay();
        quoteInput.value = '';
        startTimer();
        correct = true;
        renderNewQuote();
        catSpeed = 30; // Reset cat speed
        moveCat(); // Restart the cat animation
        moveMouse(); // Restart the mouse animation
    }

    // Function to end the game
    function endGame() {
        // Display a message or ask if the player wants to restart
        const restart = confirm('Game Over! Do you want to restart the game?');
        if (restart) {
            restartGame(); // Restart the game if the player chooses to
        } else {
            // To display end game leader
        }
    }

    // Function to calculate WPM
    function calculateWPM() {
        const currentTime = Date.now();

        if (!quoteInput.value) {
            window.wpm = 0;
            wpmElement.innerText = '0 WPM';
        } else {
            const elapsedTimeMinutes = (currentTime - startTime) / 60000; // Convert milliseconds to minutes
            const wordCount = quoteInput.value.trim().split(/\s+/).length;
    
            window.wpm = Math.round(wordCount / elapsedTimeMinutes);
            wpmElement.innerText = `${window.wpm} WPM`;
        }
    }

    // Inside the renderNewQuote function, after generating a new quote, update the level
    async function renderNewQuote() {
        clearQuoteDisplay();
        const quote = await getRandomQuote();
        renderQuote(quote);
        startTimer();
        correct = true;
        quoteInput.value = '';
        startTime = Date.now(); // Set startTime here to prevent infinity time
        calculateWPM(); // Calculate WPM here to update the global wpm variable

        // Increase the current level and update the levelDisplay
        currentLevel++;
        levelDisplay.innerText = `Level: ${currentLevel}`;

         // Reset cat and mouse positions when a new quote is displayed
        catElement.style.left = '0px';
        mouseElement.style.left = '0px';

        // Restart the cat and mouse animations
        moveCat();
        moveMouse();
    }

    // function moveMouse() {
    //     const quoteText = quoteDisplay.textContent.replace(/\s+/g, ''); // Remove spaces from displayed quote
    //     const typedText = quoteInput.value.trim();
        
    //     // Calculate the total length of the quote
    //     const totalLength = quoteText.length;
    
    //     // Get the screen width
    //     const screenWidth = window.innerWidth;
    
    //     // Calculate the distance based on the length of the generated quote
    //     const distance = screenWidth - 20; // Adjust based on screen size
    
    //     // Calculate the remaining characters to be typed
    //     const remainingCharacters = totalLength - typedText.length;
    
    //     // Calculate the distance the mouse should travel
    //     const mouseDistance = distance * (1 - remainingCharacters / totalLength);
    
    //     // Update mouse animation
    //     mouseElement.style.transition = 'none'; // Clear any existing transition
    
    //     // Calculate the number of correct characters typed
    //     let correctCharacters = 0;
    //     for (let i = 0; i < typedText.length; i++) {
    //         if (typedText[i] === quoteText[i]) {
    //             correctCharacters++;
    //         } else {
    //             break; // Stop counting when an incorrect character is encountered
    //         }
    //     }
    
    //     // Calculate the new mouse position based on correct characters
    //     const newMouseDistance = (correctCharacters / totalLength) * distance;
    
    //     // Ensure the mouse position doesn't go beyond the screen width
    //     const clampedMousePosition = Math.min(newMouseDistance, screenWidth - 20);
    
    //     if (correctCharacters === typedText.length) {
    //         // All characters are correct, move the mouse
    //         mouseElement.style.left = clampedMousePosition + 'px';
    //     } else {
    //         // Incorrect character, keep the mouse at the current position
    //         mouseElement.style.left = Math.min(mouseDistance, screenWidth - 20) + 'px';
    //     }
    
    //     // Use requestAnimationFrame for smooth animation
    //     requestAnimationFrame(moveMouse);
    // }
    

    //     // Function to move the cat based on the timer and level
    // function moveCat() {
    //     const distance = window.innerWidth - 100; // Adjust based on screen size
    //     const remainingTime = parseInt(timer.innerText);

    //     // Calculate the catSpeed based on the remaining time and level
    //     const baseCatSpeed = 30; // Initial cat speed
    //     const levelCatSpeedIncrement = 10; // Speed increment per level
    //     const catSpeed = baseCatSpeed + (currentLevel - 1) * levelCatSpeedIncrement;

    //     // Calculate the duration based on catSpeed
    //     const duration = (distance / catSpeed) * 1000;

    //     // Update cat animation
    //     catElement.style.transition = `left ${duration / 1000}s linear`;

    //     // Check if the cat should move or if the timer has run out
    //     if (remainingTime > 0) {
    //         // Update cat's position
    //         catElement.style.left = '0px'; // Move cat to the left edge

    //         // Use setTimeout to continue moving the cat
    //         setTimeout(() => {
    //             moveCat();
    //         }, duration);
    //     }
    // }

    // Function to move the cat based on the timer and level
    function moveCat() {
        const distance = window.innerWidth - 100; // Adjust based on screen size
        const remainingTime = parseInt(timer.innerText);

        // Calculate the catSpeed based on the remaining time and level
        const baseCatSpeed = 30; // Initial cat speed
        const levelCatSpeedIncrement = 10; // Speed increment per level
        const catSpeed = baseCatSpeed + (currentLevel - 1) * levelCatSpeedIncrement;

        // Calculate the duration based on catSpeed
        const duration = (distance / catSpeed) * 1000;

        // Check if the cat should move or if the timer has run out
        if (remainingTime > 0) {
            // Update cat animation
            catElement.style.transition = `left ${duration / 1000}s linear`;

            // Set the initial cat position
            let catPosition = 0;

            // Move the cat using an interval
            const interval = setInterval(() => {
                // Update the cat's left position
                catElement.style.left = catPosition + 'px';

                // Increment the position
                catPosition += 10; // You can adjust the increment for the desired speed

                if (catPosition >= distance) {
                    // Stop the interval when the cat reaches the end
                    clearInterval(interval);
                }
            }, duration / distance); // Adjust the interval speed based on the duration and distance
        }
    }


    

    function moveMouse() {
        const quoteText = quoteDisplay.textContent.replace(/\s+/g, ''); // Remove spaces from displayed quote
        const typedText = quoteInput.value.trim();
    
        // Calculate the total length of the quote
        const totalLength = quoteText.length;
    
        // Get the screen width
        const screenWidth = window.innerWidth;
    
        // Calculate the distance based on the length of the generated quote
        const distance = screenWidth - 20; // Adjust based on screen size
    
        // Calculate the remaining characters to be typed
        const remainingCharacters = totalLength - typedText.length;
    
        // Calculate the distance the mouse should travel
        const mouseDistance = distance * (1 - remainingCharacters / totalLength);
    
        // Update mouse animation
        mouseElement.style.transition = 'none'; // Clear any existing transition
    
        // Calculate the number of correct characters typed
        let correctCharacters = 0;
        for (let i = 0; i < typedText.length; i++) {
            if (typedText[i] === quoteText[i]) {
                correctCharacters++;
            } else {
                break; // Stop counting when an incorrect character is encountered
            }
        }
    
        // Calculate the new mouse position based on correct characters
        const newMouseDistance = (correctCharacters / totalLength) * distance;
    
        // Ensure the mouse position doesn't go beyond the screen width
        const clampedMousePosition = Math.min(newMouseDistance, screenWidth - 20);
    
        if (correctCharacters === typedText.length) {
            // All characters are correct, move the mouse
            mouseElement.style.left = clampedMousePosition + 'px';
        } else {
            // Incorrect character, keep the mouse at the current position
            mouseElement.style.left = Math.min(mouseDistance, screenWidth - 20) + 'px';
        }
    
        // Use requestAnimationFrame for smooth animation
        requestAnimationFrame(moveMouse);
    }
    


    

    // Add an event listener whenever something is typed in the quote-input section
    quoteInput.addEventListener('input', function () {
        calculateWPM(); // Calculate WPM based on user input

        const arrayQuote = quoteDisplay.querySelectorAll('span');
        const arrayValue = quoteInput.value.split('');
        let allCorrect = true; // Assume all characters are correct by default

        arrayQuote.forEach((alphabetSpan, index) => {
            const alphabet = arrayValue[index];
            if (alphabet === '') {
                alphabetSpan.classList.remove('correct');
                alphabetSpan.classList.remove('incorrect');
            } else if (alphabet === alphabetSpan.innerText) {
                alphabetSpan.classList.add('correct');
                alphabetSpan.classList.remove('incorrect');
            } else {
                alphabetSpan.classList.remove('correct');
                alphabetSpan.classList.add('incorrect');
                allCorrect = false; // Mark as incorrect if any character is wrong
            }
        });

        // Check if all characters are correct and the user has completed typing accurately
        if (allCorrect && arrayValue.length === arrayQuote.length) {
            renderNewQuote(); // Generate a new quote
        }
         // Start moving the cat and mouse initially
        moveCat();
        moveMouse();

        checkTimer(); // Check the timer after each input
        checkRaceEnd(); // Check the race end condition
    });

    renderNewQuote(); // Initial quote rendering
});
