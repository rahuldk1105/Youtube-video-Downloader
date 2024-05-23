document.addEventListener('DOMContentLoaded', () => {
    const toggleButton = document.querySelector('[data-collapse-toggle="mobile-menu"]');
    const menu = document.querySelector('#mobile-menu');
    toggleButton.addEventListener('click', () => {
        if (menu.classList.contains('hidden')) {
            menu.classList.remove('hidden');
        } else {
            menu.classList.add('hidden');
        }
    });
    const downloadForm = document.getElementById('download-form');
    const videoUrlInput = document.getElementById('video-url');
    const message = document.getElementById('message');
    const downloadHistory = document.getElementById('download-history');
    document.getElementById('download-mp3').addEventListener('click', () => {
        if (isValidUrl(videoUrlInput.value)) {
            initiateDownload('mp3');
        } else {
            message.textContent = 'Please enter a valid YouTube URL';
        }
    });
    document.getElementById('download-mp4').addEventListener('click', () => {
        if (isValidUrl(videoUrlInput.value)) {
            initiateDownload('mp4');
        } else {
            message.textContent = 'Please enter a valid YouTube URL';
        }
    });

    function initiateDownload(format) {
        message.textContent = 'Download initiated as ' + format.toUpperCase();
        const historyItem = document.createElement('li');
        historyItem.textContent = videoUrlInput.value + ' - ' + format;
        downloadHistory.appendChild(historyItem);
        saveDownloadHistory(videoUrlInput.value, format);
    }

    function saveDownloadHistory(videoUrl, format) {
        let history = JSON.parse(localStorage.getItem('downloadHistory')) || [];
        history.push({ videoUrl, format });
        if (history.length > 5) {
            history.shift();
        }
        localStorage.setItem('downloadHistory', JSON.stringify(history));
        loadDownloadHistory();
    }

    function loadDownloadHistory() {
        const history = JSON.parse(localStorage.getItem('downloadHistory')) || [];
        downloadHistory.innerHTML = '';
        history.forEach(item => {
            const historyItem = document.createElement('li');
            historyItem.textContent = item.videoUrl + ' - ' + item.format;
            downloadHistory.appendChild(historyItem);
        });
    }

    loadDownloadHistory();
});

function isValidUrl(url) {
    const pattern = new RegExp('^(https?:\\/\\/)?'+ // protocol
        '((([a-z\\d]([a-z\\d-]*[a-z\\d])*)\\.?)+[a-z]{2,}|'+ // domain name
        '((\\d{1,3}\\.){3}\\d{1,3}))'+ // OR ip (v4) address
        '(\\:\\d+)?(\\/[-a-z\\d%_.~+]*)*'+ // port and path
        '(\\?[;&a-z\\d%_.~+=-]*)?'+ // query string
        '(\\#[-a-z\\d_]*)?$','i'); // fragment locator
    return !!pattern.test(url);
}
