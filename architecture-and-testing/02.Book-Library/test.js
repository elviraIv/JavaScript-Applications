const { chromium } = require('playwright-chromium');
const { expect } = require('chai');

const host = 'http://127.0.0.1:5500'
const mockData = {
    "d953e5fb-a585-4d6b-92d3-ee90697398a0": {
        "author": "J.K.Rowling",
        "title": "Harry Potter and the Philosopher's Stone"
    },
    "d953e5fb-a585-4d6b-92d3-ee90697398a1": {
        "author": "Svetlin Nakov",
        "title": "C# Fundamentals"
    }
};

function json(data){
    return {
        status: 200,
        headres: {
            'Access-Control-Allow-Origin': '*',
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(data)
    }
};

describe('Tests', async function(){
    this.timeout(5000);

    let page, browser;

    before( async () => {
        browser = await chromium.launch();
    });

    after(async () => {
        await browser.close();
    });

    beforeEach(async () => {
        page = await browser.newPage();
    });
    afterEach(async () => {
        await page.close();
    });

    it('loads and displays all books', async () => {
        await page.route('**/jsonstore/collections/books*', (route) => {
            route.fulfill(json(mockData));
        });

        await page.goto(host);

        await page.click('text=Load All Books');

        await page.waitForSelector('text=Harry Potter');

        const rows = await page.$$eval('tr', (rows) => rows.map(r => r.textContent.trim()));

        expect(rows[1]).to.contains('Harry Potter');
        expect(rows[1]).to.contains('Rowling');
        expect(rows[2]).to.contains('C#');
        expect(rows[2]).to.contains('Nakov');
    });

    it('can create a book', async  () => {
        await page.goto(host);

        await page.fill('form#createForm >> input[name="title"]', 'Title');
        await page.fill('form#createForm >> input[name="author"]', 'Author');

        const [request] = await Promise.all([
            page.waitForRequest(request => request.method() == 'POST'),
            page.click('form#createForm >> text=Submit'),
        ]);

        const data = JSON.parse(request.postData());
        expect(data.title).to.equal('Title');
        expect(data.author).to.equal('Author');
    });

    it('can edit a book', async () => {
        await page.goto(host);

        await page.click('text=Load all books');

        await page.locator('table tbody tr:nth-child(1) td:nth-child(3) .editBtn').click();

        await page.fill('text=Edit FORM TITLE AUTHOR Save >> [placeholder= "Title..."]', 'New title');

        await page.click('text=Save');

        await page.click('text=Load all books');

        const title = await page.textContent('tbody tr td');
        expect(title).to.equal('New title');
    });

    it('can delete a book', async () => {
        await page.goto(host);

        await page.click('text=Load all books');

        await page.on('dialog', dialog => dialog.accept());
        await page.click('text=Delete');

        await page.click('text=Load all books');

        await page.waitForSelector('tr');
        
        const rowData = await page.$$eval('tbody tr', rows => rows.length);
        expect (rowData).to.equal(2);
    });
});