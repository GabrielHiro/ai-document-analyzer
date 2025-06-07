// src/js/utils/markdown.js

export function markdownToHTML(markdown) {
    let htmlContent = markdown
        .replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>') // Bold
        .replace(/\*(.*?)\*/g, '<em>$1</em>')             // Italic
        .replace(/~~(.*?)~~/g, '<del>$1</del>')           // Strikethrough
        .replace(/`(.*?)`/g, '<code>$1</code>')           // Inline code
        .replace(/### (.*?)\n/g, '<h3>$1</h3>\n')         // H3
        .replace(/## (.*?)\n/g, '<h2>$1</h2>\n')           // H2
        .replace(/# (.*?)\n/g, '<h1>$1</h1>\n')            // H1
        .replace(/\n/g, '<br>');                           // New lines

    return htmlContent;
}

export function escapeHTML(html) {
    const div = document.createElement('div');
    div.innerText = html;
    return div.innerHTML;
}