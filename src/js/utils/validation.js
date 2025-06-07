// src/js/utils/validation.js

export function isValidTextLength(text, minLength = 20) {
    return text.trim().length >= minLength;
}

export function isEmptyText(text) {
    return text.trim().length === 0;
}

export function containsInvalidCharacters(text) {
    const invalidChars = /[<>]/; // Example: disallowing < and > characters
    return invalidChars.test(text);
}

export function validateInput(text) {
    if (isEmptyText(text)) {
        return { isValid: false, message: "O texto não pode estar vazio." };
    }
    if (!isValidTextLength(text)) {
        return { isValid: false, message: `O texto deve ter pelo menos ${minLength} caracteres.` };
    }
    if (containsInvalidCharacters(text)) {
        return { isValid: false, message: "O texto contém caracteres inválidos." };
    }
    return { isValid: true, message: "" };
}