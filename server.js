const express = require('express');
const puppeteer = require('puppeteer');
const path = require('path');

const app = express();
const PORT = process.env.PORT || 3000;

// Serve static frontend files
app.use(express.static(path.join(__dirname, 'public')));

app.get('/api/screenshot', async (req, res) => {
  try {
    // Launch Puppeteer with no-sandbox flags for Render environment
    const browser = await puppeteer.launch({
      args: ['--no-sandbox', '--disable-setuid-sandbox'],
      headless: true,
    });

    const page = await browser.newPage();

    // Navigate to your app URL
    const url = `http://localhost:${PORT}`;
    await page.goto(url, { waitUntil: 'networkidle2' });

    // Screenshot the full page (or use element screenshot)
    const screenshotBuffer = await page.screenshot({ fullPage: true });

    await browser.close();

    // Set response headers to download the image
    res.setHeader('Content-Type', 'image/png');
    res.setHeader('Content-Disposition', 'attachment; filename="infographic.png"');
    res.send(screenshotBuffer);
  } catch (err) {
    console.error('Screenshot error:', err);
    res.status(500).send('Error taking screenshot');
  }
});

app.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}`);
});
