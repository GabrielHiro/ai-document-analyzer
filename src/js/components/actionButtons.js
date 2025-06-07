// src/js/components/actionButtons.js

/**
 * Sets up event listeners for action buttons
 * @param {Function} processRequestFn - Function to process API requests
 * @param {Function} validateInputFn - Function to validate input
 * @param {Function} displayResultFn - Function to display results
 * @param {Function} showToastFn - Function to show toast notifications
 */
export function setupActionButtons(processRequestFn, validateInputFn, displayResultFn, showToastFn) {
    const elements = {
        actionButtons: document.querySelectorAll('.action-card'),
        documentInput: document.getElementById('document-input'),
        resultContent: document.getElementById('result-content'),
        resultTitle: document.getElementById('result-title'),
        copyBtn: document.getElementById('copy-btn'),
        downloadBtn: document.getElementById('download-btn'),
        clearBtn: document.getElementById('clear-btn'),
        pasteBtn: document.getElementById('paste-btn')
    };

    // Set up main action buttons
    elements.actionButtons.forEach(button => {
        button.addEventListener('click', async () => {
            const action = button.dataset.action;
            const text = elements.documentInput.value;

            if (!validateAndProcessInput(text, action, validateInputFn, processRequestFn, displayResultFn, showToastFn)) {
                return;
            }
        });
    });

    // Set up utility buttons
    setupCopyButton(elements, showToastFn);
    setupDownloadButton(elements, showToastFn);
    setupClearButton(elements, showToastFn);
    setupPasteButton(elements, showToastFn);
}

/**
 * Validates input and processes the request if valid
 */
function validateAndProcessInput(text, action, validateFn, processFn, displayFn, toastFn) {
    const validation = validateFn(text);
    if (!validation.isValid) {
        toastFn(validation.message, true);
        return false;
    }

    processFn(action, text, displayFn, toastFn).catch(err => {
        toastFn(`Error processing request: ${err.message}`, true);
    });
    
    return true;
}

/**
 * Sets up the copy button functionality
 */
function setupCopyButton(elements, showToastFn) {
    if (!elements.copyBtn) return;
    
    elements.copyBtn.addEventListener('click', () => {
        const content = elements.resultContent?.textContent?.trim();
        if (!content) return;
        
        navigator.clipboard.writeText(content)
            .then(() => showToastFn('Resultado copiado para a área de transferência!'))
            .catch(err => showToastFn('Erro ao copiar o resultado.', true));
    });
}

/**
 * Sets up the download button functionality
 */
function setupDownloadButton(elements, showToastFn) {
    if (!elements.downloadBtn) return;
    
    elements.downloadBtn.addEventListener('click', () => {
        const content = elements.resultContent?.textContent?.trim();
        const title = elements.resultTitle?.textContent || 'resultado';
        
        if (!content) return;
        
        const fullContent = `${elements.resultTitle.textContent}\n\n${content}`;
        const fileName = `${title.toLowerCase().replace(/\s+/g, '-')}.txt`;
        
        downloadTextAsFile(fullContent, fileName);
        showToastFn('Arquivo baixado com sucesso!');
    });
}

/**
 * Downloads text content as a file
 */
function downloadTextAsFile(content, fileName) {
    const blob = new Blob([content], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    
    a.href = url;
    a.download = fileName;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
}

/**
 * Sets up the clear button functionality
 */
function setupClearButton(elements, showToastFn) {
    if (!elements.clearBtn) return;
    
    elements.clearBtn.addEventListener('click', () => {
        elements.documentInput.value = '';
        elements.documentInput.dispatchEvent(new Event('input'));
        showToastFn('Texto limpo!');
    });
}

/**
 * Sets up the paste button functionality
 */
function setupPasteButton(elements, showToastFn) {
    if (!elements.pasteBtn) return;
    
    elements.pasteBtn.addEventListener('click', async () => {
        try {
            const text = await navigator.clipboard.readText();
            elements.documentInput.value = text;
            elements.documentInput.dispatchEvent(new Event('input'));
            showToastFn('Texto colado com sucesso!');
        } catch (error) {
            showToastFn('Erro ao colar o texto. Verifique as permissões.', true);
        }
    });
}