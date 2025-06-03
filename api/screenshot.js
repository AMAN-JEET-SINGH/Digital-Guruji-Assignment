const puppeteer = require('puppeteer');

module.exports = async (req, res) => {
  const browser = await puppeteer.launch({
    headless: 'new',
    args: ['--no-sandbox', '--disable-setuid-sandbox'],
  });

  const page = await browser.newPage();

  const targetUrl = process.env.BASE_URL || 'https://your-vercel-url.vercel.app/';
  await page.goto(targetUrl, { waitUntil: 'networkidle0' });

  const screenshotBuffer = await page.screenshot({ fullPage: true });

  await browser.close();

  res.setHeader('Content-Type', 'image/png');
  res.setHeader('Content-Disposition', 'attachment; filename="infographic_1.png"');
  res.send(screenshotBuffer);
};
