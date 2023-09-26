document.addEventListener('DOMContentLoaded', function() {
    const RANDOM_QUOTE_API_URL = 'http://api.quotable.io/random';
    const quoteDisplay = document.querySelector('.quote-display');
    const quoteInput = document.querySelector('.quote-input');
    const timer = document.querySelector('.timer');
    let correct = false; // Initialize correct variable

//We wanna add eventlistener here whenever something is typed in the quote-input section, we will use the 'input' event to listen for changes in the value of the quoteInput element.
   
    quoteInput.addEventListener('input', function() {
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
    });

    async function getRandomQuote() {
        try {
            let res = await fetch(RANDOM_QUOTE_API_URL); //fetch the quote from the api
            if (res.status === 200) {
                let data = await res.json(); //this only stores the quote we want 
                let quote = data['content'];
                return quote;
            } else {
                throw new Error('Failed to fetch a random quote'); //throws a proper error instead of using "return res.json;"
            }
        } catch (error) {
            console.error(error);
            return '';
        }
    }

    function clearQuoteDisplay() {
        quoteDisplay.innerText = ''; //displays api quote on the quote-display section 
    }

    function renderQuote(quote) {
        quote.split('').forEach(alphabet => { //we will split each individual characters in the quote here
            const alphabetSpan = document.createElement('span');
            alphabetSpan.classList.add('correct');
            alphabetSpan.innerText = alphabet;
            quoteDisplay.appendChild(alphabetSpan);
        });
    }

    function startTimer() {
        let startTime = Date.now();
        setInterval(() => {
            const elapsedSeconds = Math.floor((Date.now() - startTime) / 1000);
            timer.innerText = elapsedSeconds;
        }, 1000);
    }

    async function renderNewQuote() {
        clearQuoteDisplay();
        const quote = await getRandomQuote();
        renderQuote(quote);
        startTimer();
        correct = true; // Set correct to true when a new quote is rendered
    }

    renderNewQuote();
});
