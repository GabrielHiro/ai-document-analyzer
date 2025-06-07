function showToast(message, isError = false) {
    const toast = document.createElement('div');
    toast.className = `fixed bottom-5 right-5 text-white py-2 px-4 rounded-lg shadow-lg transition-opacity duration-300 ${isError ? 'bg-red-600' : 'bg-gray-900'}`;
    toast.textContent = message;
    document.body.appendChild(toast);
    
    // Show the toast
    requestAnimationFrame(() => {
        toast.classList.remove('opacity-0');
    });

    // Hide the toast after 3 seconds
    setTimeout(() => {
        toast.classList.add('opacity-0');
        toast.addEventListener('transitionend', () => {
            document.body.removeChild(toast);
        });
    }, 3000);
}

export { showToast };