// src/js/components/actionButtons.js

import { processRequest } from '../api/gemini.js';
import { showToast } from './toast.js';
import { validateInput } from '../utils/validation.js';
import { displayResult } from './resultDisplay.js';

/**
 * Sets up event listeners for action buttons
 * @param {Function} processRequestFn - Function to process API requests
 * @param {Function} validateInputFn - Function to validate input
 * @param {Function} displayResultFn - Function to display results
 * @param {Function} showToastFn - Function to show toast notifications
 */
export function setupActionButtons(processRequestFn, validateInputFn, displayResultFn, showToastFn) {
    const actionButtons = document.querySelectorAll('.action-card');
    const documentInput = document.getElementById('document-input');

    actionButtons.forEach(button => {
        button.addEventListener('click', async () => {
            const action = button.dataset.action;
            const text = documentInput.value;

            // Validate input
            const validation = validateInputFn(text);
            if (!validation.isValid) {
                showToastFn(validation.message, true);
                return;
            }

            // Process the request
            await processRequestFn(action, text, displayResultFn, showToastFn);
        });
    });

    // Setup copy and download buttons
    setupResultActions();
}

/**
 * Sets up copy and download functionality for results
 */
function setupResultActions() {
    const copyBtn = document.getElementById('copy-btn');
    const downloadBtn = document.getElementById('download-btn');
    const clearBtn = document.getElementById('clear-btn');
    const pasteBtn = document.getElementById('paste-btn');

    if (copyBtn) {
        copyBtn.addEventListener('click', () => {
            const resultContent = document.getElementById('result-content');
            if (resultContent && resultContent.textContent.trim()) {
                navigator.clipboard.writeText(resultContent.textContent)
                    .then(() => {
                        showToast('Resultado copiado para a área de transferência!');
                    })
                    .catch(() => {
                        showToast('Erro ao copiar o resultado.', true);
                    });
            }
        });
    }

    if (downloadBtn) {
        downloadBtn.addEventListener('click', () => {
            const resultContent = document.getElementById('result-content');
            const resultTitle = document.getElementById('result-title');
            
            if (resultContent && resultContent.textContent.trim()) {
                const content = `${resultTitle.textContent}\n\n${resultContent.textContent}`;
                const blob = new Blob([content], { type: 'text/plain' });
                const url = URL.createObjectURL(blob);
                const a = document.createElement('a');
                
                a.href = url;
                a.download = `${resultTitle.textContent.toLowerCase().replace(/\s+/g, '-')}.txt`;
                document.body.appendChild(a);
                a.click();
                document.body.removeChild(a);
                URL.revokeObjectURL(url);
                
                showToast('Arquivo baixado com sucesso!');
            }
        });
    }

    if (clearBtn) {
        clearBtn.addEventListener('click', () => {
            const documentInput = document.getElementById('document-input');
            documentInput.value = '';
            
            // Trigger input event to update character counter
            documentInput.dispatchEvent(new Event('input'));
            
            showToast('Texto limpo!');
        });
    }

    if (pasteBtn) {
        pasteBtn.addEventListener('click', async () => {
            try {
                const text = await navigator.clipboard.readText();
                const documentInput = document.getElementById('document-input');
                documentInput.value = text;
                
                // Trigger input event to update character counter
                documentInput.dispatchEvent(new Event('input'));
                
                showToast('Texto colado com sucesso!');
            } catch (error) {
                showToast('Erro ao colar o texto. Verifique as permissões.', true);
            }
        });
    }
}