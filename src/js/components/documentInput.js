// This file manages the document input area. It exports a function that initializes the input field and updates the character counter.

/**
 * Initializes the document input functionality
 */
export function initializeDocumentInput() {
    const docInput = document.getElementById('document-input');
    const charCounter = document.getElementById('char-counter');
    const wordCounter = document.getElementById('word-counter');

    if (!docInput || !charCounter || !wordCounter) {
        console.warn('Document input elements not found');
        return;
    }

    // Update counters on input
    const updateCounters = () => {
        const text = docInput.value;
        const charCount = text.length;
        const wordCount = text.trim() === '' ? 0 : text.trim().split(/\s+/).length;

        charCounter.textContent = `${charCount} caracteres`;
        wordCounter.textContent = `${wordCount} palavras`;
    };

    // Add event listener
    docInput.addEventListener('input', updateCounters);
    
    // Initialize counters
    updateCounters();

    // Add placeholder animation on focus
    docInput.addEventListener('focus', () => {
        docInput.parentElement.classList.add('focused');
    });

    docInput.addEventListener('blur', () => {
        if (!docInput.value) {
            docInput.parentElement.classList.remove('focused');
        }
    });
}

// Legacy support for the old export format
const documentInput = {
    init: initializeDocumentInput
};

export default documentInput;