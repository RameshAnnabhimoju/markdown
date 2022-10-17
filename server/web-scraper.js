import Puppeteer from "puppeteer";

async function amazonScraper() {
  const browser = await Puppeteer.launch({ headless: false });
  const page = await browser.newPage();
  let items = [];
  try {
    await page.goto("https://www.amazon.in/");
    await page.select("#searchDropdownBox", "search-alias=appliances");
    await page.click("#nav-search-submit-button");
    let todaysdeals = await page.waitForXPath(
      "/html/body/div[1]/div[2]/div[2]/div[2]/div/div/div[9]/ul/li/span/a"
    );
    await Promise.all([page.waitForNavigation(), todaysdeals.click()]);
    let currentPage = await page.$(
      "a[class='s-pagination-item s-pagination-next s-pagination-button s-pagination-separator']"
    );

    console.log(items.length);

    while (currentPage) {
      if (
        (await page.$(
          "a[class='s-pagination-item s-pagination-next s-pagination-button s-pagination-separator']"
        )) === null
      ) {
        break;
      }
      currentPage = await page.waitForSelector(
        "a[class='s-pagination-item s-pagination-next s-pagination-button s-pagination-separator']"
      );
      items = [...items, ...(await pageScraper(page))];
      console.log(items.length);
      await Promise.all([
        page.waitForNavigation(),
        page.click(
          "a[class='s-pagination-item s-pagination-next s-pagination-button s-pagination-separator']",
          { delay: Math.floor(Math.random() * 5) * 1000 }
        ),
      ]);
    }
    return items;
  } catch (error) {
    console.log(error);
  }
  browser.close();
  return items;
}
async function pageScraper(page) {
  let urls = await page.$$eval('a[class="a-link-normal s-no-outline"]', (els) =>
    els.map((a) => a.href)
  );
  let imageUrls = await page.$$eval('img[class="s-image"]', (els) =>
    els.map((a) => a.src)
  );
  let titles = await page.$$eval(
    'span[class="a-size-base-plus a-color-base a-text-normal"]',
    (els) => els.map((a) => a.textContent)
  );
  let prices = await page.$$eval('span[class="a-offscreen"]', (els) =>
    els.map((a) => a.textContent)
  );
  let currentPrice = [];
  let lastPrice = [];
  let items = [];
  for (let i = 0; i < prices.length; i++) {
    if (i % 2 === 0 || i === 0) {
      currentPrice.push(prices[i]);
    } else {
      lastPrice.push(prices[i]);
    }
  }
  for (let i = 0; i < urls.length; i++) {
    items = [
      ...items,
      {
        title: titles[i],
        url: urls[i],
        imageUrl: imageUrls[i],
        currentPrice: currentPrice[i],
        lastPrice: lastPrice[i],
      },
    ];
  }
  return items;
}
// let result = await amazonScraper();
export default async function webScraper() {
  return await amazonScraper();
}
