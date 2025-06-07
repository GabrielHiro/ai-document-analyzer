// This file serves as the entry point for the JavaScript code. It initializes the application, sets up event listeners, and manages the overall application flow.

import { initializeDocumentInput } from './components/documentInput.js';
import { setupActionButtons } from './components/actionButtons.js';
import { displayResult } from './components/resultDisplay.js';
import { showToast } from './components/toast.js';
import { validateInput } from './utils/validation.js';
import { processRequest } from './api/gemini.js';

document.addEventListener('DOMContentLoaded', () => {
    initializeDocumentInput();
    setupActionButtons(processRequest, validateInput, displayResult, showToast);
});