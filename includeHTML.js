function includeHTML() {
    const elements = document.querySelectorAll('[data-include-html]');
    elements.forEach(element => {
        const file = element.getAttribute('data-include-html');
        if (file) {
            fetch(file)
                .then(response => {
                    if (!response.ok) throw new Error('Network response was not ok');
                    return response.text();
                })
                .then(data => {
                    element.innerHTML = data;
                    element.removeAttribute('data-include-html');
                    includeHTML(); // Рекурсивный вызов для поддержки вложенных включений
                })
                .catch(error => console.error('Error:', error));
        }
    });
}

document.addEventListener('DOMContentLoaded', includeHTML);