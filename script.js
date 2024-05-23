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
    document.getElementById('download-mp3').addEventListener('click', () => {
        if (isValidUrl(videoUrlInput.value)) {
            downloadForm.submit();
        } else {
            message.textContent = 'Please enter a valid YouTube URL';
        }
    });
    document.getElementById('download-mp4').addEventListener('click', () => {
        if (isValidUrl(videoUrlInput.value)) {
            downloadForm.submit();
        } else {
            message.textContent = 'Please enter a valid YouTube URL';
        }
    });
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
