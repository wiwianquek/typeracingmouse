document.addEventListener('DOMContentLoaded', function () {
    const RANDOM_QUOTE_API_URL = 'http://api.quotable.io/random';
    const quoteDisplay = document.querySelector('.quote-display');
    const quoteInput = document.querySelector('.quote-input');
    const timer = document.querySelector('.timer');
    const wpmElement = document.querySelector('.wpm');
    const levelDisplay = document.querySelector('.level'); // Get the level display element
    const catElement = document.querySelector('.cat');
    const mouseElement = document.querySelector('.mouse');
    let startTime = 0;
    let currentLevel = 0; // Initialize the current level to 1
    let mouseAnimationFrame;  // Declare this to keep track of the mouse's animation frame
    let totalTime = 60; //Set initial time at 60 seconds

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

    function renderQuote(quote) {
        quote.split('').forEach(alphabet => {
            const alphabetSpan = document.createElement('span');
            alphabetSpan.classList.add('correct');
            alphabetSpan.innerText = alphabet;
            quoteDisplay.appendChild(alphabetSpan);
        });
    }

     // Function to clear the quote
     function clearQuoteDisplay() {
        quoteDisplay.innerText = '';
        quoteInput.value = '';
    }

    // Function to restart the game
    function restartGame() {
        gameEnded = false; //resets the 'gameEnded' flag to false so that the game doesn't end prematurely 
        mouseElement.style.left = '0px';
        catElement.style.left = '0px';
        currentLevel = 0;
        startTime = Date.now();
        levelDisplay.innerText = `Level: ${currentLevel}`;
        wpmElement.innerText = '0 WPM';  // Reset WPM display
        renderNewQuote();
    }
    
    // Function to end the game
    let gameEnded = false;

    function endGame(reason) {
        console.log("endGame called due to:", reason);
        if (gameEnded) return; // Prevent multiple calls

        gameEnded = true;

        // Cancel both cat and mouse animation frames
        if (mouseAnimationFrame) {
            cancelAnimationFrame(mouseAnimationFrame);
        }

        const restart = confirm('Game Over! Do you want to restart the game?');
        if (restart) {
            restartGame();
        } else {
            // To display end game leaderboard or other actions
        }
        console.log("endGame called");
    }

     // Function to check if the timer has reached 0 and render a new quote
     function checkTimer() {
        if (parseInt(timer.innerText) === 0) {
            endGame("timer hit zero"); // End the game when the timer reaches 0
        }
    }
    
    //Function to add a timer 
    let timerInterval; // Declare timerInterval outside the function scope

    function startTimer() {

        // Check if there's an existing timer interval and clear it
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

            //Function to move the cat
            const screenWidth = window.innerWidth;
            const totalWidth = screenWidth - 100; // Adjust for cat width
            const levelTime = Math.max(10, 70 - (currentLevel * 10)) * 10;

            const distance = (levelTime - (totalTime * 10) + counter) / levelTime * totalWidth;
            // console.log(levelTime, totalTime, counter, distance);
            catElement.style.left = `${distance}px`;

            if (totalTime < 0) {
                clearInterval(timerInterval);
                timer.innerText = '0';
                endGame("timer hit zerooo"); // End the game when the timer reaches 0
            }
        }

        timerInterval = setInterval(updateTimer, 100);
        
    }


    // Function to calculate WPM
    function calculateWPM() {
        const currentTime = Date.now();

        if (!quoteInput.value) {
            window.wpm = 0;
            wpmElement.innerText = '0 WPM';
        } else {
            const elapsedTimeMinutes = Math.max(0.01, (currentTime - startTime) / 60000); // Convert milliseconds to minutes
            const wordCount = quoteInput.value.trim().split(/\s+/).length;
    
            window.wpm = Math.round(wordCount / elapsedTimeMinutes);
            wpmElement.innerText = `${window.wpm} WPM`;
        }
    }
    

    //Function to move the mouse
    function moveMouse() {
        if (gameEnded) return;  // Don't continue updating the mouse if the game ended

        const quoteText = quoteDisplay.textContent
        const typedText = quoteInput.value
    
        // Calculate the total length of the quote
        const totalLength = quoteText.length;
       
        // Calculate the distance based on the length of the generated quote
        const distance = document.querySelector('.content-wrapper').clientWidth - 50; // Adjust based on screen size
    
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
    
       
         // Incorrect character, keep the mouse at the current position
        mouseElement.style.left = Math.min(newMouseDistance, distance) + 'px';
        

        // Use requestAnimationFrame for smooth animation
        mouseAnimationFrame = requestAnimationFrame(moveMouse);
    }
    
    
    //Function to render a new Quote
    async function renderNewQuote() {
        // Cancel mouse animation frames
        if (mouseAnimationFrame) {
            cancelAnimationFrame(mouseAnimationFrame);
        }

        // Reset cat and mouse positions after canceling their animation frames
        catElement.style.left = '0px';
        mouseElement.style.left = '0px';
        mouseElement.offsetHeight;  // Force a reflow
        
        // Reset the start time here
        startTime = Date.now();
        
        //Clear my quote display and render new quote 
        clearQuoteDisplay();
        const quote = await getRandomQuote();
        renderQuote(quote);
        startTimer();
        
    
        // Start the movement for both cat and mouse
        lastTimestamp = null;
        moveMouse();
    
        calculateWPM();
        
    
        // // Increase the current level and update the levelDisplay
        currentLevel++;
        totalTime = Math.max(10, 70 - (currentLevel * 10));
        levelDisplay.innerText = `Level: ${currentLevel}`;
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

        if (allCorrect && arrayValue.length === arrayQuote.length) {
            clearQuoteDisplay();  // Clear the quote
            renderNewQuote();  // Fetch and display a new quote
        }
    
        checkTimer();
    });

    renderNewQuote(); // Initial quote rendering
});

///
