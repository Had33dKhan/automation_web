const { test } = require('@playwright/test');
const fs = require('fs');

const BASE_URL = 'https://sbpv1.symmetrydigital-labs.com';
const START_URL = `${BASE_URL}/circulars`;

let visited = new Set();
let results = [];
let unauthorizedPages = [];

async function getAllLinks(page) {
    const links = await page.$$eval('a', anchors =>
        anchors.map(a => a.href)
    );

    return links.filter(link =>
        link &&
        link.startsWith(BASE_URL) &&
        !link.includes('#') &&
        !link.startsWith('javascript:') &&
        !link.includes('/login') &&
        !link.includes('/auth')
    );
}

test('SBP Crawl + UI + Stability Test', async ({ page }) => {

    let queue = [START_URL];

    // Attach console listener ONCE
    page.on('console', msg => {
        if (msg.type() === 'error') {
            console.log(`Console error: ${msg.text()}`);
        }
    });

    while (queue.length > 0) {
        const url = queue.shift();

        if (visited.has(url)) continue;
        visited.add(url);

        console.log(`\n🔍 Checking: ${url}`);

        try {
            // Retry mechanism
            let response;
            for (let i = 0; i < 2; i++) {
                response = await page.goto(url, { waitUntil: 'load' });
                if (response && response.status() < 500) break;
            }

            // Handle no response
            if (!response) {
                console.log(`❌ No response: ${url}`);
                results.push({ url, status: 'NO_RESPONSE', issues: 0 });
                continue;
            }

            const status = response.status();

            // Handle unauthorized
            if (status === 401 || status === 403) {
                console.log(`🔒 Protected (${status}): ${url}`);
                unauthorizedPages.push(url);

                results.push({
                    url,
                    status,
                    issues: 'SKIPPED (AUTH)'
                });

                continue;
            }

            // Handle other bad responses
            if (status >= 400) {
                console.log(`❌ Error ${status} on: ${url}`);

                results.push({
                    url,
                    status,
                    issues: 'PAGE_ERROR'
                });

                continue;
            }

            console.log(`✅ ${status} OK`);

            // UI issue detection
            const issues = await page.evaluate(() => {
                let problems = [];

                document.querySelectorAll('*').forEach(el => {
                    const style = window.getComputedStyle(el);

                    if (!el.innerText) return;

                    // Overflow issue
                    if (el.scrollWidth > el.clientWidth) {
                        problems.push({
                            type: 'overflow',
                            text: el.innerText.slice(0, 50)
                        });
                    }

                    // Alignment issue
                    if (
                        style.textAlign === 'center' &&
                        el.innerText.length > 100
                    ) {
                        problems.push({
                            type: 'alignment',
                            text: el.innerText.slice(0, 50)
                        });
                    }
                });

                return problems;
            });

            if (issues.length > 0) {
                console.log(`⚠️ UI Issues found: ${issues.length}`);

                await page.screenshot({
                    path: `screenshots/${encodeURIComponent(url)}.png`,
                    fullPage: true
                });
            }

            // Store result
            results.push({
                url,
                status,
                issues: issues.length
            });

            // Crawl next links
            const links = await getAllLinks(page);

            links.forEach(link => {
                if (!visited.has(link)) {
                    queue.push(link);
                }
            });

        } catch (err) {
            console.log(`❌ Failed: ${url}`, err.message);

            results.push({
                url,
                status: 'ERROR',
                issues: err.message
            });
        }
    }

    // Save report
    fs.writeFileSync('qa-report.json', JSON.stringify(results, null, 2));

    console.log(`\n✅ Crawl Completed`);
    console.log(`Total Pages Checked: ${visited.size}`);
    console.log(`Unauthorized Pages: ${unauthorizedPages.length}`);
});