// Configuration settings for the AI Document Analyzer application

const config = {
    api: {
        key: '', // Your API key for the Gemini service
        url: 'https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent'
    },
    app: {
        title: 'AI Document Analyzer',
        version: '1.0.0'
    },
    notifications: {
        toastDuration: 3000 // Duration for toast notifications in milliseconds
    }
};

export default config;