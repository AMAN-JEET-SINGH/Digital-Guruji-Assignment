const express = require('express');
const { chromium } = require('playwright');
const path = require('path');

const app = express();
const PORT = process.env.PORT || 3000;

// Serve static frontend files
app.use(express.static(path.join(__dirname, 'public')));

app.get('/api/screenshot', async (req, res) => {
  const browser = await chromium.launch({ headless: true });
  const page = await browser.newPage();

  await page.setViewportSize({ width: 1280, height: 800 });

  await page.goto('https://digital-guruji-assignment-thj2.onrender.com', {
    waitUntil: 'load',
    timeout: 60000,
  });

  await page.waitForTimeout(2000); // wait extra 2 seconds for fonts/images

  const buffer = await page.screenshot({ fullPage: true });

  await browser.close();

  res.setHeader('Content-Type', 'image/png');
  res.setHeader('Content-Disposition', 'attachment; filename="screenshot.png"');
  res.send(buffer);
});

app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
});
