const chromium = require('chrome-aws-lambda');
const puppeteer = require('puppeteer-core');

module.exports = async function handler(req, res) {
  const browser = await puppeteer.launch({
    args: chromium.args,
    executablePath: await chromium.executablePath,
    headless: chromium.headless,
  });

  const page = await browser.newPage();
  await page.goto('https://your-frontend-url.com', { waitUntil: 'networkidle0' });

  const screenshot = await page.screenshot({ fullPage: true });

  await browser.close();

  res.setHeader('Content-Type', 'image/png');
  res.send(screenshot);
};
