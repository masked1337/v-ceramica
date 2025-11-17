// Language switching functionality
let currentLang = 'mk'; // Default language

// Function to load translations
async function loadTranslations(lang) {
    try {
        const response = await fetch('data/translations.json');
        const translations = await response.json();
        return translations[lang];
    } catch (error) {
        console.error('Error loading translations:', error);
        return null;
    }
}

// Function to change language
async function changeLanguage(lang) {
    const loadingSpinner = document.getElementById('loadingSpinner');
    loadingSpinner.classList.add('active');
    
    try {
        const translations = await loadTranslations(lang);
        if (!translations) return;
        
        currentLang = lang;
        
        // Update active button
        document.querySelectorAll('.language-selector button').forEach(btn => {
            if (btn.dataset.lang === lang) {
                btn.classList.add('active');
            } else {
                btn.classList.remove('active');
            }
        });
        
        // Update all translatable elements
        document.querySelectorAll('[data-key]').forEach(element => {
            const key = element.dataset.key;
            if (translations[key]) {
                element.textContent = translations[key];
            }
        });
        
        // Update HTML lang attribute
        document.documentElement.lang = lang;
    } catch (error) {
        console.error('Error changing language:', error);
    } finally {
        loadingSpinner.classList.remove('active');
    }
}

// Initialize language functionality
document.addEventListener('DOMContentLoaded', function() {
    const langButtons = document.querySelectorAll('.language-selector button');
    
    // Add click event listeners to language buttons
    langButtons.forEach(button => {
        button.addEventListener('click', function() {
            const lang = this.dataset.lang;
            changeLanguage(lang);
        });
    });
});