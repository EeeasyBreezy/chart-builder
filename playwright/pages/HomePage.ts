import { type Locator, type Page } from "@playwright/test";

export default class HomePage {
    readonly page: Page;
    readonly addChartButton: Locator;

    constructor(page: Page) {
        this.page = page;
        this.addChartButton = page.locator("button", { hasText: "Add chart" });
    }

    async goTo() {
        await this.page.goto("https://localhost:3000");
    }
}