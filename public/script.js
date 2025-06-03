function takeScreenshot() {
  const button = document.querySelector('.screenshot-btn');
  button.style.display = 'none'; // hide before capture

  domtoimage.toPng(document.body, {
    width: document.body.scrollWidth,
    height: document.body.scrollHeight
  })
  .then((dataUrl) => {
    button.style.display = 'block'; // show again

    const link = document.createElement('a');
    link.download = 'full-page-screenshot.png';
    link.href = dataUrl;
    link.click();
  })
  .catch((error) => {
    button.style.display = 'block';
    console.error('Screenshot failed:', error);
    alert('Screenshot failed. See console for error.');
  });
}
