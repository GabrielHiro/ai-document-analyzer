import config from '../../../config/config.js';
const API_KEY = config.api.key;
const API_URL = config.api.url;

// This file handles API interactions with the Gemini service. 
// It exports functions for making requests to the API and processing responses.

/**
 * Makes a request to the Gemini API.
 * @param {string} action - The action to be performed (summarize, analyze, etc.).
 * @param {string} text - The text to be processed by the API.
 * @returns {Promise<string>} - The AI's response.
 */
export async function requestGemini(action, text) {
    const prompt = getPrompt(action, text);
    const payload = {
        contents: [{ role: "user", parts: [{ text: prompt }] }]
    };

    try {
        console.debug("[Gemini] Payload:", payload);

        const response = await fetch(`${API_URL}?key=${API_KEY}`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(payload)
        });

        console.debug("[Gemini] Response status:", response.status, response.statusText);

        if (!response.ok) {
            const errorText = await response.text();
            console.error(`[Gemini] API Error: ${response.statusText}`, errorText);
            throw new Error(`API Error: ${response.statusText} - ${errorText}`);
        }

        const result = await response.json();
        console.debug("[Gemini] API Result:", result);

        return result.candidates && result.candidates.length > 0 
            ? result.candidates[0].content.parts[0].text 
            : 'No valid response from the AI.';
    } catch (error) {
        console.error("[Gemini] Error in API request:", error);
        throw error;
    }
}

/**
 * Processes a complete request including loading states and error handling
 * @param {string} action - The action to be performed
 * @param {string} text - The text to be processed
 * @param {Function} displayResult - Function to display results
 * @param {Function} showToast - Function to show toast notifications
 */
export async function processRequest(action, text, displayResult, showToast) {
    const resultContainer = document.getElementById('result-container');
    const loadingSpinner = document.getElementById('loading-spinner');
    const resultTitle = document.getElementById('result-title');
    const resultContent = document.getElementById('result-content');
    const actionButtons = document.querySelectorAll('.action-card');

    try {
        // Show loading state
        resultContainer.classList.remove('hidden');
        loadingSpinner.classList.remove('hidden');
        resultContent.innerHTML = '';
        
        // Update title based on action
        const actionTitles = {
            summarize: 'Resumo do Documento',
            analyze: 'Análise Crítica',
            improve: 'Texto Melhorado',
            plagiarism: 'Verificação de Plágio'
        };
        resultTitle.textContent = actionTitles[action] || 'Resultado da Análise';
        
        // Disable action buttons
        actionButtons.forEach(btn => btn.disabled = true);

        // Make API request
        const result = await requestGemini(action, text);
        
        // Hide loading and show result
        loadingSpinner.classList.add('hidden');
        displayResult(result);
        
        showToast('Análise concluída com sucesso!', false);
        
    } catch (error) {
        console.error('[Gemini] Error processing request:', error);
        loadingSpinner.classList.add('hidden');
        resultContent.innerHTML = `
            <div class="error-message">
                <p><strong>Erro ao processar o documento:</strong></p>
                <p>${error.message}</p>
                <pre>${error.stack}</pre>
                <p>Por favor, tente novamente.</p>
            </div>
        `;
        showToast('Erro ao processar o documento. Tente novamente.', true);
    } finally {
        // Re-enable action buttons
        actionButtons.forEach(btn => btn.disabled = false);
    }
}

/**
 * Constructs the full prompt for the API request based on the action.
 * @param {string} action - The action to be performed.
 * @param {string} text - The text to be processed.
 * @returns {string} - The full prompt for the API.
 */
function getPrompt(action, text) {
    const actions = {
        summarize: "Resuma o seguinte texto de forma clara e concisa, focando nos pontos-chave e na ideia central. Formate a resposta de forma organizada e profissional. Texto:",
        analyze: "Faça uma análise crítica detalhada do seguinte texto, incluindo pontos fortes, fracos, estrutura, argumentação e sugestões de melhoria. Texto:",
        improve: "Reescreva o seguinte texto para torná-lo mais profissional, claro e bem estruturado. Mantenha o significado original, mas melhore a fluidez e clareza. Texto:",
        plagiarism: "Analise o seguinte texto quanto à originalidade. Identifique possíveis indícios de plágio, frases comuns ou padrões que possam indicar conteúdo não original. Forneça uma avaliação sobre a originalidade do texto. Texto:"
    };

    return `${actions[action]}\n\n---\n\n${text}`;
}