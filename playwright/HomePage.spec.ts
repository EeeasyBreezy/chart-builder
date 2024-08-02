import { test, expect } from '@playwright/test';
import HomePage from "./pages/HomePage"

test("Should add chart", async ({ page }) => {
    const homePage = new HomePage(page);

    await homePage.goTo();
    await homePage.addChart();
})