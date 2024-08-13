document.addEventListener('DOMContentLoaded', () => {
    const inputText = document.getElementById('inputText');
    const outputContent = document.querySelector('.output-section');
    const encryptBtn = document.getElementById('encryptBtn');
    const decryptBtn = document.getElementById('decryptBtn');

    const encryptionMap = {
        'e': 'enter',
        'i': 'imes',
        'a': 'ai',
        'o': 'ober',
        'u': 'ufat'
    };

    function encrypt(text) {
        return text.replace(/[aeiou]/g, letter => encryptionMap[letter]);
    }

    function decrypt(text) {
        let decrypted = text;
        Object.entries(encryptionMap).forEach(([key, value]) => {
            decrypted = decrypted.replace(new RegExp(value, 'g'), key);
        });
        return decrypted;
    }

    function updateOutput(text) {
        outputContent.innerHTML = `
            <textarea id="outputText" readonly>${text}</textarea>
            <button id="copyBtn">Copiar</button>
        `;
        
        document.getElementById('copyBtn').addEventListener('click', () => {
            navigator.clipboard.writeText(text).then(() => {
                alert('Texto copiado al portapapeles');
                resetOutput();
                inputText.value = '';
            });
        });
    }

    function resetOutput() {
        outputContent.innerHTML = `
            <img src="assets/Muñeco.png" alt="Muñeco" class="muneco">
            <h2>Ningún mensaje fue encontrado</h2>
            <p>Ingresa el texto que deseas encriptar o desencriptar.</p>
        `;
    }

    encryptBtn.addEventListener('click', () => {
        const text = inputText.value.toLowerCase().trim();
        if (text) {
            updateOutput(encrypt(text));
        } else {
            resetOutput();
        }
    });

    decryptBtn.addEventListener('click', () => {
        const text = inputText.value.toLowerCase().trim();
        if (text) {
            updateOutput(decrypt(text));
        } else {
            resetOutput();
        }
    });

    // Inicializar con el estado de reset
    resetOutput();
});