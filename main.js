const puppeteer = require('puppeteer');

(async () => {
    const browser = await puppeteer.launch({
        headless: false,
        defaultViewport: null,
        args: ['--start-maximized', '--mute-audio'],
    });
    const page = await browser.newPage();
    await page.goto('https://www.flashscore.com.br/');

    // accept cookies
    await (await page.waitForSelector('#onetrust-accept-btn-handler')).click();

    // get all id's
    const ids = await page.$$eval(
        '[title="Clique para detalhes do jogo!"]',
        result => result.map(div => ({
            id: div.id.substring(4),
            time: div.children[1].innerText.trim(),
        })),
    );

    console.info(ids);
})();
