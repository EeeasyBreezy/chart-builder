import { type Locator, type Page } from "@playwright/test";

export default class HomePage {
    readonly page: Page;
    readonly addChartButton: Locator;
    readonly addChartDialog: Locator

    constructor(page: Page) {
        this.page = page;
        this.addChartButton = page.locator("button", { hasText: "Add chart" });
        this.addChartDialog = page.getByRole("dialog");
    }

    async goTo() {
        await this.page.goto("http://localhost:3000");
    }

    async addChart() {

        await this.addChartButton.click();
        await this.addChartDialog.waitFor({state: "visible", timeout: 5000});

        await this.addChartDialog.getByLabel("Dataset*").fill("Personal saving rate");
        await this.page.waitForResponse("http://localhost:3000/api/search?text=Personal+saving+rate&limit=10");

        await this.page.getByRole('option', { name: 'Personal Saving Rate' }).click();

        await this.page.waitForResponse("http://localhost:3000/api/series?id=PSAVERT");

        await this.page.getByRole('button', { name: 'Save' }).click();

        await this.page.waitForResponse("http://localhost:3000/api/observations?id=PSAVERT*");
    }
}