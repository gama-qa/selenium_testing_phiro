const { Builder, By, until } = require('selenium-webdriver');
const assert = require('assert');
const { expect } = require('chai');

const testCases = [
    {
        description: 'should login successfully with valid credentials',
        username: 'Q03160',
        password: 'phiR0@2016',
        expectedUrl: 'http://old-demo.securehr.net/index/a/home/',
        shouldPass: true,
    },
    {
        description: 'should fail to login with invalid password',
        username: 'Q03160',
        password: 'Qwerty123!',
        expectedUrl: 'http://old-demo.securehr.net',
        shouldPass: false,
    },
    {
        description: 'should fail to login with invalid username',
        username: 'adminPhiro123!',
        password: 'phiR0@2016',
        expectedUrl: 'http://old-demo.securehr.net',
        shouldPass: false,
    },
    
];

describe('Login Tests', function () {
    this.timeout(20000);

    let driver;

    before(async function () {
        driver = await new Builder().forBrowser('firefox').setFirefoxOptions(new firefox.Options()).build();
    });

    after(async function () {
        await driver.quit();
    });

    testCases.forEach((testCase) => {
        it(testCase.description, async function () {
            await driver.get('http://old-demo.securehr.net/');

            await driver.findElement(By.name('nip')).sendKeys(testCase.username);
            await driver.findElement(By.name('password')).sendKeys(testCase.password);
            await driver.findElement(By.xpath("//*[text() = 'Login']")).click();

            if (testCase.shouldPass) {
                await driver.wait(until.urlIs(testCase.expectedUrl), 10000);
                const currentUrl = await driver.getCurrentUrl();
                expect(currentUrl).to.equal(testCase.expectedUrl);
            } else {
                await driver.wait(until.urlIs(testCase.expectedUrl), 10000).catch(() => null);
                const currentUrl = await driver.getCurrentUrl();
                expect(currentUrl).to.equal(testCase.expectedUrl);
            }
        });
    });
});
