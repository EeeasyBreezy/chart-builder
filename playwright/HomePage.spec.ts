import { test, expect } from '@playwright/test';
import HomePage from "./pages/HomePage"

test.beforeEach(async ({page}) => {
    page.route("**/api/search?*", async (route, request) => {
        console.log("Intercepted URL:", request.url());
        try {
            await route.fulfill({
                status: 200,
                contentType: 'application/json',
                path: "playwright/stubs/personalSavingRate.json",
            });
            console.log("Request fulfilled with stub data.");
        } catch (error) {
            console.error("Error fulfilling request:", error);
        }
    });
})

test("Should add chart", async ({ page }) => {
    const homePage = new HomePage(page);

    await homePage.goTo();
    await homePage.addChart();
})