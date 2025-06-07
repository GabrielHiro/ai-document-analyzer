// src/js/components/resultDisplay.js

export function displayResult(content) {
    const resultContent = document.getElementById('result-content');
    let htmlContent = convertMarkdownToHTML(content);
    resultContent.innerHTML = htmlContent;
}

function convertMarkdownToHTML(content) {
    return content
        .replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>') // Bold
        .replace(/\*(.*?)\*/g, '<em>$1</em>')           // Italics
        .replace(/(\r\n|\n|\r)/g, '<br>');               // New lines
}

export function setLoadingState(isLoading, actionTitle) {
    const resultContainer = document.getElementById('result-container');
    const loadingSpinner = document.getElementById('loading-spinner');
    const actionButtons = document.querySelectorAll('.action-btn');
    const resultTitle = document.getElementById('result-title');

    if (isLoading) {
        resultContainer.classList.remove('hidden');
        loadingSpinner.classList.remove('hidden');
        resultTitle.textContent = actionTitle;
        actionButtons.forEach(btn => btn.disabled = true);
    } else {
        loadingSpinner.classList.add('hidden');
        actionButtons.forEach(btn => btn.disabled = false);
    }
}