document.addEventListener('DOMContentLoaded', () => {
    const urlInput = document.getElementById('urlInput');
    const shortenBtn = document.getElementById('shortenBtn');
    const resultBox = document.getElementById('resultBox');
    const shortUrl = document.getElementById('shortUrl');
    const copyBtn = document.getElementById('copyBtn');
    const loader = document.getElementById('loader');
    const error = document.getElementById('error');

    shortenBtn.addEventListener('click', async () => {
        const url = urlInput.value.trim();
        
        if (!url) {
            showError('Please enter a URL');
            return;
        }

        if (!isValidUrl(url)) {
            showError('Please enter a valid URL');
            return;
        }

        try {
            loader.style.display = 'block';
            resultBox.classList.remove('active');
            error.style.display = 'none';

            const response = await fetch(`https://tinyurl.com/api-create.php?url=${encodeURIComponent(url)}`);
            if (!response.ok) {
                throw new Error('Failed to shorten URL');
            }
            
            const shortUrlText = await response.text();
            shortUrl.value = shortUrlText;
            resultBox.classList.add('active');
        } catch (err) {
            showError(err.message);
        } finally {
            loader.style.display = 'none';
        }
    });

    copyBtn.addEventListener('click', () => {
        shortUrl.select();
        document.execCommand('copy');

        copyBtn.textContent = 'Copied!';
        setTimeout(() => {
            copyBtn.textContent = 'Copy';
        }, 2000);
    });

    function showError(message) {
        error.textContent = message;
        error.style.display = 'block';
    }

    function isValidUrl(url) {
        try {
            new URL(url);
            return true;
        } catch {
            return false;
        }
    }
});
