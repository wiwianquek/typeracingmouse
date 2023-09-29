document.addEventListener('DOMContentLoaded', function() {
    const RANDOM_QUOTE_API_URL = 'http://api.quotable.io/random';
    const quoteDisplay = document.querySelector('.quote-display');
    const quoteInput = document.querySelector('.quote-input');
    const timer = document.querySelector('.timer');
    const wpmElement = document.querySelector('.wpm');
    let correct = false;
    let startTime = 0;
    let wpm = 0; // Initialize WPM to 0

    // Function to check if the timer has reached 0 and render a new quote
    function checkTimer() {
        if (parseInt(timer.innerText) === 0) {
            renderNewQuote();
        }
    }

    // Function to check if the cat or mouse has reached the ending point
    function checkRaceEnd() {
        const catPosition = catElement.getBoundingClientRect().right;
        const mousePosition = mouseElement.getBoundingClientRect().right;
        const raceEndPosition = window.innerWidth;

        if (catPosition >= raceEndPosition || mousePosition >= raceEndPosition) {
            // Reset cat and mouse positions when the race ends
            catElement.style.left = '0px';
            mouseElement.style.left = '0px';
            renderNewQuote(); // Trigger a new quote when the race ends
        }
    }

    // Function to calculate WPM
    function calculateWPM() {
        const currentTime = Date.now();
        const elapsedTimeMinutes = (currentTime - startTime) / 60000; // Convert milliseconds to minutes
        const wordCount = quoteInput.value.trim().split(/\s+/).length;
        wpm = Math.round(wordCount / elapsedTimeMinutes);
        wpmElement.innerText = `${wpm} WPM`;

        // Update mouse speed to match the user's typing speed
        mouseSpeed = wpm;
    }

    // We wanna add an event listener here whenever something is typed in the quote-input section
    quoteInput.addEventListener('input', function() {
        if (startTime === 0) {
            startTime = Date.now();
        }

        calculateWPM(); // Calculate WPM based on user input

        const arrayQuote = quoteDisplay.querySelectorAll('span');
        const arrayValue = quoteInput.value.split('');
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
                correct = false;
            }
        });

        checkTimer(); // Check the timer after each input
        checkRaceEnd(); // Check the race end condition
    });

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

    function clearQuoteDisplay() {
        quoteDisplay.innerText = '';
    }

    function renderQuote(quote) {
        quote.split('').forEach(alphabet => {
            const alphabetSpan = document.createElement('span');
            alphabetSpan.classList.add('correct');
            alphabetSpan.innerText = alphabet;
            quoteDisplay.appendChild(alphabetSpan);
        });
    }

    function startTimer() {
        let remainingTime = 60;

        function updateTimer() {
            timer.innerText = remainingTime;
            remainingTime--;

            if (remainingTime < 0) {
                clearInterval(timerInterval);
                timer.innerText = '0';
                checkTimer(); // Check the timer when it reaches 0
            }
        }

        updateTimer();
        const timerInterval = setInterval(updateTimer, 1000);
    }

    async function renderNewQuote() {
        clearQuoteDisplay();
        const quote = await getRandomQuote();
        renderQuote(quote);
        startTimer();
        correct = true;
        quoteInput.value = '';
        wpmElement.innerText = ''; // Clear the WPM when a new quote is rendered
        wpm = 0; // Reset WPM when a new quote is rendered
    }

    let catSpeed = 30; // Starting cat speed (WPM)

    const catElement = document.querySelector('.cat');
    const mouseElement = document.querySelector('.mouse');

    function moveCat() {
        const distance = window.innerWidth - 100; // Adjust based on screen size
        const duration = (distance / catSpeed * 60 * 1000) / 10; // Make the animation 10 times faster

        catElement.style.transition = `left ${duration / 1000}s linear`;
        catElement.style.left = distance + 'px';

        // Reset cat speed (e.g., increase by 10 WPM)
        catSpeed += 10;

        // Use requestAnimationFrame for smooth animation
        requestAnimationFrame(moveCat);
    }

    let mouseSpeed = 40; // Starting mouse speed (WPM)

    function moveMouse() {
        const distance = window.innerWidth - 100; // Adjust based on screen size
        const duration = (distance / wpm * 60 * 1000) / 10; // Make the animation 10 times faster

        mouseElement.style.transition = `left ${duration / 1000}s linear`;
        mouseElement.style.left = distance + 'px';

        // Use requestAnimationFrame for smooth animation
        requestAnimationFrame(moveMouse);
    }

    // Start moving the cat and mouse
    moveCat();
    moveMouse();

    renderNewQuote(); // Initial quote rendering
});
