import { chromium, Browser, Page } from 'playwright';

export class PlaywrightCrawler {
    private browser!: Browser;

    public async init(): Promise<void> {
        console.log('Launching browser...');
        this.browser = await chromium.launch({ headless: true });
        console.log('Browser launched.');
    }

    public async scrape(url: string): Promise<string> {
        if (!this.browser) {
        throw new Error('Browser not initialized. Please call init() first.');
        }

        console.log(`Creating context and page for ${url}`);
        const context = await this.browser.newContext();
        const page: Page = await context.newPage();

        console.log('Navigating to URL...');
        await page.goto(url, { waitUntil: 'domcontentloaded' });
        console.log('Page loaded.');

        const title = await page.title();
        console.log('Page title extracted.');

        await page.close();
        await context.close();

        return title;
    }

    public async close(): Promise<void> {
        if (this.browser) {
            console.log('Closing browser...');
            await this.browser.close();
            console.log('Browser closed.');
        }
    }
}

// Example Usage with error handling
console.log('Running the PlaywrightCrawler example...');

(async () => {
  try {
    const crawler = new PlaywrightCrawler();
    await crawler.init();
    const title = await crawler.scrape('https://rightmove.com');
    console.log(`Page title: ${title}`);
    await crawler.close();
  } catch (error) {
    console.error('Error during scraping:', error);
  }
})();
