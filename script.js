document.addEventListener('DOMContentLoaded', () => {
    const quoteDisplay = document.getElementById('quoteDisplay');
    const newQuoteButton = document.getElementById('newQuote');
    const addQuoteButton = document.getElementById('addQuoteBtn');

    let quotes = [
        { text: "The only limit to our realization of tomorrow is our doubts of today.", category: "Motivational" },
        { text: "Life is 10% what happens to us and 90% how we react to it.", category: "Inspirational" },
        { text: "Good friends, good books, and a sleepy conscience: this is the ideal life.", category: "Friendship" }
    ];

    function showRandomQuote() {
        const randomIndex = Math.floor(Math.random() * quotes.length);
        const randomQuote = quotes[randomIndex];
        quoteDisplay.innerHTML = `<p>${randomQuote.text}</p><p><em>Category: ${randomQuote.category}</em></p>`;
    }

    function addQuote() {
        const newQuoteText = document.getElementById('newQuoteText').value.trim();
        const newQuoteCategory = document.getElementById('newQuoteCategory').value.trim();
        if (newQuoteText === '' || newQuoteCategory === '') {
            alert('Please enter both a quote and a category.');
            return;
        }
        const newQuote = { text: newQuoteText, category: newQuoteCategory };
        quotes.push(newQuote);
        document.getElementById('newQuoteText').value = '';
        document.getElementById('newQuoteCategory').value = '';
    }

    newQuoteButton.addEventListener('click', showRandomQuote);
    addQuoteButton.addEventListener('click', addQuote);
});
