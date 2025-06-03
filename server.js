require('dotenv').config(); // 👈 Add this at the top

const express = require('express');
const puppeteer = require('puppeteer');
const path = require('path');
const fs = require('fs');

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.static(path.join(__dirname, 'public')));

app.get('/screenshot', async (req, res) => {
  const browser = await puppeteer.launch({ headless: 'new' });
  const page = await browser.newPage();

  const targetUrl =  `http://localhost:${PORT}`;
  await page.goto(targetUrl, { waitUntil: 'networkidle0' });

  const screenshotBuffer = await page.screenshot({ fullPage: true });

  await browser.close();

  res.setHeader('Content-Type', 'image/png');
  res.setHeader('Content-Disposition', 'attachment; filename="infographic.png"');
  res.send(screenshotBuffer);
});

app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
});
