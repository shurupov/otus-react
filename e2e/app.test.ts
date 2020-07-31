import "expect-puppeteer";

describe("application", () => {
  beforeAll(async () => {
    await page.goto("http://localhost:8080");
  });

  it('should display "Nice to see you!" text on page', async () => {
    const text = await page.evaluate(() => document.body.textContent);
    expect(text).toContain("Login");
    expect(text).toContain("Top");
    expect(text).toContain("News");
    expect(text).toContain("Text 1");
    expect(text).toContain("Text 2");
    expect(text).toContain("Root");
  });
});
