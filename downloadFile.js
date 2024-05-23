function downloadFile(videoUrl, format) {
    const link = document.createElement('a');
    link.href = videoUrl; // This should be the URL of the converted file
    link.download = `download.${format}`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
}
