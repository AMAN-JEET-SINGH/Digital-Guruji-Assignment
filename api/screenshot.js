import chromium from 'chrome-aws-lambda';
import puppeteer from 'puppeteer-core';

export default async function handler(req, res) {
  let browser = null;

  try {
    browser = await puppeteer.launch({
      args: chromium.args,
      executablePath: await chromium.executablePath,
      headless: chromium.headless,
    });

    const page = await browser.newPage();
    // Use your deployed front-end URL here
    await page.goto('https://your-deployed-frontend-url.vercel.app', { waitUntil: 'networkidle0' });

    const screenshotBuffer = await page.screenshot({ fullPage: true });

    res.setHeader('Content-Type', 'image/png');
    res.setHeader('Content-Disposition', 'attachment; filename="infographic.png"');
    res.send(screenshotBuffer);
  } catch (error) {
    res.status(500).send('Error taking screenshot: ' + error.message);
  } finally {
    if (browser !== null) {
      await browser.close();
    }
  }
}
