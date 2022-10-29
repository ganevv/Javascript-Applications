const { chromium } = require('playwright-chromium')
const { expect } = require('chai')
const host = 'http://localhost:5500'

describe('tests', async function () {
    this.timeout(6000)

    let browser, page

    before(async () => {
        browser = await chromium.launch()
    })

    after(async () => {
        await browser.close()
    })

    beforeEach(async () => {
        page = await browser.newPage()
    })

    afterEach(async () => {
        page.close()
    })

    it('loads all books', async () => {
        await page.goto(host);

        await page.click('text=Load all books');
        await page.waitForSelector('text=Harry Potter');
        const rowData = await page.$$eval('tbody tr', rows => rows.map(r => r.textContent));
        console.log(rowData);

        expect(rowData[0]).to.contain('Harry Potter')
        expect(rowData[0]).to.contain('Harry Potter')
        expect(rowData[1]).to.contain('Nakov')
    })
})