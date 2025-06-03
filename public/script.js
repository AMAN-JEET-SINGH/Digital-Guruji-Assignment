async function takeScreenshot() {
      const response = await fetch('https://digital-guruji-assignment-thj2.onrender.com/screenshot');
      const blob = await response.blob();
      const url = window.URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = 'infographic.png';
      a.click();
    }