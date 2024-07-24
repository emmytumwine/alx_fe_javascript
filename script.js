document.addEventListener('DOMContentLoaded', () => {
    const quoteDisplay = document.getElementById('quoteDisplay');
    const newQuoteButton = document.getElementById('newQuote');
    const addQuoteButton = document.getElementById('addQuoteBtn');
    const exportButton = document.getElementById('exportQuotes');
    const importInput = document.getElementById('importFile');
    const categoryFilter = document.getElementById('categoryFilter');

    let quotes = JSON.parse(localStorage.getItem('quotes')) || [
        { text: "The only limit to our realization of tomorrow is our doubts of today.", category: "Motivational" },
        { text: "Life is 10% what happens to us and 90% how we react to it.", category: "Inspirational" },
        { text: "Good friends, good books, and a sleepy conscience: this is the ideal life.", category: "Friendship" }
    ];

    // Show a random quote
    function showRandomQuote() {
        const filteredQuotes = getFilteredQuotes();
        if (filteredQuotes.length === 0) {
            quoteDisplay.innerHTML = '<p>No quotes available.</p>';
            return;
        }
        const randomIndex = Math.floor(Math.random() * filteredQuotes.length);
        const randomQuote = filteredQuotes[randomIndex];
        quoteDisplay.innerHTML = `<p>${randomQuote.text}</p><p><em>Category: ${randomQuote.category}</em></p>`;
    }

    // Add a new quote
    function addQuote() {
        const newQuoteText = document.getElementById('newQuoteText').value.trim();
        const newQuoteCategory = document.getElementById('newQuoteCategory').value.trim();
        if (newQuoteText && newQuoteCategory) {
            const newQuote = { text: newQuoteText, category: newQuoteCategory };
            quotes.push(newQuote);
            saveQuotes();
            updateCategoryFilter();
            showRandomQuote();
            document.getElementById('newQuoteText').value = '';
            document.getElementById('newQuoteCategory').value = '';
        } else {
            alert('Please enter both quote text and category.');
        }
    }

    // Save quotes to local storage
    function saveQuotes() {
        localStorage.setItem('quotes', JSON.stringify(quotes));
    }

    // Export quotes to a JSON file
    function exportQuotes() {
        const dataStr = JSON.stringify(quotes, null, 2);
        const blob = new Blob([dataStr], { type: 'application/json' });
        const url = URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = 'quotes.json';
        a.click();
        URL.revokeObjectURL(url);
    }

    // Import quotes from a JSON file
    function importFromJsonFile(event) {
        const fileReader = new FileReader();
        fileReader.onload = function(event) {
            try {
                const importedQuotes = JSON.parse(event.target.result);
                if (Array.isArray(importedQuotes)) {
                    quotes = importedQuotes;
                    saveQuotes();
                    updateCategoryFilter();
                    showRandomQuote();
                    alert('Quotes imported successfully!');
                } else {
                    alert('Invalid file format.');
                }
            } catch (error) {
                alert('Error reading file.');
            }
        };
        fileReader.readAsText(event.target.files[0]);
    }

    // Update the category filter dropdown
    function updateCategoryFilter() {
        const categories = new Set(quotes.map(q => q.category));
        categoryFilter.innerHTML = '<option value="all">All Categories</option>';
        categories.forEach(category => {
            const option = document.createElement('option');
            option.value = category;
            option.textContent = category;
            categoryFilter.appendChild(option);
        });
    }

    // Filter quotes based on the selected category
    function filterQuotes() {
        const selectedCategory = categoryFilter.value;
        localStorage.setItem('lastFilter', selectedCategory);
        showRandomQuote();
    }

    // Get filtered quotes
    function getFilteredQuotes() {
        const selectedCategory = categoryFilter.value;
        if (selectedCategory === 'all') {
            return quotes;
        } else {
            return quotes.filter(q => q.category === selectedCategory);
        }
    }

    // Initialize
    updateCategoryFilter();
    const lastFilter = localStorage.getItem('lastFilter');
    if (lastFilter) {
        categoryFilter.value = lastFilter;
    }
    showRandomQuote();

    // Event listeners
    newQuoteButton.addEventListener('click', showRandomQuote);
    addQuoteButton.addEventListener('click', addQuote);
    exportButton.addEventListener('click', exportQuotes);
    importInput.addEventListener('change', importFromJsonFile);
});
