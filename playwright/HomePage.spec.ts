import { test, expect } from '@playwright/test';
import HomePage from "./pages/HomePage"

test.beforeEach(async ({page}) => {
    await page.route("http://localhost:3000/api/search?text=Personal+saving+rate&limit=10", async (route, request) => {
        await route.fulfill({
            status: 200,
            contentType: 'application/json',
            path: "playwright/stubs/search/personalSavingRate.json",
        });
    });

    await page.route("http://localhost:3000/api/series?id=PSAVERT", async route => {
        await route.fulfill({
            status: 200,
            contentType: 'application/json',
            path: "playwright/stubs/series/personalSavingRate.json",
        });
    })

    await page.route("http://localhost:3000/api/observations?id=PSAVERT", async route => {
        await route.fulfill({
            status: 200,
            contentType: 'application/json',
            path: "playwright/stubs/observations/personalSavingRate.json",
        });
    });
})

test("Should add chart", async ({ page }) => {
    const homePage = new HomePage(page);

    await homePage.goTo();
    await homePage.addChart();
})