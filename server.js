const express = require('express');
const { chromium } = require('playwright');
const path = require('path');

const app = express();
const PORT = process.env.PORT || 3000;

// Serve frontend files
app.use(express.static(path.join(__dirname, 'public')));

app.get('/api/screenshot', async (req, res) => {
  const browser = await chromium.launch({ headless: true });
  const page = await browser.newPage();

  // Load local site
  await page.goto(`https://digital-guruji-assignment-thj2.onrender.com`, { waitUntil: 'networkidle' });

  // Screenshot full page (or use '#infographic' for specific section)
  const buffer = await page.screenshot({ fullPage: true });

  await browser.close();

  res.setHeader('Content-Type', 'image/png');
  res.setHeader('Content-Disposition', 'attachment; filename="screenshot.png"');
  res.send(buffer);
});

app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
});
