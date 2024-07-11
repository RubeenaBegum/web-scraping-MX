import { chromium } from 'playwright';
import * as readline from 'readline';

// Define an interface for the book data
interface Book {
  name: string;
  price: string;
  link: string;
}

// Function to ask questions in the terminal
async function askQuestion(query: string): Promise<string> {
  const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout,
  });

  return new Promise<string>(resolve => rl.question(query, ans => {
    rl.close();
    resolve(ans);
  }));
}

(async () => {
  try {
    // Prompt the user for their username and password
    const username = await askQuestion('Enter your username: ');
    const password = await askQuestion('Enter your password: ');

    // Launch a Chromium browser
    const browser = await chromium.launch({ headless: false });
    const context = await browser.newContext();
    const page = await context.newPage();

    // URLs for login and orders page
    const loginUrl = 'http://books.toscrape.com/accounts/login/';   // **please note: as we cannot violate e-commerce websites policies, using some random url for demo purposes**
    const booksUrl = 'http://books.toscrape.com/';   // **please note: as we cannot violate e-commerce websites policies, using some random url for demo purposes**

    // If No login page then use this implementation --*
    // URL for books page
    //const booksUrl1 = 'http://books.toscrape.com/';

    // Navigate to the books page
    //await page.goto(booksUrl);
    //No login page implementation ends --*

    // Log in to the website (note: this is a mock example; actual login functionality won't work here)
    await page.goto(loginUrl);
    await page.fill('#id_login-username', username);
    await page.fill('#id_login-password', password);
    await page.click('input[name="login_submit"]'); // Adjust selector as necessary

    // Wait for navigation after login
    await page.waitForNavigation();

    // Navigate to the books page
    await page.goto(booksUrl);

    // Scrape the first 10 books
    const books: Book[] = await page.evaluate(() => {
      const items = Array.from(document.querySelectorAll('.product_pod')).slice(0, 10);
      return items.map(item => ({
        name: item.querySelector('h3 a')?.textContent?.trim() || '',
        price: item.querySelector('.price_color')?.textContent?.trim() || '',
        link: (item.querySelector('h3 a') as HTMLAnchorElement)?.href || '',
      }));
    });

    console.log('Last 10 books:', JSON.stringify(books, null, 2));



    
    //***Optional implementations***//

    const searchString = await askQuestion('Enter a search string: ');

    if (!searchString.trim()) {
      throw new Error('Search string cannot be empty.');
    }

    // Perform a search on the website
    const searchUrl = `http://books.toscrape.com/catalogue/search?q=${encodeURIComponent(searchString)}`;
    await page.goto(searchUrl);

    // Wait for search results to load
    await page.waitForSelector('.product_pod');

    // Scrape the search results
    const searchResults: Book[] = await page.evaluate(() => {
      const items = Array.from(document.querySelectorAll('.product_pod'));
      if (items.length === 0) {
        throw new Error('No results found.');
      }
      return items.map(item => ({
        name: item.querySelector('h3 a')?.textContent?.trim() || '',
        price: item.querySelector('.price_color')?.textContent?.trim() || '',
        link: (item.querySelector('h3 a') as HTMLAnchorElement)?.href || '',
      }));
    });

    console.log('Search results:', JSON.stringify(searchResults, null, 2));



    await browser.close();
  } catch (error: any) {
    console.error('An error occurred:', error.message);
  }
})();
