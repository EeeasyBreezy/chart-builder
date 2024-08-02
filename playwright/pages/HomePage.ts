import { type Locator, type Page, expect } from "@playwright/test";

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
        
        const addChartDialogScreenshot = await this.addChartDialog.screenshot();
        expect(addChartDialogScreenshot).toMatchSnapshot("addChartDialog.png");
    }
}