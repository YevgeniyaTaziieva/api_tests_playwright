import {test, expect} from '@playwright/test';
import {deleteFile} from '../helpers/helper'

const readline = require('readline');
const fs = require('fs');

test.describe("Download files", () => {


    test('test csv file', async ({ page }) => {
        await page.goto('https://the-internet.herokuapp.com/download');

    const downloadPromise = page.waitForEvent('download');

    await page.locator(`//a[contains(@href, ".csv")][1]`).click();

    const download = await downloadPromise;
    const path = `./downloads/${download.suggestedFilename()}`;
    await download.saveAs(path);

        fs.stat(path, (err, stats) => {
        if (err) {
            console.error("Cannot access file stats", err);
            return;
        }
        
        if (stats.size > 0) {
            console.log("File is not empty and size is: ", stats.size, "bytes");
            
            const stream = fs.createReadStream(path);
            const reader = readline.createInterface({
            input: stream,
            crlfDelay: Infinity
            });

            reader.on('line', (line) => {
            const columns = line.split(',');
            console.log(columns);
            });

            reader.on('close', () => {
            deleteFile(path);
            });
        } else {
            console.log("File is empty or does not exist");
            deleteFile(path);
        }
        });
    });
})