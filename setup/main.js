const RANDOM_QUOTE_API_URL = 'http://api.quotable.io/random' //to get a random quote from this API
const quoteDisplayElement = document.getElementById('quoteDisplay')

function getRandomQuote() {
    return fetch(RANDOM_QUOTE_API_URL)
        .then(response => response.json())
        .then(data => data.content) //to get the content in the api 
}


async function renderNewQuote() { 
    const quote = await getRandomQuote() //await is used to wait for the getRandomQuote function to complete and return a result before proceeding 
    quoteDisplayElement.innerText = quote
}


renderNewQuote()

